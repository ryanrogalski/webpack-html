require('./index.html')


var map = [
  [1, 5, 0, 0, 0, ],
  [0, 5, 0, 5, 5, ],
  [0, 5, 0, 0, 0, ],
  [0, 5, 0, 5, 0, ],
  [0, 0, 0, 5, 9, ],
];

function run() {
  // Create the map
  createMap();

  // Get the path
  path = getPath()

  
  // Highlight the path
  highlightPath(path);
}

function getPath() {
  this.path = []
  this.solved = false

  findNext(0,0)

  function findNext(x, y) {
    const cur = map[x][y]

    if (this.solved) {
    
      return this.path
    
    } else if (cur === 9) {
    
      this.path.push([x, y])
      this.solved = true 
    
    } else if (!this.solved && cur === 1 || cur === 0) {
      
      const len = map[0].length - 1

      this.path.push([x, y])

      map[x][y] = 2
    

      // bottom 
      if (x < len) { findNext(x + 1, y) }

      // right 
      if (y < len) { findNext(x, y + 1) }

      // left 
      if (y > 0) { findNext(x, y - 1) }

      // top 
      if (x > 0) { findNext(x - 1, y) }
    
    }
  }
  return this.path
}

function createMap() {
  // Make the rows
  for (var rowIndex = 0; rowIndex < map.length; rowIndex++) {
    var currentRow = map[rowIndex];
    var currentRowDiv = $('<div id="row' + rowIndex + '" class="mapRow"></div>');

    // Make the columns
    for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex++) {
      var currentColumn = currentRow[columnIndex];
      var currentColumnDiv = $('<div id="row' + rowIndex + 'column' + columnIndex + '" class="mapColumn"></div>');

      if (currentColumn == 1) {
        currentColumnDiv.addClass('start');
      } else if (currentColumn == 5) {
        currentColumnDiv.addClass('wall');
      } else if (currentColumn == 9) {
        currentColumnDiv.addClass('end');
      }

      currentRowDiv.append(currentColumnDiv);
    }

    $('#map').append(currentRowDiv);
  }
}

function highlightPath(path) {
  for (var i = 0; i < path.length; i++) {
    highlightPathNode(path[i][0], path[i][1], i);
  }
}

function highlightPathNode(rowIndex, columnIndex, pathIndex) {
  setTimeout(function() {
    $('#row' + rowIndex + 'column' + columnIndex).html(pathIndex).addClass('path').addClass('animate');
  }, pathIndex * 100);

  setTimeout(function() {
    $('#row' + rowIndex + 'column' + columnIndex).removeClass('animate');
  }, (pathIndex * 100) + 250);
}

run();
