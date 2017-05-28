const asArray = require('../util/asArray')
    , sendError = require('../util/sendError')

module.exports = function bufferController( loopin, app ) {
  loopin.plugin('image')
  loopin.plugin('bufferFile')

  app.get('/loopin/buffer/', function ( req, res ) {
    loopin.read('buffer')
    .then( asArray )
    .then( ( data ) => res.json( data ) )
  } )

  app.get('/loopin/buffer/*', function ( req, res ) {
    var split = splitBufferParam( req.params[0] )
      , key = split[0]
      , extension = split[1]

    if ( !extension ) {
      // Just spit out description of the buffer
      loopin.read('buffer/'+key)
      .then( ( data ) => res.json( data ) )
    } else {
      const extensions = loopin.image.extensions

      if ( extensions.indexOf( extension ) == -1 ) {
        res.sendStatus(400,'Unknown image extension')
      } else {
        loopin.bufferFile( key, {
          format: extension
        } )
        .catch( function ( error ) {
          sendError( res, error )
        } )
        .then( function ( tmp ) {
          res.set('x-loopin-frame', tmp.save.frame )
          res.sendFile( tmp.absolute )
        })
      }
    }


  })
}


/**
  Split the buffer parameter into key and extensions.

  foo => [ 'foo', null ]
  foo.jpg = ['foo', 'jpg']
*/
function splitBufferParam( key ) {
  var split = key.lastIndexOf('.')
  if ( split != -1 ) {
    return [ key.substr( 0, split ), key.substr( split + 1 ) ]
  } else {
    return [ key, null ]
  }
}
