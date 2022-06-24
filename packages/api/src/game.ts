import { Ball, BallFrame, BallPropType2, Peg, Point, Vector } from '@drop-ball/model'
import { api_ball, api_get_setting } from './config'
import { handleRequest } from './handle'
import { BaseParam, BaseResponse, PBaseResponse } from './types'

type ISettingResponse = {
  width: number
  height: number
  pegs: Peg[]
  peg_radius: number
  ball_radius: number
}

const getGameSetting: (param: BaseParam<any>) => PBaseResponse<ISettingResponse> = () => {
  return handleRequest<
    ISettingResponse,
    ISettingResponse & {
      peg_board: {
        pegs: any[]
      }
    }
  >(
    request => request.get(api_get_setting),
    r => ({
      data: {
        width: r.data.width,
        height: r.data.height,
        peg_radius: r.data.peg_radius,
        ball_radius: r.data.ball_radius,
        pegs: r.data.peg_board.pegs.map(i => Peg.fromJson(i)),
      },
    })
  )
}
type IBallResponse = {
  frames: BallFrame[]
  id: number
}
const newBall: <T extends Ball>(
  param: BaseParam<T>,
  handler?: (v: BallPropType2) => NonNullable<T>
) => PBaseResponse<T> = ({ input }, handle) => {
  const i = input!
  return handleRequest<
    typeof i,
    {
      ball: IBallResponse
    }
  >(
    request => request.post(api_ball),
    r => {
      const frame = r.data.ball.frames[0]
      const func = handle ?? Ball.fromJsonPositionAndVector
      return {
        data: func({
          position: frame.position,
          velocity: frame.velocity,
          frames: r.data.ball.frames.map(i => new BallFrame(i.position, i.velocity, i.frame)),
          id: r.data.ball.id,
        }),
      }
    }
  )
}

const GameApi = {
  getGameSetting,
  newBall,
}

export default GameApi
