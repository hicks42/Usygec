(self["webpackChunk"] = self["webpackChunk"] || []).push([["upload"],{

/***/ "./assets/js/upload.js":
/*!*****************************!*\
  !*** ./assets/js/upload.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
// upload Module
var uploadBtns = document.querySelectorAll(".upload-btn");
// const uploadBtn = document.querySelector("#upload-btn");
var formTitle = document.querySelector("#form-title");
var submituploadBtn = document.querySelector(".submit-upload");
var closePopupdBtn = document.querySelector(".close-popup");
var uploadContainer = document.querySelector(".upload-container");
var uploadInput = document.querySelector(".upload-container input");
uploadBtns.forEach(function (uploadBtn) {
  uploadBtn.addEventListener("click", openModal);
});
closePopupdBtn.addEventListener("click", closeModal);
submituploadBtn.addEventListener("click", uploadFile);

// upload Modal
function openModal(e) {
  var structureId = e.target.getAttribute("data-structureid");
  // console.log(structureId);
  // const structureId = uploadBtn.getAttribute("data-structureid");
  formRow = "<input type=\"hidden\" id=\"csv_structureId\" class=\"formal-control\" name=\"csv[structureId]\" value=\"".concat(structureId, "\">");
  formTitle.insertAdjacentHTML('afterend', formRow);
  var popup = uploadContainer.children[0];
  uploadContainer.classList.add("active");
  popup.classList.add("active");
}
function closeModal(e) {
  var popup = uploadContainer.children[0];
  uploadContainer.classList.remove("active");
  popup.classList.remove("active");
}
function uploadFile(e) {
  uploadContainer.classList.remove("active");
  popup.classList.remove("active");
}

/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-token-list-prototype.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.for-each.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.for-each.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_expo-9e55a2"], () => (__webpack_exec__("./assets/js/upload.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLGNBQWMsbUJBQU8sQ0FBQyx1RkFBNkI7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQThEO0FBQ2xFO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDVFk7QUFDYixhQUFhLG1CQUFPLENBQUMsdUVBQXFCO0FBQzFDLG1CQUFtQixtQkFBTyxDQUFDLHFGQUE0QjtBQUN2RCw0QkFBNEIsbUJBQU8sQ0FBQywyR0FBdUM7QUFDM0UsY0FBYyxtQkFBTyxDQUFDLHVGQUE2QjtBQUNuRCxrQ0FBa0MsbUJBQU8sQ0FBQyx1SEFBNkM7O0FBRXZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3VwbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS10b2tlbi1saXN0LXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1cGxvYWQgTW9kdWxlXG5jb25zdCB1cGxvYWRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51cGxvYWQtYnRuXCIpO1xuLy8gY29uc3QgdXBsb2FkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1cGxvYWQtYnRuXCIpO1xuY29uc3QgZm9ybVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLXRpdGxlXCIpO1xuY29uc3Qgc3VibWl0dXBsb2FkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtdXBsb2FkXCIpO1xuY29uc3QgY2xvc2VQb3B1cGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlLXBvcHVwXCIpO1xuY29uc3QgdXBsb2FkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51cGxvYWQtY29udGFpbmVyXCIpO1xuY29uc3QgdXBsb2FkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVwbG9hZC1jb250YWluZXIgaW5wdXRcIik7XG5cbnVwbG9hZEJ0bnMuZm9yRWFjaCh1cGxvYWRCdG4gPT4ge1xuICB1cGxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Nb2RhbCk7XG59KTtcbmNsb3NlUG9wdXBkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZU1vZGFsKTtcbnN1Ym1pdHVwbG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdXBsb2FkRmlsZSk7XG5cbi8vIHVwbG9hZCBNb2RhbFxuZnVuY3Rpb24gb3Blbk1vZGFsKGUpIHtcbiAgY29uc3Qgc3RydWN0dXJlSWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cnVjdHVyZWlkXCIpO1xuICAvLyBjb25zb2xlLmxvZyhzdHJ1Y3R1cmVJZCk7XG4gIC8vIGNvbnN0IHN0cnVjdHVyZUlkID0gdXBsb2FkQnRuLmdldEF0dHJpYnV0ZShcImRhdGEtc3RydWN0dXJlaWRcIik7XG4gIGZvcm1Sb3cgPSBgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImNzdl9zdHJ1Y3R1cmVJZFwiIGNsYXNzPVwiZm9ybWFsLWNvbnRyb2xcIiBuYW1lPVwiY3N2W3N0cnVjdHVyZUlkXVwiIHZhbHVlPVwiJHtzdHJ1Y3R1cmVJZH1cIj5gO1xuICBmb3JtVGl0bGUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGZvcm1Sb3cpO1xuICBjb25zdCBwb3B1cCA9IHVwbG9hZENvbnRhaW5lci5jaGlsZHJlblswXTtcbiAgdXBsb2FkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwoZSkge1xuICBjb25zdCBwb3B1cCA9IHVwbG9hZENvbnRhaW5lci5jaGlsZHJlblswXTtcbiAgdXBsb2FkQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIHVwbG9hZEZpbGUoZSkge1xuICB1cGxvYWRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGluIG9sZCBXZWJLaXQgdmVyc2lvbnMsIGBlbGVtZW50LmNsYXNzTGlzdGAgaXMgbm90IGFuIGluc3RhbmNlIG9mIGdsb2JhbCBgRE9NVG9rZW5MaXN0YFxudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG52YXIgY2xhc3NMaXN0ID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdzcGFuJykuY2xhc3NMaXN0O1xudmFyIERPTVRva2VuTGlzdFByb3RvdHlwZSA9IGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuY29uc3RydWN0b3IgJiYgY2xhc3NMaXN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBET01Ub2tlbkxpc3RQcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgPyB1bmRlZmluZWQgOiBET01Ub2tlbkxpc3RQcm90b3R5cGU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIERPTVRva2VuTGlzdFByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20tdG9rZW4tbGlzdC1wcm90b3R5cGUnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG52YXIgaGFuZGxlUHJvdG90eXBlID0gZnVuY3Rpb24gKENvbGxlY3Rpb25Qcm90b3R5cGUpIHtcbiAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCAhPT0gZm9yRWFjaCkgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgJ2ZvckVhY2gnLCBmb3JFYWNoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggPSBmb3JFYWNoO1xuICB9XG59O1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIGlmIChET01JdGVyYWJsZXNbQ09MTEVDVElPTl9OQU1FXSkge1xuICAgIGhhbmRsZVByb3RvdHlwZShnbG9iYWxbQ09MTEVDVElPTl9OQU1FXSAmJiBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXS5wcm90b3R5cGUpO1xuICB9XG59XG5cbmhhbmRsZVByb3RvdHlwZShET01Ub2tlbkxpc3RQcm90b3R5cGUpO1xuIl0sIm5hbWVzIjpbInVwbG9hZEJ0bnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtVGl0bGUiLCJxdWVyeVNlbGVjdG9yIiwic3VibWl0dXBsb2FkQnRuIiwiY2xvc2VQb3B1cGRCdG4iLCJ1cGxvYWRDb250YWluZXIiLCJ1cGxvYWRJbnB1dCIsImZvckVhY2giLCJ1cGxvYWRCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwib3Blbk1vZGFsIiwiY2xvc2VNb2RhbCIsInVwbG9hZEZpbGUiLCJlIiwic3RydWN0dXJlSWQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJmb3JtUm93IiwiY29uY2F0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicG9wdXAiLCJjaGlsZHJlbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSJdLCJzb3VyY2VSb290IjoiIn0=