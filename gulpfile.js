const gulp = require("gulp")
const svg = require('svgexport')

const inputBase = './svg-assets'
const inputFiles = {
  close: {
    normal: 'close.svg',
    hover: 'close_prelight.svg',
    active: 'close_pressed.svg',
    backdrop: 'close_unfocused.svg'
  },
  maximize: {
    normal: 'maximize.svg',
    hover: 'maximize_prelight.svg',
    active: 'maximize_pressed.svg',
    backdrop: 'maximize_unfocused.svg'
  },
  minimize: {
    normal: 'minimize.svg',
    hover: 'minimize_prelight.svg',
    active: 'minimize_pressed.svg',
    backdrop: 'minimize_unfocused.svg'
  }
}

const outputBase = './png-assets'

postfixes = [
  '.png png 100% 4:4:16:16 16:16',
  '@2.png png 100% 4:4:16:16 32:32',
  '-dark.png png 100% 4:4:16:16 16:16',
  '-dark@2.png png 100% 4:4:16:16 32:32'
]

const render = (input, output) => {
  return new Promise(resolve => svg.render(postfixes.map(postfix => ({
    input,
    output: output + postfix
  }))), () => resolve())
}

gulp.task('default', () => {
  Promise.all(Object.keys(inputFiles).map(button => {
    const states = inputFiles[button]

    return Promise.all([
      render(`${inputBase}/${states.normal}`, `${outputBase}/titlebutton-${button}`),
      render(`${inputBase}/${states.hover}`, `${outputBase}/titlebutton-${button}-hover`),
      render(`${inputBase}/${states.active}`, `${outputBase}/titlebutton-${button}-active`),
      render(`${inputBase}/${states.backdrop}`, `${outputBase}/titlebutton-${button}-backdrop`)
    ]).then(() => {
      console.log(`${button} done`)
    })
  })).then(() => {
    console.log(`done`)
  })
})
