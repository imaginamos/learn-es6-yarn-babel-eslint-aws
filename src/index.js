import Procdata from './lib/procdata'

function promiseFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Resuelta la tarea')
    }, 1000)
  })
}

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode || 400,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(message) || 'Incorrect id'
  }
}

module.exports.getStatistics = async (event, context, callback) => {
  try {
    let data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    let dataProcesada = new Procdata(data.programers)
    let msg = await promiseFunction()
    let response = {
      msg,
      edad: dataProcesada.promedioEdad(),
      todosSabenSkill: dataProcesada.todosConocen(data.todosSabenSkill),
      elMayordeEdad: dataProcesada.mayor(),
      frameworkJS: dataProcesada.quienSabeJS(data.frameworkJS),
      quienSabeDe: dataProcesada.quienSabe(data.framework),
      groupBy: dataProcesada.groupBy(data.groupBy),
      getAllSkills: dataProcesada.getAllSkills(),
      forEachSkilss: dataProcesada.forEachSkilss()
    }
    callback(null, createResponse(200, response))
  } catch (error) {
    console.log('Aquí hay un error', error)
    callback(null, createResponse(400, error))
  }
}
