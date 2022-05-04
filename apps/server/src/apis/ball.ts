import express, { Express, Request, Response } from 'express'
import Pegboard from '../models/Pegboard'
import { kWidth, kHeight, kBallRadius, kPegRadius } from '../constants/define'
import { Ball } from '../models/Ball'

const route: Express = express()

route.post('/ball', async (_req: Request, res: Response) => {
  const ball = Ball.newBall()
  await ball.start()
  res.send({
    data: {
      ball: ball.data,
    },
    status: 'success',
  })
})

route.get('/game/setting', (_, res: Response) => {
  res.send({
    peg_board: Pegboard.toJson(),
    width: kWidth,
    height: kHeight,
    ball_radius: kBallRadius,
    peg_radius: kPegRadius,
  })
})

export default route
