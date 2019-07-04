import Vue from 'vue'
import { Canvas } from '@/engine/canvas'
import { Point, Color } from '@/engine/tuples'
import { chain, translate, rotateZ } from '@/engine/transformations'
import { multiply, π } from '@/engine/math-general'


export default Vue.extend({
  mounted: runDemo,
  template: require('./02.template.html')
})


function runDemo (): void {

  let time = new Date()
  const $now = document.getElementById('now') as HTMLElement

  const canvas = new Canvas(400, 400)

  const el = document.getElementById('canvasElement') as HTMLCanvasElement
  const ctx = el.getContext('2d')

  if (!ctx) throw new Error(`Error getting context from canvas.`)

  ctx.putImageData(canvas.getImageData(), 0, 0)

  /**
   * Converts points from 2D Cartesian space (origin at the center) to canvas
   * space (origin at the top left).
   */
  function cartesianToCanvas (canvas: Canvas, p: Point): Point {

    const canvasCenterX = canvas.width / 2
    const canvasCenterY = canvas.height / 2

    return new Point(
      Math.floor(canvasCenterX + p.x),
      Math.floor(canvasCenterY - p.y),
      p.z
    )
  }

  /**
   * Draws an object (a square, in this case). The square is 5×5 and is
   * centered on the point described by `obj.position`.
   */
  function drawObject (canvas: Canvas, obj: Object) {

    const { x, y } = cartesianToCanvas(canvas, obj.position)

    if (x < 0 || x >= canvas.width) return
    if (y < 0 || y >= canvas.height) return

    for (let row = x - 2; row <= x + 2; row++) {
      for (let col = y - 2; col <= y + 2; col++) {
        canvas.setPixel(row, col, obj.color)
      }
    }
  }

  // Set up the scene:
  interface Object {
    color: Color
    position: Point
  }

  const blue = new Color(0.7, 0.7, 1)
  const orange = new Color(1, 0.6, 0)
  const pink = new Color(1, 0.7, 0.8)
  const white = new Color(1, 1, 1)

  const ticks: Object[] = []

  ticks.push({ color: pink, position: new Point(0, 0, 0) })

  for (let i = 0; i < 12; i++) {
    ticks.push({
      color: pink,
      position: multiply(
        chain(
          translate(0, 175, 0),
          rotateZ((π * i) / 6)
        ),
        new Point(0, 0, 0)
      )
    })
  }

  function tick () {

    if (!ctx) throw new Error(`No canvas context.`)

    // Update the time data & textual display
    time = new Date()
    $now.innerText = time.toLocaleTimeString()

    const secondHand = {
      color: white,
      position: multiply(
        chain(
          translate(0, 150, 0),
          rotateZ(-π * time.getSeconds() / 30) // positive z-axis rotation is counter-clockwise!
        ),
        new Point(0, 0, 0)
      )
    }

    const minuteHand = {
      color: orange,
      position: multiply(
        chain(
          translate(0, 125, 0),
          rotateZ(-π * time.getMinutes() / 30) // positive z-axis rotation is counter-clockwise!
        ),
        new Point(0, 0, 0)
      )
    }

    const hourHand = {
      color: blue,
      position: multiply(
        chain(
          translate(0, 100, 0),
          rotateZ(-π * time.getHours() / 6) // positive z-axis rotation is counter-clockwise!
        ),
        new Point(0, 0, 0)
      )
    }

    canvas.clear()

    ticks.forEach(tick => drawObject(canvas, tick))
    drawObject(canvas, secondHand)
    drawObject(canvas, minuteHand)
    drawObject(canvas, hourHand)

    ctx.putImageData(canvas.getImageData(), 0, 0)
    window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)
}
