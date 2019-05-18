import { expect } from 'chai'
import { Color } from '@/color'


describe('color.ts', () => {

  describe('new Color()', () => {

    it('should create colors', () => {

      const result = new Color(4.3, -4.2, 3.1)

      expect(result._tuple[0]).to.equal(4.3)
      expect(result._tuple[1]).to.equal(-4.2)
      expect(result._tuple[2]).to.equal(3.1)
      expect(result._tuple[3]).to.equal(0.0)
    })
  })
})
