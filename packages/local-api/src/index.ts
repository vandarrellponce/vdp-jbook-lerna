import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const serve = (port: number, filename: string, dir: string) => {
  const app = express()

  app.use(express.static('../../local-client/build'))

  /*  app.use(
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: 'silent',
    })
  ) */

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(`Opened ${filename}, navigate to http://localhost:${port}`)
        return resolve
      })
      .on('error', reject)
  })
}
