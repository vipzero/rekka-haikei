import React, { useRef, useEffect, useState, useCallback } from 'react'
import { zIndex } from '../../../config'

// シェーダーソース
const SHADERS = {
	vertex: `
attribute vec2 a_position;
uniform float u_time;
void main() {
  float y = mod(a_position.y - u_time, 2.0);
  gl_Position = vec4(a_position.x, y - 1.0, 0.0, 1.0);
}`,
	fragment: `
precision mediump float;
void main() {
  gl_FragColor = vec4(0.8, 0.9, 1.0, 0.6);
}
`,
}

// 定数
const RAIN_CONFIG = {
	dropCount: 20,
	animationSpeed: 500, // ミリ秒単位
	color: { r: 0, g: 0, b: 0, a: 0 }, // 背景色
	opacity: 0.3,
	zIndex: zIndex.layerDeco,
}

// WebGL関連のユーティリティ
interface WebGLUtils {
	createShader: (type: number, source: string) => WebGLShader
	createProgram: (
		vertShader: WebGLShader,
		fragShader: WebGLShader
	) => WebGLProgram
	createRaindrops: (count: number) => { vertices: number[]; count: number }
}

const createWebGLUtils = (gl: WebGLRenderingContext): WebGLUtils => {
	return {
		createShader: (type: number, source: string): WebGLShader => {
			const shader = gl.createShader(type)!
			gl.shaderSource(shader, source)
			gl.compileShader(shader)

			// シェーダーのコンパイル状態をチェック
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error(
					`シェーダーのコンパイルエラー: ${gl.getShaderInfoLog(shader)}`
				)
				gl.deleteShader(shader)
				throw new Error('シェーダーのコンパイルに失敗しました')
			}

			return shader
		},

		createProgram: (
			vertShader: WebGLShader,
			fragShader: WebGLShader
		): WebGLProgram => {
			const program = gl.createProgram()!
			gl.attachShader(program, vertShader)
			gl.attachShader(program, fragShader)
			gl.linkProgram(program)

			// プログラムのリンク状態をチェック
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				console.error(
					`プログラムのリンクエラー: ${gl.getProgramInfoLog(program)}`
				)
				gl.deleteProgram(program)
				throw new Error('プログラムのリンクに失敗しました')
			}

			return program
		},

		createRaindrops: (count: number) => {
			const vertices: number[] = []

			for (let i = 0; i < count; i++) {
				// ランダムな位置に配置
				const x = Math.random() * 2 - 1 // [-1, 1] の範囲でランダム
				const y = Math.random() * 4 - 1 // [-1, 3] の範囲でランダム（画面外から始まるものもある）
				const length = 0.1 + Math.random() * 0.2 // 長さもランダム

				// 線の両端の頂点を追加
				vertices.push(x, y + length, x, y)
			}

			return { vertices, count }
		},
	}
}

const RainCanvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	// useMemoを使用してwindow.innerWidthとwindow.innerHeightの初期値を設定
	const [dimensions, setDimensions] = useState(() => ({
		width: window.innerWidth,
		height: window.innerHeight,
	}))

	// リサイズハンドラをuseCallbackでメモ化
	const handleResize = useCallback(() => {
		setDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}, [])

	// ウィンドウサイズの変更を監視
	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	// WebGLレンダリング
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const gl = canvas.getContext('webgl')
		if (!gl) {
			console.error('WebGLがサポートされていません')
			return
		}

		// キャンバスサイズを設定
		canvas.width = dimensions.width
		canvas.height = dimensions.height
		gl.viewport(0, 0, canvas.width, canvas.height)

		try {
			// WebGLユーティリティを初期化
			const utils = createWebGLUtils(gl)

			// シェーダーを作成
			const vertShader = utils.createShader(gl.VERTEX_SHADER, SHADERS.vertex)
			const fragShader = utils.createShader(
				gl.FRAGMENT_SHADER,
				SHADERS.fragment
			)

			// プログラムを作成
			const program = utils.createProgram(vertShader, fragShader)
			gl.useProgram(program)

			// 雨粒のデータを生成
			const { vertices, count } = utils.createRaindrops(RAIN_CONFIG.dropCount)

			// バッファを作成
			const buffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

			// 属性を設定
			const aPos = gl.getAttribLocation(program, 'a_position')
			gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
			gl.enableVertexAttribArray(aPos)

			// ユニフォーム変数を取得
			const uTime = gl.getUniformLocation(program, 'u_time')

			// 背景色を設定
			const { r, g, b, a } = RAIN_CONFIG.color
			gl.clearColor(r, g, b, a)

			// アニメーションを開始
			let start = performance.now()
			let animationFrameId: number

			const render = () => {
				const now = performance.now()
				const t = (now - start) / RAIN_CONFIG.animationSpeed

				gl.uniform1f(uTime, t % 2)
				gl.clear(gl.COLOR_BUFFER_BIT)
				gl.drawArrays(gl.LINES, 0, count * 2)

				animationFrameId = requestAnimationFrame(render)
			}

			render()

			// クリーンアップ
			return () => {
				cancelAnimationFrame(animationFrameId)
				gl.deleteBuffer(buffer)
				gl.deleteProgram(program)
				gl.deleteShader(vertShader)
				gl.deleteShader(fragShader)
			}
		} catch (error) {
			console.error('WebGLの初期化エラー:', error)
		}
	}, [dimensions]) // dimensionsが変更されたら再実行

	// キャンバススタイル
	const canvasStyle: React.CSSProperties = {
		opacity: RAIN_CONFIG.opacity,
		pointerEvents: 'none',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: RAIN_CONFIG.zIndex,
	}
	return <canvas ref={canvasRef} style={canvasStyle} />
}

export default RainCanvas
