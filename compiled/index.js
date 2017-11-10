'use strict';

var _procdata = require('./lib/procdata');

var _procdata2 = _interopRequireDefault(_procdata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promiseFunction() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('Resuelta la tarea');
    }, 1000);
  });
}

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode || 400,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(message) || 'Incorrect id'
  };
}

module.exports.getStatistics = function (event, context, callback) {
  var data, dataProcesada, msg, response;
  return Promise.resolve().then(function () {
    return Promise.resolve().then(function () {
      data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      dataProcesada = new _procdata2.default(data.programers);
      return promiseFunction();
    }).then(function (_resp) {
      msg = _resp;
      response = {
        msg: msg,
        edad: dataProcesada.promedioEdad(),
        todosSabenSkill: dataProcesada.todosConocen(data.todosSabenSkill),
        elMayordeEdad: dataProcesada.mayor(),
        frameworkJS: dataProcesada.quienSabeJS(data.frameworkJS),
        quienSabeDe: dataProcesada.quienSabe(data.framework),
        groupBy: dataProcesada.groupBy(data.groupBy),
        getAllSkills: dataProcesada.getAllSkills(),
        forEachSkilss: dataProcesada.forEachSkilss()
      };

      callback(null, createResponse(200, response));
    }).catch(function (error) {
      console.log('Aquí hay un error', error);
      callback(null, createResponse(400, error));
    });
  }).then(function () {});
};