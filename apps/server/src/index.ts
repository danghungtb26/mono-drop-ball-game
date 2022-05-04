import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { drop_position } from './constants/define'
import { Ball } from './models/Ball'
import route from './apis/ball'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use('/api', route)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
