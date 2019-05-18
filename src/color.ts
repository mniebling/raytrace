import { Tuple } from './tuples'


export class Color extends Tuple {

  constructor (r: number, g: number, b: number) {
    super(r, g, b, 0.0) // for now, only worry about RGB
  }

  get r (): number {
    return this._tuple[0]
  }

  get g (): number {
    return this._tuple[1]
  }

  get b (): number {
    return this._tuple[2]
  }

  get a (): number {
    return this._tuple[3]
  }

  set r (value: number) {
    this._tuple[0] = value
  }

  set g (value: number) {
    this._tuple[1] = value
  }

  set b (value: number) {
    this._tuple[2] = value
  }

  set a (value: number) {
    this._tuple[3] = value
  }
}
