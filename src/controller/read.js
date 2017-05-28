module.exports = function readController( loopin, app ) {
  loopin.plugin('read')

  app.get('/loopin/read/*', function ( req, res ) {
    var path = req.params[0]

    loopin.read( path )
    .then( function( data ) {
      res.json( data )
    })
  })
}
