import marked from 'marked'
import hljs from 'highlight.js'
import 'index.css'
//require('../node_modules/highlight.js/styles/default.css')
require('../node_modules/highlight.js/styles/dark.css')
require('../node_modules/github-markdown-css/github-markdown.css')

hljs.initHighlightingOnLoad()

document.addEventListener('DOMContentLoaded', () => {

  let inputBox = document.getElementById('input-box')
  let outputBox = document.getElementById('output-box')

  inputBox.addEventListener('keyup', (e) => {
    let input = inputBox.innerText
    //console.info(`input:${input}`)
    let output = marked(input)
    //console.info(`output:${output}`)
    outputBox.innerHTML = output
    // outputBox.querySelectorAll('pre code').forEach(block => {
    //   hljs.highlightBlock(block)
    // })
  })

})


