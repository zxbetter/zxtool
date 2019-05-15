const log = (object) => {
  if (!object) return console.log(object)

  if (typeof object !== 'object') return console.log(object)

  if (object instanceof Date) return console.log(object)

  if (object instanceof Array) {
    console.log('array start ->')
    object.forEach(o => log(o))
    console.log('array end   <-')
    return
  }

  console.log('object start ->')
  for (let key in object) {
    console.log(key, object[key])
  }
  console.log('object end   <-')
}

exports.log = log