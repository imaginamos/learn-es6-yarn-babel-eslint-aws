function getStatistics() {
  const getStatistics = require('../src/index').getStatistics
  const data = require('../datos.json')
  getStatistics({ body: data.data })
}

getStatistics()