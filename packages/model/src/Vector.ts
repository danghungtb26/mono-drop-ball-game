export class Vector {
  x: number = 0

  y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  magnitudeSqr() {
    return this.x * this.x + this.y * this.y
  }

  magnitude() {
    return Math.sqrt(this.magnitudeSqr())
  }

  perpendicular() {
    return new Vector(-this.y, this.x)
  }

  mutateNormalize() {
    const magnitude = this.magnitude()
    this.x /= magnitude
    this.y /= magnitude
  }

  dotProduct(other: Vector) {
    return this.x * other.x + this.y * other.y
  }

  normalize() {
    const magnitude = this.magnitude()
    return new Vector(this.x / magnitude, this.y / magnitude)
  }

  mutateMultiply(mult: number) {
    this.x *= mult
    this.y *= mult
  }

  projectionOnto(other: Vector) {
    const result = other.normalize()
    result.mutateMultiply(result.dotProduct(this))
    return result
  }

  subtract(other: Vector) {
    return new Vector(this.x - other.x, this.y - other.y)
  }

  multiply(mult: number) {
    return new Vector(this.x * mult, this.y * mult)
  }

  MutateAdd(other: Vector) {
    this.x += other.x
    this.y += other.y
  }

  mutateAddNTimes(other: Vector, n: number) {
    this.x += other.x * n
    this.y += other.y * n
  }

  clone() {
    return new Vector(this.x, this.y)
  }
}
