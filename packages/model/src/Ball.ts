import { BallFrame } from './BallFrame'
import { Point } from './Point'
import { Vector } from './Vector'

export type BallPropType = {
  id?: number
  x: number
  y: number
  dx: number
  dy: number
  rotation: number
  omega: number
  accel?: number
  radius?: number
  frames?: BallFrame[]
}

export type BallPropType2 = {
  position: Point
  velocity: Vector
  frames: BallFrame[]
  id: number
}

export class Ball {
  id: number = 0

  radius: number = 0

  position: Point = new Point(0, 0)

  velocity: Vector = new Vector(0, 0)

  accel: number = 0

  omega: number = 0

  rotation: number = 0

  frames: BallFrame[] = []

  current_frame: number = 0

  constructor(json: BallPropType) {
    this.id = json.id ?? Ball.id
    Ball.id += 1
    this.position = new Point(json.x, json.y)
    this.velocity = new Vector(json.dx, json.dy)
    this.rotation = json.rotation
    this.omega = json.omega
    this.accel = json.accel ?? 150
    this.radius = json.radius ?? 1
    this.frames = json?.frames ?? []
    this.current_frame = 0
  }

  public update() {}

  private static id: number = 0

  public static SampleGaussianNoise = (mu: number, sigma: number) => {
    const two_pi = 2.0 * Math.PI

    let u1 = 0.0
    let u2 = 0.0
    do {
      u1 = Math.random()
      u2 = Math.random()
    } while (u1 <= Number.EPSILON)

    const magnitude = sigma * Math.sqrt(-2.0 * Math.log(u1))
    const z0 = magnitude * Math.cos(two_pi * u2) + mu
    const z1 = magnitude * Math.sin(two_pi * u2) + mu

    return new Vector(z0, z1)
  }

  public static fromJsonPositionAndVector<T extends Ball>(json: {
    position: Point
    velocity: Vector
    frames: BallFrame[]
    id: number
  }): T {
    return new this({
      x: json.position.x,
      y: json.position.y,
      dx: json.velocity.x,
      dy: json.velocity.y,
      rotation: 0,
      omega: 100,
      frames: json.frames,
      id: json.id,
    }) as T
  }
}
