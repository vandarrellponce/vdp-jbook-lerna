import express, { Request, Response } from 'express'

export const createCellsRouter = (filename: string, dir: string) => {
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
      // Make sure the file exists
      // If not, create it
      // Take the list of cells from the req object
      // Serialize them
      // Write the cells into the file storage
    })

  return router
}
