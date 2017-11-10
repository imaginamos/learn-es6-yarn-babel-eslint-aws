'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Procdata = function () {
  function Procdata(_ref) {
    var _ref$programers = _ref.programers,
        programers = _ref$programers === undefined ? require('../../datos.json').data : _ref$programers,
        request = _ref.request;

    _classCallCheck(this, Procdata);

    this.data = programers;
    this.request = Object.keys(request).filter(function (key) {
      return ['todosSabenSkill', 'frameworkJS', 'framework', 'groupBy'].indexOf(key) > -1;
    }).reduce(function (newObj, key) {
      return _extends(newObj, _defineProperty({}, key, request[key]));
    }, {});
    this.processData();
  }

  _createClass(Procdata, [{
    key: 'processData',
    value: function processData() {
      return {
        edad: this.promedioEdad(),
        todosSabenSkill: this.todosConocen(this.request.todosSabenSkill),
        elMayordeEdad: this.mayor(),
        frameworkJS: this.quienSabeJS(this.request.frameworkJS),
        quienSabeDe: this.quienSabe(this.request.framework),
        groupBy: this.groupBy(this.request.groupBy),
        getAllSkills: this.getAllSkills(),
        forEachSkilss: this.forEachSkilss()
      };
    }
  }], [{
    key: 'getData',
    value: function getData() {
      return this.data || ['Hola'];
    }
  }]);

  return Procdata;
}();

Procdata.prototype.promedioEdad = function promedioEdad() {
  return this.data.reduce(function (before, current, idx, array) {
    return idx + 1 === array.length ? before / (idx + 1) : current.age + before;
  }, 0);
};

Procdata.prototype.todosConocen = function todosConocen(knowledge) {
  return this.data.every(function (element) {
    return element.skills[knowledge].length;
  });
};

Procdata.prototype.mayor = function mayor() {
  return this.data.reduce(function (before, current) {
    return current.age > before.age ? current : before;
  });
};

Procdata.prototype.quienSabeJS = function quienSabeJS(knowledge) {
  return this.data.map(function (element) {
    return element.skills.js.includes(knowledge) ? element : undefined;
  }).filter(function (element) {
    return element !== undefined;
  });
};

Procdata.prototype.quienSabe = function quienSabe(knowledge) {
  return this.data.map(function (element) {
    var keySkills = Object.keys(element.skills);
    var isInSkills = keySkills.map(function (key) {
      return element.skills[key].includes(knowledge);
    });
    return isInSkills.includes(true) ? element : undefined;
  }).filter(function (element) {
    return element !== undefined;
  });
};

Procdata.prototype.groupBy = function groupBy(key) {
  return this.data.reduce(function (before, current) {
    (before[current[key]] = before[current[key]] || []).push(current);
    return before;
  }, {});
};

Procdata.prototype.getAllSkills = function getAllSkills() {
  return this.data.reduce(function (before, current) {
    Object.keys(current.skills).forEach(function (key) {
      before = before.concat(current.skills[key]);
    });
    return before.filter(function (item, idx, array) {
      return array.indexOf(item) === idx;
    });
  }, []);
};

Procdata.prototype.forEachSkilss = function forEachSkilss() {
  var _this = this;

  var allSkills = this.getAllSkills();
  var bySkills = {};
  allSkills.forEach(function (skill) {
    bySkills[skill] = _this.quienSabe(skill);
  });
  return bySkills;
};

exports.default = Procdata;

module.exports = Procdata;