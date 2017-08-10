const audio = new AudioContext()

const createSineWave = (audio, duration) => {
  const osc = audio.createOscillator()

  osc.type = 'sine'
  osc.start(audio.currentTime)
  osc.stop(audio.currentTime + duration)

  return osc
}

const rampDown = (audio, item, start, duration) => {
  item.setValueAtTime(start, audio.currentTime)
  item.exponentialRampToValueAtTime(0.01, audio.currentTime + duration)
}

const createAmplifier = (audio, start, duration) => {
  const amp = audio.createGain()
  rampDown(audio, amp.gain, start, duration)
  return amp
}

const chain = (items) => {
  for (let i=0; i < items.length - 1; i++) {
    items[i].connect(items[i + 1])
  }
}

const note = (audio, freq) => {
  return function () {
    const duration = 1
    const sineWave = createSineWave(audio, duration)
    sineWave.frequency.value = freq
 
    chain([
      sineWave, 
      createAmplifier(audio, 0.2, duration),
      audio.destination
    ])
  }
}

const kick = (audio) => {
  return function () {
    const duration = 1
    const sineWave = createSineWave(audio, duration)
    rampDown(audio, sineWave.frequency, 160, duration)
    
    chain([
      sineWave, 
      createAmplifier(audio, 0.4, duration),
      audio.destination
    ])
  }
}

const createTrack = (color, playSound) => {
  const steps = []

  for (let i=0; i < 16; i++) {
    steps.push(false)
  }

  return {
    steps: steps,
    color: color, 
    playSound: playSound
  }
}

const buttonSize = 26

const buttonPosition = (col, row) => {
  return {
    x: buttonSize / 2 + col * buttonSize * 1.5,
    y: buttonSize / 2 + row * buttonSize * 1.5,
  }
}

const drawButton = (canvas, col, row, color) => {
  const position = buttonPosition(col, row)
  canvas.fillStyle = color;
  canvas.fillRect(position.x, position.y, buttonSize, buttonSize)
}

const drawTracks = (canvas, data) => {
  data.tracks.forEach((track, row) => {
    track.steps.forEach((on, col) => {
      drawButton(
        canvas, 
        col, 
        row, 
        on ? track.color : 'lightgray'
      )
    })
  })
}

const data = {
  step: 0,
  tracks: [
    createTrack('gold', note(audio, 880)),
    createTrack('gold', note(audio, 659)),
    createTrack('gold', note(audio, 587)),
    createTrack('gold', note(audio, 523)),
    createTrack('gold', note(audio, 440)),
    createTrack('dodgerblue', kick(audio))
  ]
}

const canvas = document.querySelector('canvas').getContext('2d')

const draw = () => {
  canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height)
  drawTracks(canvas, data)
  drawButton(canvas, data.step, data.tracks.length, 'deeppink')
  requestAnimationFrame(draw)
}

const isPointInButton = (pos, col, row) => {
  const b = buttonPosition(col, row)
  return !(
    pos.x < b.x ||
    pos.y < b.y ||
    pos.x > b.x + buttonSize ||
    pos.y > b.y + buttonSize
  )
}

const setupClick = () => {
  addEventListener('click', e => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    }
 
    data.tracks.forEach((track, row) => {
      track.steps.forEach((on, col) => {
        if (isPointInButton(pos, col, row)) {
          track.steps[col] = !on
        }
      })
    })   
  })
}

setupClick()
draw()

setInterval(() => {
  data.step = (data.step + 1) % data.tracks[0].steps.length

  data.tracks
    .filter(track => track.steps[data.step])
    .forEach(track => track.playSound())
}, 100)
