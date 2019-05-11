const path = require('path')
const fs = require('fs')
const readline = require('readline')
const os = require('os')

let prefix, suffix, target

exports.run = function(program) {
  const args = program.args
  if (!args.length) {
    return console.log('输入文件名')
  }

  target = program.target || ''

  prefix = program.prefix || ''
  suffix = program.suffix || ''
  if (!prefix && !suffix) {
    return console.log('前缀和后缀至少输入一个')
  }

  args.forEach(function(arg) {
    addPrefixAndSuffix(arg)
  })
}

/**
 * 逐行读取文件，给每行添加前缀和后缀。
 * @param {string} fileName 文件名
 */
function addPrefixAndSuffix(fileName) {
  const readlineInterface = readline.createInterface({
    input: fs.createReadStream(fileName)
    // 指定 output 类似于复制，这样 on('line') 里就不必再调用 writeStream.write(line)
    // on('line') 是在 output 写入后调用，如果在 on('line') 里继续调用 writeStream.write(line)
    // 则会追加到下一行。
    // output: writeStream, 
    // terminal: true
  })

  const writeStream = target ? fs.createWriteStream(target) : null

  readlineInterface.on('line', function(line) {
    if (line !== '') {
      console.log(`${prefix}${line}${suffix}`)
      writeStream && writeStream.write(`${prefix}${line}${suffix}${os.EOL}`)
    } else {
      writeStream && writeStream.write(`${os.EOL}`)
    }
  })
}
