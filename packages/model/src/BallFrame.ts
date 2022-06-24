import { Point } from './Point'
import { Vector } from './Vector'

export class BallFrame {
  position: Point = new Point(0, 0)

  velocity: Vector = new Vector(0, 0)

  frame: number = 0

  constructor(position: Point, velocity: Vector, frame: number) {
    this.position = new Point(position.x, position.y)
    this.velocity = new Vector(velocity.x, velocity.y)
    this.frame = frame
  }
}
