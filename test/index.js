function getStatistics() {
  const getStatistics = require('../compiled/index').getStatistics
  const programers = require('../datos.json')
  const data = {
    programers: programers.data,
    request: {
      todosSabenSkill: 'js',
      elMayordeEdad: 'js',
      frameworkJS: 'vue',
      quienSabeDe: 'vue',
      groupBy: 'age'
    }
  }
  getStatistics({ body: data }, {}, (_, response) => {
    console.log(response.body)
  })
}

getStatistics()