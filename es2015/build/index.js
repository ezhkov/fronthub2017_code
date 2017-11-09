webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_accordion__ = __webpack_require__(1);


const Acc = new __WEBPACK_IMPORTED_MODULE_0__modules_accordion__["a" /* default */]('.accordion-container');

Acc.init();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Accordion {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.events = {
      handleTriggerClick() {
        // ... Слушаем клик
      }
    };
  }
  init() {
    this.initializeUI();
    this.initializeEvents();
    console.log('Accordion initialized');
  }
  initializeUI() {
    // ... Инициализируем какие-то интерфейсные вещи, расчеты, классы
  }
  initializeEvents() {
    this.container.addEventListener('click', this.events.handleTriggerClick);
    // ... Инициализируем другие события, необходимые для работы
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Accordion;


/***/ })
],[0]);