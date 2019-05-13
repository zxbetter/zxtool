const ora = require('ora')

module.exports = (callback, message) => {
  if (typeof callback !== 'function') return

  const spinner = ora(message)
  spinner.start()
  const result = callback()
  spinner.stop()

  return result
}
