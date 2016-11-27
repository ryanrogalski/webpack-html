require('./style.css')
require('./index.html')

const wrap = document.createElement('div')
wrap.classList.add('color-wrap')

document.body.appendChild(wrap)

const makeColorGradient = (frequency1, frequency2, frequency3,
  phase1, phase2, phase3,
  center, width, len) => {
  if (center == undefined) center = 128;
  if (width == undefined) width = 127;
  if (len == undefined) len = 50;

  for (var i = 0; i < len; ++i) {
    var red = Math.sin(frequency1 * i + phase1) * width + center;
    var grn = Math.sin(frequency2 * i + phase2) * width + center;
    var blu = Math.sin(frequency3 * i + phase3) * width + center;

    const colorBlock = document.createElement('div')
    colorBlock.classList.add('color-block')
    const bg = RGB2Color(red, grn, blu)
    colorBlock.setAttribute('color', bg)
    
    colorBlock.style.borderColor = bg
    colorBlock.style.backgroundColor = bg

    wrap.appendChild(colorBlock);
  }
}

const RGB2Color = (r, g, b) => `#${byte2Hex(r)}${byte2Hex(g)}${byte2Hex(b)}`;

const byte2Hex = (n) => {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

makeColorGradient(.3,.3,.3,0,2,4, 230,25)

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomDec = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(4);
}

const getDirection = () => {
  const arr = [-1, 1]
  return arr[getRandom(0, 1)]
}

const rgb = (str) => str.match(/\w\w/g).map(b => parseInt(b, 16));

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const avgColor = (a, b) => {
  const color = []

  for (var i = 0; i < 3; i++) color[i] = a[i] + Math.random() * (b[i] - a[i]) | 0;

  const res = color
    .map(n => n.toString(16))
    .map(s => "00".slice(s.length) + s)
    .join('')

  return res;
}

class Ghost {
  constructor(size, img, x, y) {
    const spread = size * getRandomDec(.2, 1.2)
    this.alpha = 0
    this.startSize = size
    this.size = size / 3
    this.baby = true
    this.img = img
    this.cx = getRandom(x - spread, x + spread)
    this.cy = getRandom(y - spread, y + spread)
    this.speed = getRandom(500, 1500)
    this.radius = getRandom(5, 30)
    this.direction = getDirection()
    this.dead = false
    this.angle = 0
    this.saveTime = performance.now()
  }

  animate(ts) {
    const elapsed = ts - this.saveTime
    const inc = this.startSize / 500

    this.angle = Math.PI * (ts / this.speed)

    if (this.direction === 1) {
      this.x = this.cx + Math.cos(this.angle) * this.radius
      this.y = this.cy + Math.sin(this.angle) * this.radius
    } else {
      this.x = this.cx - Math.sin(this.angle) * this.radius
      this.y = this.cy - Math.cos(this.angle) * this.radius
    }          
    
    this.alpha = (this.size / this.startSize)
    
    if (this.baby) {    
      this.size = this.size + (elapsed * inc)
    } else {      
      this.size = this.startSize - ((elapsed / 2.2) * inc)
    }

    if (this.size >= this.startSize) {
      this.baby = false
      this.saveTime = ts
      this.startSize = this.size
    }
    
    if (this.size < 0) {
      this.dead = true
    }
  }
}

class GhostDraw {
  constructor() {
    this.ghostArray = []

    this.svg = document.querySelector('.ghost')

    this.colorWrap = document.querySelector('.color-wrap')
    this.colorWrap.childNodes[25].classList.add('selected')
    const startColor = document.querySelector('.color-block.selected').getAttribute('color')
    this.color = startColor
    this.size = 50

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.paint = false

    this.canvasSize = this.canvasSize.bind(this)
    this.pushGhost = this.pushGhost.bind(this)

    this.bindEvents()
    this.canvasSize()

    this.animateCanvas()
  }

  bindEvents() {
    window.addEventListener('resize', () => this.canvasSize())

    this.colorWrap.addEventListener('click', (e) => {
      const color = e.target.getAttribute('color')
      this.colorWrap.childNodes.forEach(i => i.classList.remove('selected'))
      this.color = color
      e.target.classList.add('selected')
    })    

    this.canvas.addEventListener('mousedown', (e) => {
      this.paint = true;
      this.pushGhost(e)
      this.cycle = setInterval(() => this.pushGhost(e), 100)
    })

    this.canvas.addEventListener('mousemove', (e) => {
      this.clearCycle()

      if (this.paint) {
        this.pushGhost(e)
        this.cycle = setInterval(() => this.pushGhost(e), 100)
      }
    })

    this.canvas.addEventListener('mouseup', (e) => {
      this.clearCycle()
      this.paint = false;
    })

    this.canvas.addEventListener('mouseleave', (e) => {
      this.clearCycle()
      this.paint = false;
    })
  }

  clearCycle() {
    clearInterval(this.cycle)
    this.cycle = null
  }

  pushGhost(e) {
    const cloudSize = Math.floor(getRandom(50, 150) / this.size)

    for (let i = 0; i < cloudSize; i++) {

      const base = rgb('#ffffff')
      const cur = rgb(`#${this.color}`)
      const color = avgColor(base, cur)

      const g = new Ghost(
        getRandom(this.size - 20, this.size + 20),
        this.createImg(color),
        this.getMousePos(e).x,
        this.getMousePos(e).y
      )

      this.ghostArray.push(g)
    }
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
  }

  animateCanvas(ts) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (this.ghostArray.length > 0) {
      for (const g of this.ghostArray) {
        if (g.dead) {
          const i = this.ghostArray.indexOf(g)
          this.ghostArray.splice(i, 1)
        } else {
          const x = g.x - (g.size / 2)
          const y = g.y - (g.size / 2)

          this.ctx.globalAlpha = g.alpha
          this.ctx.drawImage(g.img, x, y, g.size, g.size)
          g.animate(ts)
        }
      }
    }

    requestAnimationFrame((ts) => this.animateCanvas(ts))
  }
}

new GhostDraw()