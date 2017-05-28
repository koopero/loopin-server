const _ = require('lodash')

module.exports = function asArray( data ) {
  return _.map( data, function ( item, name ) {
    return _.merge( {}, item, { name: name })
  })
}
