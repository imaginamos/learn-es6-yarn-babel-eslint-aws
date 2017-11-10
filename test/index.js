function getStatistics() {
  const getStatistics = require('../src/index').getStatistics
  const programers = require('../datos.json')
  const data = {
    programers: programers.data,
    todosSabenSkill: 'js',
    elMayordeEdad: 'js',
    frameworkJS: 'vue',
    quienSabeDe: 'vue',
    groupBy: 'age'
  }
  getStatistics({ body: data }, {}, (_, response) => {
    console.log(response.body)
  })
}

getStatistics()