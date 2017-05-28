const _ = require('lodash')
    , resolve = require('path').resolve.bind( null, __dirname )
    , requireDir = require('require-dir')

function loopinServer() {
  const loopin = this

  loopin.plugin('files')

  const hortenServer = require('horten-server').global()

  hortenServer.configure( {
    root: loopin.filesRoot()
  } )

  _.map( arguments, arg => hortenServer.configure( arg ) )

  hortenServer.on('openExpress', addControllers )

  return {
    hortenServer,
    open
  }

  function open() {
    hortenServer.open()
  }

  function addControllers( app ) {
    const controllers = requireDir( resolve('src','controller' ) )
    _.map( controllers, ( controller ) => controller( loopin, app ) )
  }
}

module.exports = loopinServer
