const chalk = require('chalk')

exports.showError = function(msg) {
  console.error(chalk.red.bold(msg))
}