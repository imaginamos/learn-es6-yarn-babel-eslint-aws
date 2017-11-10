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
    let dataProcesada = new Procdata(data)
    let msg = await promiseFunction()
    let { edad, getAllSkills } = dataProcesada.processData()
    let [firstSkill,,,, fourSkill] = getAllSkills
    let response = { edad, msg, firstSkill, fourSkill }
    callback(null, createResponse(200, response))
  } catch (error) {
    console.log('Aquí hay un error', error)
    callback(null, createResponse(400, error))
  }
}
