const chalk = require('chalk')
const spinner = require('../libs/util/spinner')
const dateFormat = require('../libs/util/date').formatDate

module.exports = (options) => {
  if (options.init) return init(options.init)

  if (options.sync) return sync(options.sync)
}

/**
 * 同步笔记
 * 
 * @param message git 提交信息
 */
async function sync(message) {
  try {

    // git add
    await gitAdd()

    // git status
    let status = await gitStaus()
    
    let statusMessage = status.stdout

    // 本地分支领先远程分支，需要推送本地分支到远程分支
    let onlyPushFlag = /Your branch is ahead of/.test(statusMessage)

    // 本地仓库无需提交
    let cleanFlag = /nothing to commit, working tree clean/.test(statusMessage)
    
    if (!onlyPushFlag && cleanFlag) {
      return console.log(chalk.green('nothing to commit, working tree clean'))
    }

    if (!onlyPushFlag) {
      // git commit
      await gitCommit(message)
    }

    // git pull
    const branch = statusMessage.match(/^On branch (.+)\s/)
    await gitPull(branch[1])

    // git push
    await gitPush(branch[1])

    // 打印修改的文件
    if (!onlyPushFlag) {
      printSummary(statusMessage)
    }

    console.log(chalk.green('Complete!'))
  } catch (err) {
    console.err(err)
  }
}

/**
 * 输出修改的文件
 * 
 * @param statusMessage git status 的输出信息
 */
function printSummary(statusMessage) {
  const newFiles = statusMessage.match(/new file:\s+(.+)/g)
  const modifiedFiles = statusMessage.match(/modified:\s+(.+)/g)
  const deleteFiles = statusMessage.match(/deleted:\s+(.+)/g)

  let allFiles = []
  allFiles = !!newFiles ? allFiles.concat(newFiles) : allFiles
  allFiles = !!modifiedFiles ? allFiles.concat(modifiedFiles) : allFiles
  allFiles = !!deleteFiles ? allFiles.concat(deleteFiles) : allFiles

  if (allFiles.length === 0) return

  const maxLength = allFiles.map(a => getStrLength(a)).reduce((a, b) => a > b ? a : b)
  const topBottom = new Array(maxLength + 5).join('=')

  console.log(`\n${topBottom}`)
  printArray(newFiles, maxLength, chalk.green)
  printArray(modifiedFiles, maxLength, chalk.yellow)
  printArray(deleteFiles, maxLength, chalk.red)
  console.log(`${topBottom}\n`)
}

/**
 * 打印数组
 * 
 * @param array 数组
 * @param maxLength 最大长度
 * @param color chalk
 */
function printArray(array, maxLength, color) {
  if (!array) return
  array.forEach(o => {
    console.log(`= ${!!color ? color(o) : o}${new Array(maxLength - getStrLength(o) + 2).join(' ')}=`)
  })
}

/**
 * 获取字符串长度，汉字长度为 2
 * @param str 字符串
 */
function getStrLength(str) {
  const zhCNReg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g
  let zhCharArray = str.match(zhCNReg)
  return !zhCharArray ? str.length : str.length + zhCharArray.length
}

/**
 * git commit
 * 
 * @param message commit 的消息
 */
function gitCommit(message) {
  if (message === true) {
    message = `Update changes: ${dateFormat(new Date())}`
  }
  return spinner.spinnerAsync(`git commit -m "${message}"`, `Record changes to the repository`)
}

/**
 * git add
 */
function gitAdd() {
  return spinner.spinnerAsync(`git add .`, `Adding changes to the index`)
}

/**
 * git pull
 * 
 * @param branch 远程分支名称
 */
function gitPull(branch) {
  return spinner.spinnerAsync(`git pull origin ${branch}`, `Pulling from remote ${branch}`)
}

/**
 * git push
 * 
 * @param branch 远程分支名称
 */
function gitPush(branch) {
  return spinner.spinnerAsync(`git push origin ${branch}`, `Pushing to remote ${branch}`)
}

/**
 * git status
 */
function gitStaus() {
  return spinner.spinnerAsync('git status', 'Checking the working tree status')
}

/**
 * 初始化笔记
 * 
 * @param gitRepo git 仓库地址
 */
function init(gitRepo) {
  console.log(gitRepo)
}
