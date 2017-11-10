'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  var data, dataProcesada, msg, _dataProcesada$proces, edad, getAllSkills, _getAllSkills, firstSkill, fourSkill, response;

  return Promise.resolve().then(function () {
    return Promise.resolve().then(function () {
      data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      dataProcesada = new _procdata2.default(data);
      return promiseFunction();
    }).then(function (_resp) {
      msg = _resp;
      _dataProcesada$proces = dataProcesada.processData();
      edad = _dataProcesada$proces.edad;
      getAllSkills = _dataProcesada$proces.getAllSkills;
      _getAllSkills = _slicedToArray(getAllSkills, 5);
      firstSkill = _getAllSkills[0];
      fourSkill = _getAllSkills[4];
      response = { edad: edad, msg: msg, firstSkill: firstSkill, fourSkill: fourSkill };

      callback(null, createResponse(200, response));
    }).catch(function (error) {
      console.log('Aquí hay un error', error);
      callback(null, createResponse(400, error));
    });
  }).then(function () {});
};