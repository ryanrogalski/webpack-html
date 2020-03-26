const invalidBoard = [
  [5, 3, 4, 6, 7, 9, 8, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 7],
  [6, 9, 8, 3, 4, 2, 7, 6, 5],

  [8, 5, 9, 7, 6, 1, 4, 2, 1],
  [4, 2, 6, 8, 5, 3, 7, 8, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],

  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 8, 8],
]

const validBoard = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],

  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],

  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
]

function checkArray(arr) {
  const set = new Set(arr)
  return set.size === arr.length
}

function getCells(board) {
  const cells = [[], [], [], [], [], [], [], [], []]

  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const cellIndex =
        Math.floor(rowIndex / 3) * 3 +
        Math.floor(colIndex / 3)

      cells[cellIndex].push(col)
    })
  })

  return cells
}

function getRows(board) {
  return board.map((row, i) => board.map((item) => item[i]))
}

function validateBoard(board) {
  const xValid = board.every(checkArray)

  const yValid = getRows(board).every(checkArray)

  const cellsValid = getCells(board).every(checkArray)

  return xValid && yValid && cellsValid
}

console.log(
  'invalid board:',
  validateBoard(invalidBoard),
  '\nvalidboard:',
  validateBoard(validBoard),
)
