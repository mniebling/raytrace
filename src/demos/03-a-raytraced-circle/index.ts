import Vue from 'vue'
import {
  Canvas,
  chain,
  Color,
  hit,
  intersect,
  normalize,
  Point,
  Ray,
  scale,
  skew,
  Sphere,
  subtract
} from '@/engine'


export default Vue.extend({
  methods: {
    none: () => runDemo('none'),
    scale: () => runDemo('scale'),
    skew: () => runDemo('skew')
  },
  mounted: () => setTimeout(runDemo),
  template: require('./03.template.html')
})


function runDemo (mode?: string) {

  const canvasDimension = 200
  const canvas = new Canvas(canvasDimension, canvasDimension)

  const el = document.getElementById('canvasElement') as HTMLCanvasElement
  const ctx = el.getContext('2d') as CanvasRenderingContext2D

  ctx.putImageData(canvas.getImageData(), 0, 0)

  // Trace the sphere!
  const sphere = new Sphere()
  const origin = new Point(0, 0, -5)
  const surfaceZ = 10
  const surfaceSize = 8
  const pixelSize = surfaceSize / canvasDimension

  switch (mode) {
    case 'scale':
      sphere.transform = scale(0.5, 1, 1)
      break
    case 'skew':
      sphere.transform = chain(skew(1, 0, 0, 0, 0, 0), scale(0.5, 1, 1))
      break
  }

  for (let row = 0; row < canvas.height; row++) {
    const worldY = (surfaceSize / 2) - (pixelSize * row)

    for (let col = 0; col < canvas.width; col++) {
      const worldX = -(surfaceSize / 2) + (pixelSize * col)

      // Describe the point on the wall which the ray will target
      const position = new Point(worldX, worldY, surfaceZ)
      const originToPosition = subtract(position, origin)

      const ray = new Ray(origin, normalize(originToPosition))

      if (hit(intersect(ray, sphere))) {
        canvas.setPixel(row, col, new Color(1, 0.6, 0))
      }
    }
  }

  ctx.putImageData(canvas.getImageData(), 0, 0)
}
