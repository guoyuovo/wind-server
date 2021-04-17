const compare = (key) => {
  return (value1, value2) => {
    const val1 = value1[key]
    const val2 = value2[key]
    return val1 - val2
  }
}

module.exports = compare
