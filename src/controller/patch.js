module.exports = function patchController( loopin, app ) {
  const bodyParser = require('body-parser')

  app.use('/loopin/patch*', bodyParser.json() )

  app.post('/loopin/patch*', patch )
  app.patch('/loopin/patch*', patch )

  function patch( req, res ) {
    const path = req.params[0] || ''
    // console.log('patch', path, req.body )
    loopin.patch( req.body, path )
    res.status( 204 )
    res.end()
  }
}
