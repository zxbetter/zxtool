const path = require('path')
const fs = require('fs')
const util = require('../util')

const BRANCH = '├─',
  LAST_BRANCH = '└─',
  TAB = '│  ',
  EMPTY_TAB = '   '

// 排除参数
const excludes = []

exports.run = function (program) {
  const args = program.args
  if (!args.length) {
    return util.showError('输入目录名称')
  }

  // 指定排除参数
  if (program.exclude && program.exclude.length) {
    program.exclude.forEach(function(item) {
      excludes.push(new RegExp(item))
    })
  }

  args.forEach(function (arg) {
    showDirTree(arg, '')
  })
}

/**
 * 输出指定目录的目录树
 * 
 * @param {string} dirName 目录名称
 * @param {string} palceHolder 占位符
 */
function showDirTree(dirName, palceHolder) {
  const dirPath = path.resolve(dirName)
  const dirStat = fs.statSync(dirPath)
  // 判断是否是目录
  if (!dirStat.isDirectory()) {
    // 命令参数中指定的不是目录，则直接输出。
    if (palceHolder === '' && validExclude(dirName)) {
      console.log(`${palceHolder}${LAST_BRANCH}${dirName}`)
    }
    return
  }

  const files = fs.readdirSync(dirPath)
  // 防止空的子目录重复输出。
  if (!files.length) {
    // 命令参数中指定的是空目录，则直接输出。
    if (palceHolder === '' && validExclude(dirName)) {
      console.log(`${palceHolder}${LAST_BRANCH}${dirName}`)
    }
    return
  }

  const validatedFiles = files.filter(function(file) {
    return validExclude(file)
  })

  // 遍历目录
  for (let i = 0; i < validatedFiles.length; i++) {
    const file = validatedFiles[i]
    const branch = i === validatedFiles.length - 1 ? LAST_BRANCH : BRANCH
    if (validExclude(file)) {
      console.log(`${palceHolder}${branch}${file}`)
    }

    const filePath = path.join(dirPath, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory()) {
      showDirTree(filePath,
        (palceHolder === '' && branch !== LAST_BRANCH) ?
        TAB :
        `${palceHolder}${(branch === LAST_BRANCH ? EMPTY_TAB : TAB)}`)
    }
  }
}

function validExclude(name) {
  for (let exclude of excludes) {
    if (exclude.test(name)) {
      return false
    }
  }
  return true
}
