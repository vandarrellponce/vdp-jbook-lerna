import express, { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const fullPath = path.join(dir, filename)
  const router = express.Router()

  router
    .route('/cells')
    .get(async (req: Request, res: Response) => {
      try {
        // Read the file
        const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

        //Send list of cells back the the browser
        res.status(200).send(JSON.parse(result))
      } catch (error) {
        if (error.code === 'ENOENT') {
          // Add code to create a file and add default cells
        } else {
          throw error
        }
      }
    })
    .post(async (req: Request, res: Response) => {
      // Take the list of cells from the req object
      const { cells }: { cells: Cell[] } = req.body

      // Write the cells into the file storage
      await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

      res.status(201).send({ status: 'ok' })
    })

  return router
}
