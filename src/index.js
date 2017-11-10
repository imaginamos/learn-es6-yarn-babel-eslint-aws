function promiseFunction(data) {
  return new Promise((resolve, reject) => {
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
    let msg = await promiseFunction()
    callback(null, createResponse(200, msg))
  } catch (error) {
    console.log('Aquí hay un error', error)
    callback(null, createResponse(400, error))
  }
}