import express from 'express'

export const serve = (port: number, filename: string, dir: string) => {
  const app = express()

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(`Opened ${filename}, navigate to http://localhost:${port}`)
        return resolve
      })
      .on('error', reject)
  })
}
