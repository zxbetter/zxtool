const chalk = require('chalk')
const camelize = require('./camelize')

/**
 * commander 在 action() 方法中最后一个实参传递的是 Command 对象本身
 * 这里从 Command 对象中提取 options 参数。
 * 
 * @param cmd 
 */
module.exports = (cmd) => {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // 剔除没有指定的 option，以及 Command 对象的同名方法
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
