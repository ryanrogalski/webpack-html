const glider = [
  [1, 5],
  [1, 6],
  [2, 5],
  [2, 6],
  [11, 5],
  [11, 6],
  [11, 7],
  [12, 4],
  [12, 8],
  [13, 3],
  [13, 9],
  [14, 3],
  [14, 9],
  [15, 6],
  [16, 4],
  [16, 8],
  [17, 5],
  [17, 6],
  [17, 7],
  [18, 6],
  [21, 3],
  [21, 4],
  [21, 5],
  [22, 3],
  [22, 4],
  [22, 5],
  [23, 2],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4]
]

class Life {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.len = 64
    this.board = []
    this.sizeCanvas()
    this.createGrid()
    this.addEvents()
  }

  sizeCanvas() {
    this.canvas.width = window.innerWidth / 2
    this.canvas.height = this.canvas.width
    this.size = this.canvas.width / this.len
  }

  addEvents() {
    window.addEventListener('resize', () => this.sizeCanvas())
  }

  createGrid() {
    const board = []

    for (let i = 0; i < this.len; i++) {
      board[i] = []
      for (let j = 0; j < this.len; j++) {
        board[i][j] = 0
      }
    }

    // this.addGrid(board)
    this.addGlider(board)
  }

  addGrid(board) {
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (x % 2 && y % 2) board[x][y] = 1
      })
    })

    this.board = board
    this.draw()
  }

  addGlider(board) {
    glider.forEach(i => {
      const x = i[0]
      const y = i[1]
      board[x][y] = 1
    })
    this.board = board
    this.draw()
  }

  draw() {
    const ctx = this.ctx
    const size = this.size
    const board = this.board

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.strokeStyle = '#e1e1e1'
    ctx.fillStyle = '#67DDDD'

    for (const [x, row] of board.entries()) {
      for (const [y, cell] of row.entries()) {
        ctx.beginPath()
        ctx.rect(x * size, y * size, size, size)

        if (cell === 0) {
          ctx.stroke()
        } else {
          ctx.fill()
        }
      }
    }

    // requestAnimationFrame(() => this.updateCells())
    setTimeout(() => this.updateCells(), 500)
  }

  updateCells() {
    const arr = []
    const board = this.board

    board.forEach((row, x) => {
      arr[x] = []
      row.forEach((cell, y) => {
        let val = 0
        const neighbors = this.countNeighbors(x, y, board)

        // live cell
        if (cell === 1) {
          val = (neighbors === 2 || neighbors === 3) ? 1 : 0
            // dead cell
        } else {
          val = (neighbors === 3) ? 1 : 0
        }

        arr[x][y] = val
      })
    })

    this.board = arr

    this.draw()
  }

  countNeighbors(x, y, board) {
    let amount = 0
    const end = this.len - 1

    function checkCell(x, y) {
      if (x < 0 || y < 0 || x > end || y > end) return false
      if (board[x][y] === 1) return true
    }

    if (checkCell(x - 1, y - 1)) amount++
    if (checkCell(x - 1, y    )) amount++
    if (checkCell(x - 1, y + 1)) amount++

    if (checkCell(x - 1, y    )) amount++
    if (checkCell(x + 1, y    )) amount++

    if (checkCell(x + 1, y - 1)) amount++
    if (checkCell(x + 1, y    )) amount++
    if (checkCell(x + 1, y + 1)) amount++

    return amount
  }
}

new Life()