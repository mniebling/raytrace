import { Canvas } from '@/engine/canvas'
import { Color } from '@/engine/tuples'


describe('new Canvas()', () => {

  it('should have the correct dimensions', () => {

    const canvas = new Canvas(10, 20)

    expect(canvas.width).toBe(10)
    expect(canvas.height).toBe(20)
    expect(canvas.pixelData.length).toBe(200)
  })

  it('should initialize all pixels to black', () => {

    const canvas = new Canvas(2, 4)
    const black = new Color(0, 0, 0)

    canvas.pixelData.forEach(pixel => expect(pixel).toEqual(black))
  })
})

describe('getImageData()', () => {

  it('should return an ImageData object', () => {

    const canvas = new Canvas(5, 5)
    canvas.setPixel(0, 0, new Color(1, 0, 0))

    const imageData = canvas.getImageData()

    expect(imageData.width).toFloatingEqual(canvas.width)
    expect(imageData.height).toFloatingEqual(canvas.height)

    expect(imageData.data).toBeInstanceOf(Uint8ClampedArray)

    // The first point should be spread into 4 clamped ints
    expect(imageData.data[0]).toFloatingEqual(255)
    expect(imageData.data[1]).toFloatingEqual(0)
    expect(imageData.data[2]).toFloatingEqual(0)
    expect(imageData.data[3]).toFloatingEqual(255)

    // // Then the second point should follow the first point
    expect(imageData.data[4]).toFloatingEqual(0)
    expect(imageData.data[5]).toFloatingEqual(0)
    expect(imageData.data[6]).toFloatingEqual(0)
    expect(imageData.data[7]).toFloatingEqual(255)
  })
})

describe('getPixel()', () => {

  it('should get the color at the given pixel', () => {

    const canvas = new Canvas(5, 5)

    expect(canvas.getPixel(0, 0)).toBeDeepCloseTo(new Color(0, 0, 0))
  })

  it('should freak out about dimensions outside the canvas', () => {

    const canvas = new Canvas(5, 5)

    expect(() => canvas.getPixel(-1, 4)).toThrow()
    expect(() => canvas.getPixel(5, 5)).toThrow()
    expect(() => canvas.getPixel(20, 20)).toThrow()
  })
})

describe('setPixel()', () => {

  it('should set the given pixel to the given color', () => {

    const canvas = new Canvas(5, 5)
    canvas.setPixel(1, 1, new Color(0.5, 0.5, 0.5))

    expect(canvas.getPixel(1, 1)).toEqual(new Color(0.5, 0.5, 0.5))
  })

    it('should freak out about dimensions outside the canvas', () => {

    const canvas = new Canvas(5, 5)
    const red = new Color(1, 0, 0)

    expect(() => canvas.setPixel(-1, 4, red)).toThrow()
    expect(() => canvas.setPixel(5, 5, red)).toThrow()
    expect(() => canvas.setPixel(20, 20, red)).toThrow()
  })
})
