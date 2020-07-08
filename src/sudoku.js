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

function getY(board) {
  return board.map((row, i) => board.map((item) => item[i]))
}

function getCells(board) {
  const cells = [[], [], [], [], [], [], [], [], []]

  board.forEach((row, r) => {
    row.forEach((num, n) => {
      const index =
        Math.floor(r / 3) * 3 + Math.floor(n / 3)

      cells[index].push(num)
    })
  })

  return cells
}
function validateBoard(board) {
  const x = board.every(checkArray)
  const y = getY(board).every(checkArray)
  const cells = getCells(board).every(checkArray)

  return x && y && cells
}

console.log(
  'invalid board:',
  validateBoard(invalidBoard),
  '\nvalidboard:',
  validateBoard(validBoard),
)
