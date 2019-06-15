import Vue from 'vue'
import { Canvas } from '@/engine/canvas'
import { add, multiply } from '@/engine/math-general'
import { normalize } from '@/engine/math-vectors'
import { Point, Vector, Color } from '@/engine/tuples'


export default Vue.extend({
  mounted: runDemo,
  template: require('./01.template.html')
})


function runDemo (): void {

  interface Projectile {
    position: Point
    velocity: Vector
  }

  interface Environment {
    gravity: Vector
    wind: Vector
  }

  const canvas = new Canvas(600, 400)

  const el = document.getElementById('canvasElement') as HTMLCanvasElement
  const ctx = el.getContext('2d')

  if (!ctx) throw new Error(`Error getting context from canvas.`)

  ctx.putImageData(canvas.getImageData(), 0, 0)

  // Initialize an environment and projectile.
  const env: Environment = {
    gravity: new Vector(0, -0.25, 0),
    wind: new Vector(-0.01, 0, 0)
  }

  const projectile: Projectile = {
    position: new Point(0, 1, 0),
    velocity: multiply(normalize(new Vector(1, 3, 0)), 10.0)
  }

  // In the physics loop, we calculate the projectile's natural movement and
  // then update its velocity according to the combined environmental forces.
  function updateEnv (env: Environment, proj: Projectile) {

    proj.position = add(proj.position, proj.velocity)

    const envForces = add(env.gravity, env.wind)
    proj.velocity = add(proj.velocity, envForces)
  }

  // Our rendering canvas has inverted coordinates from the world canvas
  function projectilePositionToCtxPosition(canvas: Canvas, p: Projectile): Point {

    return new Point(
      Math.round(p.position.x),
      Math.round((p.position.y > 0) ? canvas.height - p.position.y : canvas.height - 1),
      p.position.z
    )
  }

  // Get the updated canvas image data with the new point plotted
  function updateCanvas (canvas: Canvas, p: Projectile): ImageData {

    const pink = new Color(1, 0.7, 0.8)
    const pos = projectilePositionToCtxPosition(canvas, p)

    canvas.setPixel(pos.x, pos.y, pink)

    return canvas.getImageData()
  }

  // Run tick until the projectile is off the canvas.
  function tick () {

    if (!ctx) throw new Error(`No canvas context.`)

    updateEnv(env, projectile)
    ctx.putImageData(updateCanvas(canvas, projectile), 0, 0)

    if (projectile.position.y > 0) window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)
}
