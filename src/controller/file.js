module.exports = function filesController( loopin, app ) {
  const express = require('express')
      , serveIndex = require('serve-index')

  app.use( '/loopin/file', express.static( loopin.filesAbsolute() ) )
  app.use( '/loopin/file', serveIndex( loopin.filesAbsolute() ) )
}
