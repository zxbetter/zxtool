const DEFAULT_SETTING = {
  format: 'yyyy-MM-dd HH:mm:ss'
}

/**
 * 校验日期合法性
 * 
 * @param date 待校验的日期
 */
const validate = (date) => {
  return !isNaN(date instanceof Date ? date : new Date(date))
}
exports.validate = validate

/**
 * 格式化时间
 * 
 * @param _date   可以是时间格式的字符串，时间对象或者时间戳
 * @param options 可选参数
 * @returns       返回格式化后的时间字符串，非法日期返回空字符串
 */
exports.formatDate = (_date, options) => {
  let date, fmt, patternObj

  if (!_date) {
    return ''
  }

  date = _date instanceof Date ? _date : new Date(_date)
  if (!validate(date)) {
    return ''
  }

  options = !options || {}
  fmt = options.format || DEFAULT_SETTING.format
  patternObj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() === 12 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S': date.getMilliseconds()
  }

  // 格式化年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  // 格式化月份至毫秒
  for (let p in patternObj) {
    if (new RegExp('(' + p + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1)
          ? patternObj[p]
          : ('00' + patternObj[p]).substr(('' + patternObj[p]).length))
    }
  }

  return fmt
}
