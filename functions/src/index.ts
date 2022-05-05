import express from 'express'
import * as functions from 'firebase-functions'
import { log } from 'firebase-functions/lib/logger'
import 'firebase-functions/lib/logger/compat'
const cors = require('cors')
const requestIp = require('request-ip')

const app = express()
app.use(cors({ origin: true }))

const blockIps: string[] = []

exports.sugar = functions.https.onRequest((req, res) => {
	const clientIp = requestIp.getClientIp(req)

	log(`clientIp ${clientIp}`, { headers: req.headers, body: req.body })
	res.status(200).send('')
})

app.all('/*', function (req, res) {
	const clientIp = requestIp.getClientIp(req)
	log(`ip: $clientIp}`)
	if (blockIps.includes(clientIp)) {
		// res.status(200).send('out/inbex.html')
		log(`block ip: ${clientIp}`)

		// next()
		// return
	}
	// res.status(200).send('f')
	// const filePath = path.join(__dirname, 'static', req.path)
	// res.status(200).sendFile(filePath)
})

// app.use(express.static(__dirname + '/static'))

exports.player = functions
	.region('asia-northeast1')
	.https.onRequest((req, res) => {
		res.status(400)
		const url = req.query['url']
		if (typeof url !== 'string') {
			res.status(400)
			return
		}

		res.status(200).send(`<!doctype html>
    <head>
      <title>player</title>
    </head>
    <body>
			<audio controls src="${decodeURIComponent(url)}">
					Your browser does not support the
			<code>audio</code>
    </audio>
    </body>
  </html>`)
	})
