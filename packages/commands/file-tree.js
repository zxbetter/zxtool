const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const BRANCH = '├─',
  LAST_BRANCH = '└─',
  TAB = '│  ',
  EMPTY_TAB = '   '

// 排除参数
const excludes = []

module.exports = (dirs, options) => {
  // 指定排除参数
  if (options.exclude && options.exclude.length) {
    options.exclude.forEach(function (item) {
      excludes.push(new RegExp(item))
    })
  }

  const groupObj = groupDirs('', dirs)

  // 处理入参中的目录
  groupObj.dir.forEach(dir => {
    console.log(`${chalk.cyan(path.resolve(dir))} 处理结果：`)
    showDirTree(process.cwd() === path.resolve(dir) ? '.' : path.basename(path.resolve(dir)), '')
  })

  // 处理入参中的文件
  groupObj.file.forEach(file => {
    const fileName = path.basename(path.resolve(file))

    if (validExclude(fileName)) {
      console.log(`${chalk.cyan(path.resolve(file))} 处理结果：`)
      console.log(`${LAST_BRANCH}${fileName}`)
    }
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
  const files = fs.readdirSync(dirPath)
  // 防止空的子目录重复输出。
  if (!files.length) {
    // 命令参数中指定的是空目录，则直接输出。
    if (palceHolder === '' && validExclude(dirName)) {
      console.log(`${palceHolder}${LAST_BRANCH}${dirName}`)
    }
    return
  }

  const validatedFiles = files.filter(function (file) {
    return validExclude(file)
  })

  const groupObj = groupDirs(dirPath, validatedFiles)

  // 先输出目录
  for (let i = 0, childDirs = groupObj.dir; i < childDirs.length; i++) {
    let dirName = childDirs[i]
    let branch = i === validatedFiles.length - 1 ? LAST_BRANCH : BRANCH
    console.log(`${palceHolder}${branch}${dirName}`)
    showDirTree(path.join(dirPath, dirName),
      (palceHolder === '' && branch !== LAST_BRANCH) ?
      TAB :
      `${palceHolder}${(branch === LAST_BRANCH ? EMPTY_TAB : TAB)}`)
  }

  // 再输出文件
  for (let i = 0, childFiles = groupObj.file; i < childFiles.length; i++) {
    console.log(`${palceHolder}${i === childFiles.length - 1 ? LAST_BRANCH : BRANCH}${childFiles[i]}`)
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

/**
 * 把目录和文件分开
 * 
 * @param root 根目录
 * @param dirs 待分组的文件
 * @returns 分组后的结果
 */
function groupDirs(root, dirs) {
  let result = {
    dir: [],
    file: []
  }

  if (!dirs || !dirs.length) return result;

  for (let i = 0; i < dirs.length; i++) {
    let dir = dirs[i]
    let filePath = path.resolve(root, dir)
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red(`${filePath} 文件或目录不存在`))
      continue
    }
    if (!fs.statSync(path.resolve(root, dir)).isDirectory()) {
      result.file.push(dir)
    } else {
      result.dir.push(dir)
    }
  }

  return result
}
