import { Point } from './Point'

export class Peg {
  position: Point = new Point(0, 0)

  constructor(x: number, y: number) {
    this.position = new Point(x, y)
  }

  toJson() {
    return {
      x: this.position.x,
      y: this.position.y,
    }
  }

  static fromJson(json: any) {
    return new Peg(json?.x ?? 0, json?.y ?? 0)
  }
}
