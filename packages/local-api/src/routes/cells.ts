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
    .get((req: Request, res: Response) => {
      // Make sure the cells storage file exists
      // If file does not exit, make a default list of cells
      // Read the file
      // Parse a list of file out of it
      //Send list of cells back the the browser
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
