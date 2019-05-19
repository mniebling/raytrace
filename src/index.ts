import { Canvas } from '@/canvas'


const c = new Canvas(15, 20)

function component() {

  const element = document.createElement('div')

  element.innerText = 'Hello World'
  c.getPixel(0, 0)

  return element
}




document.body.appendChild(component())
