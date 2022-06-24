import { Point } from '@drop-ball/model'
import React from 'react'

type PegViewProps = {
  position: Point
  pegRadius: number
}

const PegView: React.FC<PegViewProps> = ({ position, pegRadius }) => {
  return <circle cx={position.x} cy={position.y} r={pegRadius} fill="green" />
}

export default PegView
