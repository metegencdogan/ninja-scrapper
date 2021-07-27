import express, { Application, Request, Response, NextFunction } from 'express'
import { getEmployees } from './service/scrapper'
const app: Application = express()
// const _PORT: string | number = process.env.PORT | 5000

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`app is running on`)
})

app.get('/employees', async (req: Request, res: Response) => {
  let name: any = req.query.name
  let sort: any = req.query.sort
  let office: any = req.query.office
  await getEmployees(name, sort, office).then(data =>
    res.status(200).send(data)
  )
})
app.listen(process.env.PORT)
