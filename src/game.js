import grid from './grid'

class GameOfLife {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.cells = []
    this.side = 100

    this.fps = 30
    this.interval = 1000 / this.fps
    this.end = 0

    this.setupCanvas()
    this.buildGrid()
  }
  
  setupCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = this.canvas.width
    this.width = this.canvas.width
    this.cellSize = this.canvas.width / this.side;

    window.addEventListener('resize', () => {
      if (this.width !== window.innerWidth) this.setupCanvas()
    })
  }

  buildGrid() {
    for (var i = 0; i < this.side; i++) {
      this.cells[i] = []
      for (var j = 0; j < this.side; j++) {
        this.cells[i][j] = 0
      }
    }

    grid.forEach(i => {
      const x = i[0]
      const y = i[1]
      this.cells[x][y] = 1
    })

    this.draw()
  }

  update(ts) {
    let elapsed = ts - this.end

    var arr = []

    const countNeighbours = (x, y) => {
      var count = 0

      const checkCell = (x, y) => this.cells[x] && this.cells[x][y]

      if (checkCell(x - 1, y - 1)) count++
      if (checkCell(x, y - 1)) count++
      if (checkCell(x + 1, y - 1)) count++
      if (checkCell(x - 1, y)) count++
      if (checkCell(x + 1, y)) count++
      if (checkCell(x - 1, y + 1)) count++
      if (checkCell(x, y + 1)) count++
      if (checkCell(x + 1, y + 1)) count++

      return count
    }

    if (elapsed > this.interval) {
      this.end = ts - (elapsed % this.interval)

      this.cells.forEach(function(row, x) {
        arr[x] = []
        row.forEach(function(cell, y) {
          var alive = 0,
            count = countNeighbours(x, y)

          if (cell > 0) {
            alive = count === 2 || count === 3 ? 1 : 0
          } else {
            alive = count === 3 ? 1 : 0
          }

          arr[x][y] = alive
        })
      })

      this.cells = arr
    }

    this.draw(ts)
  }

  draw(ts) {
    const ctx = this.ctx
    const size = this.cellSize

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.strokeStyle = '#E8E8E8'
    ctx.lineWidth = .5
    ctx.fillStyle = '#658FFF'

    this.cells.forEach(function(row, x) {
      row.forEach(function(cell, y) {
        ctx.beginPath()
        ctx.rect(x * size, y * size, size, size)
        if (cell) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      })
    })

    this.animate = requestAnimationFrame((ts) => this.update(ts))
  }
}

new GameOfLife()