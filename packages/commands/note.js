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

    // git status
    var status = await gitStaus()
    
    // 本地分支领先远程分支，需要推送本地分支到远程分支
    let onlyPushFlag = status.stdout.match(/Your branch is ahead of/)

    // 本地仓库无需提交
    let cleanFlag = status.stdout.match(/nothing to commit, working tree clean/)
    
    if (!onlyPushFlag && cleanFlag) {
      return console.log(chalk.green('nothing to commit, working tree clean'))
    }

    if (!onlyPushFlag) {
      // git add
      await gitAdd()
  
      // git commit
      await gitCommit(message)
    }

    // git pull
    const branch = status.stdout.match(/^On branch (.+)\s/)
    await gitPull(branch[1])

    // git push
    await gitPush(branch[1])

    console.log(chalk.green('Complete!'))
  } catch (err) {
    console.err(err)
  }
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
