class Procdata {
  constructor(data = require('../../datos.json').data) {
    this.data = data 
  }
  static getData() {
    return this.data || ['Hola']
  }
}

Procdata.prototype.promedioEdad = function promedioEdad() {
  return this.data.reduce((before, current, idx, array) => {
    return idx + 1 === array.length ? before / (idx + 1) : current.age + before
  }, 0)
}

Procdata.prototype.todosConocen = function todosConocen(knowledge) {
  return this.data.every((element) => element.skills[knowledge].length)
}

Procdata.prototype.mayor = function mayor() {
  return this.data.reduce((before, current) => current.age > before.age ? current : before)
}

Procdata.prototype.quienSabeJS = function quienSabeJS(knowledge) {
  return this.data.map((element) => element.skills.js.includes(knowledge) ? element : undefined).filter((element) => element !== undefined)
}

Procdata.prototype.quienSabe = function quienSabe(knowledge) {
  return this.data.map((element) => {
    let keySkills = Object.keys(element.skills)
    let isInSkills = keySkills.map((key) => element.skills[key].includes(knowledge))
    return isInSkills.includes(true) ? element : undefined
  }).filter((element) => element !== undefined)
}

Procdata.prototype.groupBy = function groupBy(key) {
  return this.data.reduce((before, current) => {
    (before[current[key]] = before[current[key]] || []).push(current)
    return before
  }, {})
}

Procdata.prototype.getAllSkills = function getAllSkills() {
  return this.data.reduce((before, current) => {
    Object.keys(current.skills).forEach((key) => {
      before = before.concat(current.skills[key])
    })
    return before.filter((item, idx, array) => array.indexOf(item) === idx)
  }, [])
}

Procdata.prototype.forEachSkilss = function forEachSkilss() {
  let allSkills = this.getAllSkills()
  let bySkills = {}
  allSkills.forEach((skill) => {
    bySkills[skill] = this.quienSabe(skill)
  })
  return bySkills
}

export default Procdata
module.exports = Procdata