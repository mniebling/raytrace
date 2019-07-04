import { clamp } from '@/engine/math-general'
import { Color } from '@/engine/tuples'


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
   * Sets all pixels to the specified color (black, by default).
   */
  clear (color: Color = new Color(0, 0, 0)) {

    this.pixelData = new Array(this.width * this.height).fill(color)
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

  /**
   * Returns a representation of the canvas data which is compatible with the
   * `CanvasRenderingContext2D.putImageData()` method.
   *
   * ImageData's `data` property is a `Uint8ClampedArray`, with four sequential
   * 1-byte integers for each pixel, representing its RGBA values clamped to 0-255.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray
   */
  getImageData (): ImageData {

    // Preallocating the array improves performance.
    let data = new Uint8ClampedArray(this.pixelData.length * 4)

    // Loop through canvas pixels, spreading each pixel into its RGBA values,
    // clamping them to 0-255 and writing them to the `Uint8ClampedArray`.
    for (let i = 0; i < this.pixelData.length; i++) {

      let clampedValues = this.pixelData[i]._tuple.map(clamp)

      data[i * 4]       = clampedValues[0]
      data[(i * 4) + 1] = clampedValues[1]
      data[(i * 4) + 2] = clampedValues[2]
      data[(i * 4) + 3] = clampedValues[3]
    }

    // We can't just return an object in the `ImageData` shape, the constructor
    // has some magic somewhere.
    return new ImageData(data, this.width, this.height)
  }
}
