import { expect } from 'chai'
import { Canvas, clamp } from '@/canvas'
import { equal } from '@/math-tuples'
import { Color } from '@/tuples'


describe('canvas.ts', () => {

  describe('new Canvas()', () => {

    it('should have the correct dimensions', () => {

      const canvas = new Canvas(10, 20)

      expect(canvas.width).to.equal(10)
      expect(canvas.height).to.equal(20)
      expect(canvas.pixelData.length).to.equal(200)
    })

    it('should initialize all pixels to black', () => {

      const canvas = new Canvas(2, 4)
      const black = new Color(0, 0, 0)

      expect(canvas.pixelData.every(pixel => equal(pixel, black)))
    })
  })

  describe('clamp()', () => {

    it('should clamp 0 to 0', () => {

      expect(equal(clamp(0), 0)).to.be.true
    })

    it('should clamp 1 to 255', () => {

      expect(equal(clamp(1), 255)).to.be.true
    })

    it('should clamp 0.5 to 128', () => {

      expect(equal(clamp(0.5), 128)).to.be.true // round up from 127.5
    })

    it('should clamp -1 to 0', () => {

      expect(equal(clamp(-1), 0)).to.be.true
    })

    it('should clamp 300 to 255', () => {

      expect(equal(clamp(300), 255)).to.be.true
    })
  })

  describe('getImageData()', () => {

    it('should return an ImageData object', () => {

      const canvas = new Canvas(5, 5)
      canvas.setPixel(0, 0, new Color(1, 0, 0))

      const imageData = canvas.getImageData()

      expect(equal(imageData.width, canvas.width)).to.be.true
      expect(equal(imageData.height, canvas.height)).to.be.true

      expect(imageData.data instanceof Uint8ClampedArray).to.be.true

      // The first point should be spread into 4 clamped ints
      expect(equal(imageData.data[0], 255)).to.be.true
      expect(equal(imageData.data[1], 0)).to.be.true
      expect(equal(imageData.data[2], 0)).to.be.true
      expect(equal(imageData.data[3], 255)).to.be.true

      // Then the second point should follow the first point
      expect(equal(imageData.data[4], 0)).to.be.true
      expect(equal(imageData.data[5], 0)).to.be.true
      expect(equal(imageData.data[6], 0)).to.be.true
      expect(equal(imageData.data[7], 255)).to.be.true
    })
  })

  describe('getPixel()', () => {

    it('should get the color at the given pixel', () => {

      const canvas = new Canvas(5, 5)

      expect(canvas.getPixel(0, 0)).to.deep.almost(new Color(0, 0, 0))
    })

    it('should freak out about dimensions outside the canvas', () => {

      const canvas = new Canvas(5, 5)

      expect(() => canvas.getPixel(-1, 4)).to.throw()
      expect(() => canvas.getPixel(5, 5)).to.throw()
      expect(() => canvas.getPixel(20, 20)).to.throw()
    })
  })

  describe('setPixel()', () => {

    it('should set the given pixel to the given color', () => {

      const canvas = new Canvas(5, 5)
      canvas.setPixel(1, 1, new Color(0.5, 0.5, 0.5))

      expect(equal(canvas.getPixel(1, 1), new Color(0.5, 0.5, 0.5))).to.be.true
    })

     it('should freak out about dimensions outside the canvas', () => {

      const canvas = new Canvas(5, 5)
      const red = new Color(1, 0, 0)

      expect(() => canvas.setPixel(-1, 4, red)).to.throw()
      expect(() => canvas.setPixel(5, 5, red)).to.throw()
      expect(() => canvas.setPixel(20, 20, red)).to.throw()
    })
  })
})
