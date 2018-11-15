const util = require('../util')

exports.run = function(program) {
  if (!program.source) {
    return util.showError('--source 参数必输')
  }
  if (!program.target) {
    return util.showError('--target 参数必输')
  }

  
}