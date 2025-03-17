const ST = require('stjs')

function transformData (template, data) {
  if (!data || data === null) {
    return { error: 'Invalid response' }
  }
  return ST.select(template).transform(data).root()
}

module.exports = {
  transform: transformData
}
