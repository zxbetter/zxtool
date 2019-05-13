const execSync = require('child_process').execSync
const chalk = require('chalk')
const spinner = require('../libs/util/spinner')

module.exports = (options) => {
  if (options.init) return init(options.init)

  if (options.sync) return sync(options.sync)
}

/**
 * 同步笔记
 * 
 * @param message git 提交信息
 */
function sync(message) {
  try {
    const str2 = spinner(() => {
      const gitStatus = execSync('git status', {
        encoding: 'utf8'
      })
  
      const branch = gitStatus.match(/^On branch (.+)\s/)
  
      return execSync(`git pull origin ${branch[1]}`, {
        encoding: 'utf8'
      })
    }, `正在拉取最新内容\n`)

    console.log(str2);
  } catch (err) {
    console.log('execute error：')
    console.log(err.toString())
  }
}

/**
 * 初始化笔记
 * 
 * @param gitRepo git 仓库地址
 */
function init(gitRepo) {
  console.log(gitRepo)
}
