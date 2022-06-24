import { Peg } from '@drop-ball/model'
import React from 'react'
import PegView from './Peg'

const PegBoard: React.FC<{ pegs: Peg[]; pegRadius: number }> = ({ pegs, pegRadius }) => {
  return (
    <>
      {pegs.map(i => (
        <PegView
          position={i.position}
          pegRadius={pegRadius}
          key={`${i.position.x}-${i.position.y}`}
        />
      ))}
    </>
  )
}

export default PegBoard
