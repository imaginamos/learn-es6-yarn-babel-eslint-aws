function promedioEdad(data) {
  return data.reduce((before, current, idx, array) => {
    return idx + 1 === array.length ? before / (idx + 1) : current.age + before
  }, 0)
}

function todosConocen(knowledge, data) {
  return data.every((element) => element.skills[knowledge].length)
}

function mayor(data) {
  return data.reduce((before, current) => current.age > before.age ? current : before)
}

function quienSabeJS(knowledge, data) {
  return data.map((element) => element.skills.js.includes(knowledge) ? element : undefined).filter((element) => element !== undefined)
}

function quienSabe(knowledge, data) {
  return data.map((element) => {
    let keySkills = Object.keys(element.skills)
    let isInSkills = keySkills.map((key) => element.skills[key].includes(knowledge))
    return isInSkills.includes(true) ? element : undefined
  }).filter((element) => element !== undefined)
}

function groupBy(data, key) {
  return data.reduce((before, current) => {
    (before[current[key]] = before[current[key]] || []).push(current)
    return before
  }, {})
}

function getAllSkills(data) {
  return data.reduce((before, current, array) => {
    Object.keys(current.skills).forEach((key) => {
      before = before.concat(current.skills[key])
    })
    return before.filter((item, idx, array) => array.indexOf(item) === idx)
  }, [])
}

function forEachSkilss(data) {
  let allSkills = getAllSkills(data)
  let bySkills = {}
  allSkills.forEach((skill) => {
    bySkills[skill] = quienSabe(skill, data)
  })
  return bySkills
}

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
    let response = {
      msg,
      edad: promedioEdad(data.programers),
      todosSabenSkill: todosConocen(data.todosSabenSkill, data.programers),
      elMayordeEdad: mayor(data.programers),
      frameworkJS: quienSabeJS(data.frameworkJS, data.programers),
      quienSabeDe: quienSabe(data.framework, data.programers),
      groupBy: groupBy(data.programers, data.groupBy),
      getAllSkills: getAllSkills(data.programers),
      forEachSkilss: forEachSkilss(data.programers)
    }
    callback(null, createResponse(200, response))
  } catch (error) {
    console.log('Aquí hay un error', error)
    callback(null, createResponse(400, error))
  }
}