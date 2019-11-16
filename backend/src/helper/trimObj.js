const trimmer = (obj, keys) => {
  return keys.map(key => {

    if (obj[key] !== undefined)
      return ({ [key]: obj[key].trim() })

  })
    .reduce((bef, aft) => { return { ...bef, ...aft } })
}
module.exports = { trimmer }
