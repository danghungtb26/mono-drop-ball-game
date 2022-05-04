import { Vector } from './Vector'

export class Point {
  x: number = 0

  y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  copyFrom(other: Point) {
    this.x = other.x
    this.y = other.y
  }

  mutateAddNTimes(other: Vector, time: number) {
    this.x += other.x * time
    this.y += other.y * time
  }

  distanceSqrToPoint(other: Point) {
    const dx = this.x - other.x
    const dy = this.y - other.y
    return dx * dx + dy * dy
  }

  deltaToPoint(other: Point) {
    return new Vector(other.x - this.x, other.y - this.y)
  }

  clone() {
    return new Point(this.x, this.y)
  }

  debugStr() {
    return `x: ${this.x}, y: ${this.y}`
  }
}
