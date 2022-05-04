import type { Peg } from './Peg'
import type { Point } from './Point'

export class PegBoardModel {
  pegs: Peg[] = []

  width: number = 0

  height: number = 0

  grid_cols: number = 0

  grid_rows: number = 0

  kCellSize: number = 1

  cache: Peg[][][] = []

  GetCacheCell(row: number, col: number) {
    return this.cache[row][col]
  }

  findNearestPeg(pt: Point, max_radius: number) {
    let result: Peg | null = null
    let result_dist_sqr = max_radius * max_radius

    let min_row = Math.floor((pt.y - max_radius) / this.kCellSize)
    if (min_row < 0) min_row = 0
    let max_row = Math.floor((pt.y + max_radius) / this.kCellSize)
    if (max_row >= this.grid_rows) max_row = this.grid_rows - 1
    let min_col = Math.floor((pt.x - max_radius) / this.kCellSize)
    if (min_col < 0) min_col = 0
    let max_col = Math.floor((pt.x + max_radius) / this.kCellSize)
    if (max_col >= this.grid_cols) max_col = this.grid_cols - 1
    for (let row = min_row; row <= max_row; row += 1) {
      for (let col = min_col; col <= max_col; col += 1) {
        const cell = this.GetCacheCell(col, row)

        for (let i = 0; i < cell.length; i += 1) {
          const dist_sqr = cell[i].position.distanceSqrToPoint(pt)

          if (dist_sqr < result_dist_sqr) {
            result = cell[i]

            result_dist_sqr = dist_sqr
          }
        }
      }
    }
    return result
  }
}
