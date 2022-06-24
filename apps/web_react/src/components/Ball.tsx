import { Ball, Point } from '@drop-ball/model'
import React, { useImperativeHandle, useState } from 'react'
import Circle from './Circle'

type BallProps = {
  ball: Ball
  size: number
}

export type BallMethod = {
  updatePosition: (p: Point) => void
}

const BallView = React.forwardRef<BallMethod, BallProps>(({ ball, size }, ref) => {
  const [position, setPosition] = useState<Point>(ball.position)

  useImperativeHandle(ref, () => ({
    updatePosition: p => {
      setPosition(p)
    },
  }))

  // return <Circle x={position.x / 2} y={position.y / 2} r={size} color="" />
  return <circle cx={position.x} cy={position.y} r={size} fill="red" />
})

export default BallView
