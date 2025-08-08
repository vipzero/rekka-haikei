# Agent Setup Guide - EVENT_ID 追加

## 作業内容

`src/config/index.tsx` の `events` 配列に新しい EVENT_ID を追加するだけです。

## 手順

### 1. 現在の日付を確認

```bash
date
```

### 2. `src/config/index.tsx` を編集

```typescript
export const events: Event[] = [
	{ id: '新しいイベント', label: 'ラベル', current: true }, // ← 追加
	{ id: '前のイベント', label: 'ラベル' }, // ← current 削除
	// ...既存のイベント
]
```

### 3. デプロイ

```bash
yarn deploy
```

## 実例（2025 年 8 月 8 日）

```typescript
export const events: Event[] = [
	{ id: '2025obon', label: '2025盆', current: true }, // ← 追加
	{ id: '2025gw', label: '2025GW' }, // ← current 削除
	{ id: '2024winter', label: '2024冬' },
	// ...
]
```

**以上。** 他の作業は不要です。
