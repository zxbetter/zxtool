/**
 * 下划线模式转驼峰模式
 * 
 * @param str 源字符串
 * @returns 转换后的字符串
 */
module.exports = (str) => {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
