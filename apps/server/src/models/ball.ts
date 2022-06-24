import { Ball as BallModel, BallPropType, Point } from '@drop-ball/model'
import { drop_position, kBallRadius, kEpsilon, kFPS, kPegSearchRadius } from '../constants/define'
import Pegboard from './Pegboard'

export class Ball extends BallModel {
  private mData: any[] = []

  frame: number = 1

  constructor(props: BallPropType) {
    super(props)
    this.mData.push(this.oneFrame())
  }

  private oneFrame() {
    return {
      position: this.position.clone(),
      velocity: this.velocity.clone(),
      frame: this.frame,
    }
  }

  clear() {
    this.mData = []
  }

  debug() {
    console.log(`position x: ${this.position.x}, y: ${this.position.y}`)
  }

  async start() {
    while (this.position.y < 600) {
      this.frame += 1
      // eslint-disable-next-line no-await-in-loop
      await this.updateOneFrame()
      this.mData.push(this.oneFrame())
    }
  }

  // override
  public update(): void {
    // this.mData.push(this.oneFrame())
  }

  get data() {
    return {
      frames: this.mData,
      id: this.id,
    }
  }

  async updateOneFrame() {
    return new Promise(resolve => {
      let time_to_sim = 1.0 / kFPS
      const new_pos = new Point(0, 0)
      for (let iter = 0; iter < 10 && time_to_sim >= kEpsilon; iter += 1) {
        let time_step = time_to_sim
        const speed = this.velocity.magnitude()
        if (time_step * speed > kBallRadius) {
          time_step = Math.max(kBallRadius / speed, kEpsilon)
        }

        new_pos.copyFrom(this.position)
        new_pos.mutateAddNTimes(this.velocity, time_step)
        // this.position.copyFrom(new_pos)
        // time_to_sim -= time_step
        let collide_peg = Pegboard.findNearestPeg(new_pos, kPegSearchRadius)
        if (collide_peg == null) {
          this.position.copyFrom(new_pos)

          // this.update()
          time_to_sim -= time_step
          // eslint-disable-next-line no-continue
          continue
        }
        while (time_step >= kEpsilon) {
          time_step /= 2
          new_pos.copyFrom(this.position)
          new_pos.mutateAddNTimes(this.velocity, time_step)
          const collide_peg_2 = Pegboard.findNearestPeg(new_pos, kPegSearchRadius)
          if (collide_peg_2 == null) {
            this.position.copyFrom(new_pos)

            // this.update()
            time_to_sim -= time_step
          }
        }
        new_pos.copyFrom(this.position)
        new_pos.mutateAddNTimes(this.velocity, time_step)
        collide_peg = Pegboard.findNearestPeg(new_pos, kPegSearchRadius)
        if (collide_peg == null) {
          time_to_sim -= time_step
          this.position.copyFrom(new_pos)
          // this.update()
        } else {
          const delta = this.position.deltaToPoint(collide_peg.position)
          // this.update()
          const perp_delta = delta.perpendicular()
          perp_delta.mutateNormalize()
          const parallel_vel = this.velocity.projectionOnto(delta)
          const perp_vel = this.velocity.subtract(parallel_vel)
          this.velocity.mutateAddNTimes(parallel_vel, -1 - 0.3)
          this.omega *= 0.3
          this.omega += perp_vel.dotProduct(perp_delta) / kBallRadius
          // this.update()

          // ++balls[b].bounces

          // In the extremely unlikely event a ball is balanced perfectly
          // on top of a peg, give it a tiny nudge.
          if (Math.abs(delta.x) < 1e-10 && Math.abs(this.velocity.x) < 1e-10) {
            this.velocity.MutateAdd(Ball.SampleGaussianNoise(0, 1e-5))
            // this.update()
          }
        }
      }
      this.velocity.y += this.accel / kFPS
      this.rotation += this.omega / kFPS
      this.rotation %= Math.PI * 2
      this.update()
      resolve({ position: this.position })
    })
  }

  static newBall = () => {
    const dNoise = Ball.SampleGaussianNoise(0, 20)
    const angleNoise = Ball.SampleGaussianNoise(0.0, 0.1)
    const ball = new Ball({
      x: drop_position.x,
      y: drop_position.y,
      accel: 500,
      dx: dNoise.x,
      dy: dNoise.y,
      rotation: angleNoise.x,
      omega: angleNoise.y,
    })
    return ball
  }
}
