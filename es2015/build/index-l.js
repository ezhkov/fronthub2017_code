webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_accordion__ = __webpack_require__(1);


var Acc = new __WEBPACK_IMPORTED_MODULE_0__modules_accordion__["a" /* default */]('.accordion-container');

Acc.init();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accordion = function () {
  function Accordion(selector) {
    _classCallCheck(this, Accordion);

    this.container = document.querySelector(selector);
    this.events = {
      handleTriggerClick: function handleTriggerClick() {
        // ... Слушаем клик
      }
    };
  }

  _createClass(Accordion, [{
    key: 'init',
    value: function init() {
      this.initializeUI();
      this.initializeEvents();
      console.log('Accordion initialized');
    }
  }, {
    key: 'initializeUI',
    value: function initializeUI() {
      // ... Инициализируем какие-то интерфейсные вещи, расчеты, классы
    }
  }, {
    key: 'initializeEvents',
    value: function initializeEvents() {
      this.container.addEventListener('click', this.events.handleTriggerClick);
      // ... Инициализируем другие события, необходимые для работы
    }
  }]);

  return Accordion;
}();

/* harmony default export */ __webpack_exports__["a"] = (Accordion);

/***/ })
],[0]);