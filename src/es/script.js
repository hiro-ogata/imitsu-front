"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sample = "aa";

var Person = /*#__PURE__*/function () {
  function Person(name, mt) {
    _classCallCheck(this, Person);

    this.name = name;
    this.mt = mt;
  }

  _createClass(Person, [{
    key: "climb",
    value: function climb() {
      console.log("".concat(this.name, " is climbing ").concat(this.mt));
    }
  }]);

  return Person;
}();

var kokona = new Person('CCCCC', 'BBB');
kokona.climb();