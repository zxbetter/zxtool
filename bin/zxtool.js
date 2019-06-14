#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const package = require('../package.json')
const cleanCmdArgs = require('../packages/libs/util/cleanCmdArgs')
const optionList = require('../packages/libs/type/list')
const fileTree = require('../packages/commands/file-tree')
const git = require('../packages/commands/git')

program
  .version(package.version)
  .usage('<command> [options]')

program
  .command('tree <dir> [dirs...]')
  .description('列出目录树')
  .option('-e --exclude <dir>', '排除指定的目录', optionList)
  .action((dir, dirs, cmd) => {
    fileTree(dirs.concat(dir), cleanCmdArgs(cmd))
  })

program
  .command('git')
  .description('GIT 工具')
  .option('-i, --init <git>', '初始化（需要指定 git 仓库地址）')
  .option('-s, --sync [message]', '同步本地和远程仓库')
  .action((cmd) => {
    let options = cleanCmdArgs(cmd)
    if (options.length === 0) return program.outputHelp()
    git(options)
  })

// 输入未知的命令时提示帮助信息
program
.arguments('<command>')
.action((cmd) => {
  program.outputHelp()
  console.log()
  console.log(`  ` + chalk.red(`未知的命令: ${chalk.yellow(cmd)}.`))
  console.log()
})

// 在帮助信息下添加自定义的信息
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`zxtool <command> --help`)} for detailed usage of given command.`)
  console.log()
})

// enhance common error messages
const enhanceErrorMessages = require('../packages/libs/util/enhanceErrorMessages')

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ``
  )
})

program.parse(process.argv)

// 未输入任何命令
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
