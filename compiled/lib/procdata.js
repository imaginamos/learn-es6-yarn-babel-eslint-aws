'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Procdata = function () {
  function Procdata() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : require('../../datos.json').data;

    _classCallCheck(this, Procdata);

    this.data = data;
  }

  _createClass(Procdata, null, [{
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
  return this.data.reduce(function (before, current, array) {
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