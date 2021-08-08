import express from 'express'
import * as functions from 'firebase-functions'
import { log } from 'firebase-functions/lib/logger'
import 'firebase-functions/lib/logger/compat'
const cors = require('cors')
const requestIp = require('request-ip')

exports.hello2 = functions.https.onRequest((req, res) => {
	res.send(`Hello ${req.query.name}`)
})

const app = express()
app.use(cors({ origin: true }))

const blockIps = (functions.config().ip.blacklist, '').split(',')

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

exports.filter3 = functions.https.onRequest(app)
