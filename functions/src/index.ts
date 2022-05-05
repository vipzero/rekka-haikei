import * as functions from 'firebase-functions'

export const play = functions
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
