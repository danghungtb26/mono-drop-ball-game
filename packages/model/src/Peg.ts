import { Point } from './Point'

export class Peg {
  position: Point = new Point(0, 0)

  constructor(x: number, y: number) {
    this.position = new Point(x, y)
  }
}
