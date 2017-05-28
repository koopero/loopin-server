module.exports = function sendError( res, error ) {
  var jsonError = {}
  jsonError.mesg = error.data.msg
  res.status( 400 )
  res.json( jsonError )

}
