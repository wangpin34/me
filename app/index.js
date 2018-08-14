import marked from 'marked'
import hljs from 'highlight.js'
import $ from "jquery";

import 'index.css'
//require('../node_modules/highlight.js/styles/xcode.css')
//require('../node_modules/highlight.js/styles/github.css')

require('../node_modules/github-markdown-css/github-markdown.css')
require('../node_modules/highlight.js/styles/github.css')

hljs.initHighlightingOnLoad()

$(document).ready(() => {

  const translate = () => {
    if (!$('#input-box')) return
    let input = $('#input-box').text()
    console.info(`input:${input}`)
    let output = marked(input)
    //console.info(`output:${output}`)
    if ($('#output-box')) {
      $('#output-box').html(output)
    }
  }

  const highlightCode = () => {
    $('#output-box') && $('#output-box p code').each((i, e) => {
      hljs.highlightBlock(e)
    })
  }

  if (window.innerWidth <= 767) {
    $('#output-box') && $('#output-box').hide()
  }

  $(document).on('keyup', '#input-box', () => {
    translate()
    highlightCode()
  })

  $(document).on('touchstart', '#code-btn', () => {
    $('#input-box').show()
    $('#output-box').hide()
  })

  $(document).on('touchstart', '#preview-btn', () => {
    $('#input-box').hide()
    $('#output-box').show()
    translate()
    highlightCode()
  })


})


