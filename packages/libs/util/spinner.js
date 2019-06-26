const ora = require('ora')
const chalk = require('chalk')
const execa = require('execa')
const cliSpinners = require('cli-spinners/spinners.json')

exports.spinnerSync = (callback, spinnerText) => {
  if (typeof callback !== 'function') return

  const spinner = ora({
    text: chalk.cyan(spinnerText),
    spinner: cliSpinners.shark
  })
  spinner.start()
  const result = callback()
  spinner.succeed()

  return result
}

exports.spinnerAsync = (command, spinnerText) => {
  const spinner = ora({
    text: chalk.cyan(spinnerText),
    // https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
    spinner: cliSpinners.monkey
  })
  spinner.start()

  return doExeca(command, spinner)
}

const doExeca = async (command, spinner) => {
  let result

  try {
    result = await execa(command)
    if (!result.failed) {
      spinner.succeed()
    } else {
      spinner.fail()
    }
  } catch (error) {
    spinner.fail()
    console.error(error)
  }
  return result
}
