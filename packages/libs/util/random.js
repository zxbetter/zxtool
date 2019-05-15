/**
 * 生成随机数
 * 
 * @param min 随机数的最小值
 * @param max 随机数的最大值
 * @returns 随机数
 */
module.exports = (min, max) => {
  if (!max) return parseInt(Math.random() * min + 1)
  return parseInt(Math.random() * (max - min + 1) + min)
}
