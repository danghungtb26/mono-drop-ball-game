import { Peg, PegBoardModel as BasePegBoardModel } from '@drop-ball/model'
import { kCellSize, kHeight, kPegRadius, kWidth, pegs } from '../constants/define'

class PegBoardModel extends BasePegBoardModel {
  pegs: Peg[] = pegs

  width: number = kWidth

  height: number = kHeight + kPegRadius * 2

  grid_cols: number = Math.ceil(this.width / kCellSize)

  grid_rows: number = Math.ceil(this.height / kCellSize)

  kCellSize: number = kCellSize

  constructor() {
    super()
    this.cache = [...Array(this.grid_cols)].map(_ => [...Array(this.grid_rows)].map(() => Array(0)))

    for (let i = 0; i < this.pegs.length; i += 1) {
      const peg = pegs[i]
      if (
        peg.position.x < 0 ||
        peg.position.x > this.width ||
        peg.position.x < 0 ||
        peg.position.y > this.height
      ) {
        // eslint-disable-next-line no-continue
        continue
      }
      const row = Math.floor(peg.position.x / kCellSize)
      const col = Math.floor(peg.position.y / kCellSize)
      this.GetCacheCell(row, col).push(peg)
    }
  }

  toJson() {
    return {
      pegs: this.pegs,
      width: this.width,
      height: this.height,
    }
  }
}

const Pegboard = new PegBoardModel()

export default Pegboard
