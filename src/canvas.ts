import { Color } from './tuples'


export class Canvas {

  height: number
  pixelData: Color[]
  width: number

  constructor(
    width: number,
    height: number
  ) {
    this.width = width
    this.height = height

    this.pixelData = new Array(width * height).fill(new Color(0, 0, 0))
  }

  /**
   * Gets the color of the pixel at the given (x, y) coordinates.
   */
  getPixel (x: number, y: number): Color {

    if (x < 0 || y < 0) throw new Error(`x and y must be ≥ 0.`)

    if (x >= this.width) throw new Error(`x: ${x} is ≥ the canvas width (${this.width}).`)
    if (y >= this.height) throw new Error(`y: ${y} is ≥ the canvas height (${this.height}).`)

    const position = (y * this.width) + x

    return this.pixelData[position]
  }

  /**
   * Sets the pixel at the given (x, y) coordinate to the given color.
   */
  setPixel (x: number, y: number, color: Color): void {

    if (x < 0 || y < 0) throw new Error(`x and y must be ≥ 0.`)

    if (x >= this.width) throw new Error(`x: ${x} is ≥ the canvas width (${this.width}).`)
    if (y >= this.height) throw new Error(`y: ${y} is ≥ the canvas height (${this.height}).`)

    const position = (y * this.width) + x

    this.pixelData[position] = color
  }
}
