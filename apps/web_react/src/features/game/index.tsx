import React, { useCallback, useEffect, useRef, useState } from 'react'
import GameApi from '@drop-ball/api/src/game'
import { BallFrame, Peg } from '@drop-ball/model'
import { Button } from 'antd'
import { Stage } from '@inlet/react-pixi'
import { Ball } from '../../models/Ball'
import PegBoard from '../../components/pegboard'
import BallView, { BallMethod } from '../../components/Ball'
import { kFrameInterval } from '../../constants/define'

const GameScreen: React.FC = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [ballRadius, setBallRadius] = useState<number>(0)
  const [pegRadius, setPegRadius] = useState<number>(0)
  const [pegs, setPegs] = useState<Peg[]>([])

  const [balls, setBalls] = useState<Ball[]>([])

  const state = useRef<{
    frames: number
    balls: Ball[]
    frames_since_redraw: number
    current_time: number
  }>({
    frames: 0,
    frames_since_redraw: 0,
    balls: [],
    current_time: Date.now(),
  })

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    state.current.balls = balls
  }, [balls])

  useEffect(() => {
    // const dNoise = SampleGaussianNoise(0, 20)

    // const ball = new Ball({ x: 150, y: 100, dx: dNoise.x, dy: dNoise.y })
    // setBalls(s => s.concat(ball))
    let a: number = 0

    const update = () => {
      const num_frames = Math.floor((Date.now() - state.current.current_time) / kFrameInterval)
      // console.log('🚀 ~ file: App.tsx ~ line 43 ~ update ~ num_frames', num_frames)
      for (let i = 0; i < num_frames; i += 1) {
        updateOneFrame()
      }
      state.current.frames_since_redraw += num_frames
    }

    const updateOneFrame = () => {
      state.current.current_time += kFrameInterval
      state.current.balls.forEach(ball => {
        const check = ball.updateFrame()
        if (!check) {
          setBalls(s => s.filter(i => i.id !== ball.id))
        }
      })
    }

    const interval = () => {
      // console.log('asd')
      update()
      if (state.current.frames_since_redraw <= 0) {
        a = requestAnimationFrame(interval)
        return
      }

      state.current.frames_since_redraw = 0
      a = requestAnimationFrame(interval)
    }
    // eslint-disable-next-line no-undef
    requestAnimationFrame(interval)
    // cancelAnimationFrame(a)
    // eslint-disable-next-line no-undef
    return () => cancelAnimationFrame(a)
  }, [])

  useEffect(() => {
    GameApi.getGameSetting({}).then(r => {
      if (r.success && r.data) {
        const { data } = r
        console.log('🚀 ~ file: index.tsx ~ line 19 ~ GameApi.getGameSetting ~ data', data)
        setWidth(data.width)
        setHeight(data.height)
        setBallRadius(data.ball_radius)
        setPegRadius(data.peg_radius)
        setPegs(data.pegs)
      }

      setLoading(false)
    })
  }, [])

  const onAddNewBall = useCallback(() => {
    GameApi.newBall<Ball>({}, v => Ball.fromJsonPositionAndVector<Ball>(v)).then(r => {
      console.log('🚀 ~ file: index.tsx ~ line 35 ~ GameApi.newBall ~ r', r)
      if (r.data && r.success) {
        setBalls(s => s.concat(r.data!))
      }
    })
  }, [])

  if (loading) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect width={width} height={height} fill="gray" />
        <g x={0} y={0} transform={`translate(${pegRadius} ${pegRadius})`}>
          <PegBoard pegs={pegs} pegRadius={pegRadius} />
          {balls.map(i => (
            <BallView ref={i.ref} ball={i} key={i.id} size={ballRadius} />
          ))}
        </g>
      </svg>
      {/* <Stage width={width} height={height} color="gray">
        {balls.map(i => (
          <BallView ball={i} key={i.id} size={ballRadius} />
        ))}
      </Stage> */}
      <Button onClick={onAddNewBall}>Add Ball</Button>
    </div>
  )
}

export default GameScreen
