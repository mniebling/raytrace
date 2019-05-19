import { expect } from 'chai'
import { Canvas } from '@/canvas'
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

  describe('.getPixel()', () => {

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

  describe('.setPixel()', () => {

    it('should set the given pixel to the given color', () => {

      const canvas = new Canvas(5, 5)
      canvas.setPixel(1, 1, new Color(0.5, 0.5, 0.5))

      expect(equal(canvas.getPixel(1, 1), new Color(0.5, 0.5, 0.5)))
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
