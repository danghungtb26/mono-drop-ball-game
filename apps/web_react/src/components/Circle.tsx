import { applyDefaultProps, PixiComponent } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

const Circle = PixiComponent<{ x: number; y: number; r: number; color: string }, PIXI.Graphics>(
  'Circle',
  {
    create: () => new PIXI.Graphics(),
    applyProps(ins, oldProps, newProps) {
      applyDefaultProps(ins, oldProps, newProps)

      const { color, r, x, y } = newProps
      ins.clear()
      ins.beginFill(0xffff0b)
      ins.drawCircle(x, y, r).endFill()
    },
  }
)

export default Circle
