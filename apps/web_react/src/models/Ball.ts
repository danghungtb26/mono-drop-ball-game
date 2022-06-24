import React from 'react'
import { Ball as BallBase } from '@drop-ball/model'
import { BallMethod } from '../components/Ball'

export class Ball extends BallBase {
  ref: React.RefObject<BallMethod> = React.createRef<BallMethod>()

  public updateFrame(): boolean {
    // this.position.copyFrom()
    this.current_frame += 1
    if (this.current_frame >= this.frames.length) {
      return false
    }
    this.position = this.frames[this.current_frame].position
    this.ref.current?.updatePosition(this.position)
    return true
  }
}
