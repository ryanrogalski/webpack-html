require('./style.css')
require('./index.html')


class Logo {
  constructor(size, img, x, y){
    this.size = size;
    this.img = img;
    this.x = x;
    this.y = y;
  }
}

class LogoDraw {
  constructor() {
    this.svg = document.querySelector('.logo')
    this.reset = document.querySelector('.clear-btn')
    this.undo = document.querySelector('.undo-btn')

    this.sizeSlider = document.querySelector('.slider')
    this.size = window.innerWidth / 20
    this.sizeSlider.value = this.size

    this.colorSlider = document.querySelector('.jscolor')
    this.colorSlider.value = '#000000'
    this.color = this.colorSlider.value;
    this.coords = []

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.paint = false

    this.canvasSize = this.canvasSize.bind(this)
    this.pushPoint = this.pushPoint.bind(this)

    this.bindEvents()
    this.canvasSize()
    this.sizingLogos()
  }

  bindEvents() {    
    window.addEventListener('resize', () => this.canvasSize())
    this.reset.addEventListener('click', () => this.resetCanvas())
    this.undo.addEventListener('click', () => this.undoDraw())
    this.undo.addEventListener('mousedown', () => this.startUndo())
    this.undo.addEventListener('mouseup', () => this.stopUndo())

    this.sizeSlider.addEventListener('change', () => {
      this.size = this.sizeSlider.value;
    })

    this.colorSlider.addEventListener('change', () => {
      this.color = this.colorSlider.value;
    })

    this.canvas.addEventListener('mousedown', (e) => {
      this.paint = true;
      this.pushPoint(e)
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.paint) {
        this.pushPoint(e)
      }
    })

    this.canvas.addEventListener('mouseup', (e) => {
      this.paint = false;
    })

    this.canvas.addEventListener('mouseleave', (e) => {
      this.paint = false;
    })
  }

  sizingLogos() {
    const sm = document.querySelector('.logo-sm')
    const lg = document.querySelector('.logo-lg')
    const xml = (new XMLSerializer).serializeToString(this.svg)

    const img = new Image()
    img.src = `data:image/svg+xml;charset=utf-8,${xml}`

    sm.appendChild(img)
    lg.appendChild(img.cloneNode(true))
  }

  pushPoint(e) {
    const p = new Logo(this.size, this.createImg(this.colorSlider.value), this.getMousePos(e).x, this.getMousePos(e).y)
    this.coords.push(p)
    this.draw()
  }

  createImg(color) {
    const svg = this.svg
    svg.querySelector('#inner').style.fill = `${color}`
    const xml = (new XMLSerializer).serializeToString(svg)
    const img = new Image()
    img.src = `data:image/svg+xml;charset=utf-8,${xml}`
    return img;
  }


  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  
  canvasSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.draw()
  }

  resetCanvas() {
    this.coords.length = []
    this.paint = false;
    this.colorSlider.style = ''
    this.colorSlider.value = '#000000' 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  startUndo(){
    this.cycle = setInterval(() => {
      this.undoDraw()
    }, 100)
  }

  stopUndo(){
    clearInterval(this.cycle)
    this.cycle = null
  }

  undoDraw(){
    const coords = this.coords;
    coords.splice(-1, 1)
    this.coords = coords;
    this.draw()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const p of this.coords) {
      const x = p.x - (p.size / 2)
      const y = p.y - (p.size / 2)

      this.ctx.drawImage(p.img, x, y, p.size, p.size)    
    }
  }
}

new LogoDraw()