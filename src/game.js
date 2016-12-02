const grid = [
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
  [36, 4],
  // // Random cells
  [60, 47],
  [61, 47],
  [62, 47],
  [60, 48],
  [61, 48],
  [62, 48],
  [60, 49],
  [61, 49],
  [62, 49],
  [60, 51],
  [61, 51],
  [62, 51],
]

class GameOfLife {
  constructor(){
    this.board = document.querySelector('.board')
    this.fps = 10
    this.interval = 1000 / this.fps
    this.animation = null 
    this.then = 0
    this.makeBoard(100, 100)
  }
  
  makeBoard(rows, cols) {
    const cells = []

    for (var i = 0; i < rows; i++) {
      const row = document.createElement('div');
      row.classList.add('row')
      for (var j = 0; j < cols; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        row.appendChild(cell)
      }
      cells.push(row)
    }
    for (var i of cells) {
      this.board.appendChild(i)
    }
    this.configBoard()
  }

  configBoard() {
    const arr = this.getCells()
    
    grid.forEach(i => {
      const x = i[1]
      const y = i[0]
      arr[x][y].classList.add('live')
    })

    this.setupEvents()
  }

  setupEvents() {
    this.board = document.querySelector('.board');

    this.board.addEventListener('click', () => {
      const playing = this.board.classList.contains('playing')
      if (playing) {
        this.stopGame()
      } else {
        this.startGame()
      }
    })
    this.startGame()
  }

  getCells() {
    const c = document.querySelectorAll('.cell')
    const r = document.querySelectorAll('.row')

    const cells = Array.from(c)
    const rows = Array.from(r)
    const result = []
    for (var row of rows) {
      const rowArr = []
      const children = Array.from(row.childNodes)
      for (var cell of children) {
        rowArr.push(cell)
      }
      result.push(rowArr)
    }
    return result
  }

  collectNeighbors(arr, i, j) {
    const len = arr[0].length
    const neighbors = []
    
    // top left
    if (i - 1 >= 0 && j - 1 >= 0) { neighbors.push(arr[i - 1][j - 1]) }
    // top middle
    if (i - 1 >= 0) { neighbors.push(arr[i - 1][j]) }
    // top right
    if (i - 1 >= 0 && j + 1 < len) { neighbors.push(arr[i - 1][j + 1]) }
    // middle left
    if (j - 1 >= 0) { neighbors.push(arr[i][j - 1]) }
    // middle right
    if (j + 1 < len) { neighbors.push(arr[i][j + 1]) }
    // bottom left
    if (i + 1 < len && j - 1 >= 0) { neighbors.push(arr[i + 1][j - 1]) }
    // bottom middle
    if (i + 1 < len) { neighbors.push(arr[i + 1][j]) }
    // bottom right
    if (i + 1 < len && j + 1 < len) { neighbors.push(arr[i + 1][j + 1]) }
      
    return neighbors
  }

  runGame(ts) {
    const kill = []
    const born = []

    const arr = this.getCells()
    const livecells = document.querySelectorAll('.live').length

    if (livecells === 0) {
      this.stopGame()
      return false
    }
    
    let elapsed = ts - this.then
    if (elapsed > this.interval) {
      this.then = ts - (elapsed % this.interval)

      for (var [i, row] of arr.entries()) {
        for (var [j, cell] of row.entries()) {
          const neighbors = this.collectNeighbors(arr, i, j)
          const liveCount = neighbors.filter(function(i) {
              return i.classList.contains('live')
            }).length
            // live cells
          if (cell.classList.contains('live')) {
            // if live cell has less than two, or more
            // than three live neighbors, it dies
            if (liveCount > 3 || liveCount < 2) {
              kill.push(cell)
            }
            // dead cells
          } else {
            if (liveCount === 3) {
              // if dead cell has exactly three
              // live neighbors, it comes to life
              born.push(cell)
            }
          }
        }
      }    
    }

    kill.forEach(i => i.classList.remove('live'))
    born.forEach(i => i.classList.add('live'))

    this.animation = requestAnimationFrame((ts) => this.runGame(ts))
  }

  startGame() {
    this.runGame()
    this.board.classList.add('playing')
  }

  stopGame() {
    cancelAnimationFrame(this.animation)
    this.animation = null
    this.board.classList.remove('playing')
  }
}

new GameOfLife()
