import { Peg, Point } from '@drop-ball/model'

const width = 812
export const kDropSideHeight = 100

export const kMargin = 24

export const kFPS = 30

export const kFrameInterval = 1000 / kFPS

export const kEpsilon = 1e-3 / kFPS

export const kWallSize = 10

export const kHalfWallSize = kWallSize / 2

export const kWidth = width - kMargin * 2

export const drop_position = new Point(kWidth / 2, kDropSideHeight - 60)

export const kColumns = 17

export const kRows = 15

export const kHorizontalPegQuantity = kColumns * 4 + 1

export const kPegRadius = kWidth / ((kHorizontalPegQuantity - 1) * 1.5 + 1) / 2

export const kHorizontalSpace = (kWidth - kPegRadius * 2) / kColumns

export const kBallRadius = (kHorizontalSpace - kPegRadius * 2 - 6) / 2

export const kVerticalSpace = (Math.sqrt(3) / 2) * kHorizontalSpace

export const kHeight = kVerticalSpace * (kRows - 1) + kHorizontalSpace + kDropSideHeight

export const kPegSearchRadius = kBallRadius + kPegRadius

export const kCellSize = kPegSearchRadius + 4

export const getPegs = () => {
  const pegsArray: Peg[] = []
  let y = kHeight - kPegRadius * 2

  for (let i = 0; i < kHorizontalPegQuantity; i += 1) {
    pegsArray.push(new Peg(i * 1.5 * kPegRadius * 2, kHeight + kPegRadius))
  }

  while (y > 0) {
    pegsArray.push(new Peg(0, y))
    pegsArray.push(new Peg(kWidth - kPegRadius * 2, y))

    y -= kPegRadius * 3
  }

  for (let i = 0; i < kRows; i += 1) {
    const check = i % 2 !== kRows % 2
    for (let j = 1; j < kColumns + (check ? 0 : 1); j += 1) {
      pegsArray.push(
        new Peg(
          j * kHorizontalSpace - (!check ? kHorizontalSpace / 2 : 0),
          i * kVerticalSpace + kDropSideHeight
        )
      )
    }

    if (!check) {
      const x_left = 0.25 * kHorizontalSpace
      const x_right = kWidth - x_left - kPegRadius * 2
      const y_above = i * kVerticalSpace + kDropSideHeight - kVerticalSpace / 4
      pegsArray.push(new Peg(x_left, y_above))
      pegsArray.push(new Peg(x_right, y_above))
    }
  }

  return pegsArray
}

const getTrianglePegs = () => {
  const pegsArray: Peg[] = []
  // const y = kHeight - kPegRadius * 2

  for (let i = 0; i < kHorizontalPegQuantity; i += 1) {
    pegsArray.push(new Peg(i * 1.5 * kPegRadius * 2, kHeight + kPegRadius))
  }

  // while (y > 0) {
  //   pegsArray.push(new Peg(0, y))
  //   pegsArray.push(new Peg(kWidth - kPegRadius * 2, y))

  //   y -= kPegRadius * 3
  // }

  for (let i = 0; i < kRows; i += 1) {
    const check = i % 2 !== kRows % 2
    const start = Math.max(0, (kColumns - 3) / 2 - Math.floor(i / 2))
    const end = kColumns - start + 1
    for (let j = start; j < end + (check ? 0 : 1); j += 1) {
      pegsArray.push(
        new Peg(
          j * kHorizontalSpace - (!check ? kHorizontalSpace / 2 : 0),
          i * kVerticalSpace + kDropSideHeight
        )
      )
    }

    // if (!check) {
    //   const x_left = 0.25 * kHorizontalSpace
    //   const x_right = kWidth - x_left - kPegRadius * 2
    //   const y_above = i * kVerticalSpace + kDropSideHeight - kVerticalSpace / 4
    //   pegsArray.push(new Peg(x_left, y_above))
    //   pegsArray.push(new Peg(x_right, y_above))
    // }
  }

  return pegsArray
}
export const pegs = getTrianglePegs()
