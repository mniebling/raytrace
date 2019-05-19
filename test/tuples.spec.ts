import { expect } from 'chai'
import { Tuple, isPoint, isVector, Point, Vector, Color } from '@/tuples'


describe('tuples.ts', () => {

  describe('new Tuple()', () => {

    it('should create points when w = 1.0', () => {

      const result = new Tuple(4.3, -4.2, 3.1, 1.0)

      expect(result._tuple[0]).to.equal(4.3)
      expect(result._tuple[1]).to.equal(-4.2)
      expect(result._tuple[2]).to.equal(3.1)
      expect(result._tuple[3]).to.equal(1.0)

      expect(isPoint(result)).to.equal(true)
      expect(isVector(result)).to.equal(false)
    })

    it('should create vectors when w = 0.0', () => {

      const result = new Tuple(4.3, -4.2, 3.1, 0.0)

      expect(result._tuple[0]).to.equal(4.3)
      expect(result._tuple[1]).to.equal(-4.2)
      expect(result._tuple[2]).to.equal(3.1)
      expect(result._tuple[3]).to.equal(0.0)

      expect(isPoint(result)).to.equal(false)
      expect(isVector(result)).to.equal(true)
    })
  })

  describe('new Color()', () => {

    it('should create colors', () => {

      const result = new Color(4.3, -4.2, 3.1)

      expect(result._tuple[0]).to.equal(4.3)
      expect(result._tuple[1]).to.equal(-4.2)
      expect(result._tuple[2]).to.equal(3.1)
      expect(result._tuple[3]).to.equal(1.0)
    })
  })

  describe('new Point()', () => {

    it('should create points', () => {

      const result = new Point(2.7, 1.0, -9.2)

      expect(result.x).to.equal(2.7)
      expect(result.y).to.equal(1.0)
      expect(result.z).to.equal(-9.2)
      expect(result.w).to.equal(1.0)

      expect(isPoint(result)).to.equal(true)
      expect(isVector(result)).to.equal(false)
    })
  })

  describe('new Vector()', () => {

    it('should create vectors', () => {

      const result = new Vector(2.7, 1.0, -9.2)

      expect(result.x).to.equal(2.7)
      expect(result.y).to.equal(1.0)
      expect(result.z).to.equal(-9.2)
      expect(result.w).to.equal(0.0)

      expect(isPoint(result)).to.equal(false)
      expect(isVector(result)).to.equal(true)
    })
  })

  describe('isPoint()', () => {

    it('should correctly detect points', () => {

      const point = new Tuple(-1.0, 2.5, -3.2, 1.0)
      const vector = new Tuple(2.0, 3.7, -1.0, 0.0)

      expect(isPoint(point)).to.equal(true)
      expect(isPoint(vector)).to.equal(false)
    })
  })

  describe('isVector()', () => {

    it('should correctly detect vectors', () => {

      const point = new Tuple(-1.0, 2.5, -3.2, 1.0)
      const vector = new Tuple(2.0, 3.7, -1.0, 0.0)

      expect(isVector(point)).to.equal(false)
      expect(isVector(vector)).to.equal(true)
    })
  })
})
