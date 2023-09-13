(self["webpackChunk"] = self["webpackChunk"] || []).push([["collection"],{

/***/ "./assets/js/collection_managment.js":
/*!*******************************************!*\
  !*** ./assets/js/collection_managment.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
var addFormToCollection = function addFormToCollection(e) {
  var collectionHolder = document.querySelector('.' + e.currentTarget.dataset.collectionHolderClass);
  var item = document.createElement('li');
  item.className = "bg-light rounded overflow-hidden p-2 mt-3";
  item.innerHTML = collectionHolder.dataset.prototype.replace(/__name__/g, collectionHolder.dataset.index);
  collectionHolder.appendChild(item);
  collectionHolder.dataset.index++;
  addFormDeleteLink(item);
};
var addFormDeleteLink = function addFormDeleteLink(item) {
  var removeFormButton = document.createElement('button');
  removeFormButton.innerText = 'Supprimer X';
  removeFormButton.className = "btn btn-danger w-3 mt-2 btn-sm";
  item.append(removeFormButton);
  removeFormButton.addEventListener('click', function (e) {
    e.preventDefault();
    // remove the li for the structure form
    item.remove();
  });
};

// document.querySelectorAll('div.etbl > fieldset').forEach(field => {
//   field.className = `bg-light rounded overflow-hidden my-3 p-2`;
// });

document.querySelectorAll('div.etbl-card').forEach(function (group) {
  addFormDeleteLink(group);
});
document.querySelectorAll('ul.structures li').forEach(function (structure) {
  addFormDeleteLink(structure);
});
document.querySelectorAll('.add_item_link').forEach(function (btn) {
  btn.addEventListener("click", addFormToCollection);
});

// document.querySelectorAll('[id^="user_structures"]').forEach((group) => {
//   addFormDeleteLink(group);
// });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_expo-9e55a2","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_str-cc3808"], () => (__webpack_exec__("./assets/js/collection_managment.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBSUMsQ0FBQyxFQUFLO0VBQ2pDLElBQU1DLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxHQUFHLEdBQUdILENBQUMsQ0FBQ0ksYUFBYSxDQUFDQyxPQUFPLENBQUNDLHFCQUFxQixDQUFDO0VBQ3BHLElBQU1DLElBQUksR0FBR0wsUUFBUSxDQUFDTSxhQUFhLENBQUMsSUFBSSxDQUFDO0VBQ3pDRCxJQUFJLENBQUNFLFNBQVMsOENBQThDO0VBQzVERixJQUFJLENBQUNHLFNBQVMsR0FBR1QsZ0JBQWdCLENBQUNJLE9BQU8sQ0FBQ00sU0FBUyxDQUFDQyxPQUFPLENBQUMsV0FBVyxFQUFFWCxnQkFBZ0IsQ0FBQ0ksT0FBTyxDQUFDUSxLQUFLLENBQUM7RUFDeEdaLGdCQUFnQixDQUFDYSxXQUFXLENBQUNQLElBQUksQ0FBQztFQUNsQ04sZ0JBQWdCLENBQUNJLE9BQU8sQ0FBQ1EsS0FBSyxFQUFFO0VBQ2hDRSxpQkFBaUIsQ0FBQ1IsSUFBSSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxJQUFNUSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCQSxDQUFJUixJQUFJLEVBQUs7RUFDbEMsSUFBTVMsZ0JBQWdCLEdBQUdkLFFBQVEsQ0FBQ00sYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUN6RFEsZ0JBQWdCLENBQUNDLFNBQVMsR0FBRyxhQUFhO0VBQzFDRCxnQkFBZ0IsQ0FBQ1AsU0FBUyxtQ0FBbUM7RUFFN0RGLElBQUksQ0FBQ1csTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQztFQUU3QkEsZ0JBQWdCLENBQUNHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDbkIsQ0FBQyxFQUFLO0lBQ2hEQSxDQUFDLENBQUNvQixjQUFjLENBQUMsQ0FBQztJQUNsQjtJQUNBYixJQUFJLENBQUNjLE1BQU0sQ0FBQyxDQUFDO0VBQ2YsQ0FBQyxDQUFDO0FBQ0osQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUFuQixRQUFRLENBQUNvQixnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNDLEtBQUssRUFBSztFQUM1RFQsaUJBQWlCLENBQUNTLEtBQUssQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRnRCLFFBQVEsQ0FBQ29CLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDRSxTQUFTLEVBQUs7RUFDbkVWLGlCQUFpQixDQUFDVSxTQUFTLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUZ2QixRQUFRLENBQUNvQixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQUcsR0FBRyxFQUFJO0VBQ3pEQSxHQUFHLENBQUNQLGdCQUFnQixDQUFDLE9BQU8sRUFBRXBCLG1CQUFtQixDQUFDO0FBQ3BELENBQUMsQ0FBQzs7QUFFRjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29sbGVjdGlvbl9tYW5hZ21lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYWRkRm9ybVRvQ29sbGVjdGlvbiA9IChlKSA9PiB7XG4gIGNvbnN0IGNvbGxlY3Rpb25Ib2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbGxlY3Rpb25Ib2xkZXJDbGFzcyk7XG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBpdGVtLmNsYXNzTmFtZSA9IGBiZy1saWdodCByb3VuZGVkIG92ZXJmbG93LWhpZGRlbiBwLTIgbXQtM2A7XG4gIGl0ZW0uaW5uZXJIVE1MID0gY29sbGVjdGlvbkhvbGRlci5kYXRhc2V0LnByb3RvdHlwZS5yZXBsYWNlKC9fX25hbWVfXy9nLCBjb2xsZWN0aW9uSG9sZGVyLmRhdGFzZXQuaW5kZXgpO1xuICBjb2xsZWN0aW9uSG9sZGVyLmFwcGVuZENoaWxkKGl0ZW0pO1xuICBjb2xsZWN0aW9uSG9sZGVyLmRhdGFzZXQuaW5kZXgrKztcbiAgYWRkRm9ybURlbGV0ZUxpbmsoaXRlbSk7XG59O1xuXG5jb25zdCBhZGRGb3JtRGVsZXRlTGluayA9IChpdGVtKSA9PiB7XG4gIGNvbnN0IHJlbW92ZUZvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgcmVtb3ZlRm9ybUJ1dHRvbi5pbm5lclRleHQgPSAnU3VwcHJpbWVyIFgnO1xuICByZW1vdmVGb3JtQnV0dG9uLmNsYXNzTmFtZSA9IGBidG4gYnRuLWRhbmdlciB3LTMgbXQtMiBidG4tc21gO1xuXG4gIGl0ZW0uYXBwZW5kKHJlbW92ZUZvcm1CdXR0b24pO1xuXG4gIHJlbW92ZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyByZW1vdmUgdGhlIGxpIGZvciB0aGUgc3RydWN0dXJlIGZvcm1cbiAgICBpdGVtLnJlbW92ZSgpO1xuICB9KTtcbn07XG5cbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5ldGJsID4gZmllbGRzZXQnKS5mb3JFYWNoKGZpZWxkID0+IHtcbi8vICAgZmllbGQuY2xhc3NOYW1lID0gYGJnLWxpZ2h0IHJvdW5kZWQgb3ZlcmZsb3ctaGlkZGVuIG15LTMgcC0yYDtcbi8vIH0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYuZXRibC1jYXJkJykuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgYWRkRm9ybURlbGV0ZUxpbmsoZ3JvdXApO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsLnN0cnVjdHVyZXMgbGknKS5mb3JFYWNoKChzdHJ1Y3R1cmUpID0+IHtcbiAgYWRkRm9ybURlbGV0ZUxpbmsoc3RydWN0dXJlKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRkX2l0ZW1fbGluaycpLmZvckVhY2goYnRuID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRGb3JtVG9Db2xsZWN0aW9uKTtcbn0pO1xuXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwidXNlcl9zdHJ1Y3R1cmVzXCJdJykuZm9yRWFjaCgoZ3JvdXApID0+IHtcbi8vICAgYWRkRm9ybURlbGV0ZUxpbmsoZ3JvdXApO1xuLy8gfSk7XG4iXSwibmFtZXMiOlsiYWRkRm9ybVRvQ29sbGVjdGlvbiIsImUiLCJjb2xsZWN0aW9uSG9sZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJjb2xsZWN0aW9uSG9sZGVyQ2xhc3MiLCJpdGVtIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsInByb3RvdHlwZSIsInJlcGxhY2UiLCJpbmRleCIsImFwcGVuZENoaWxkIiwiYWRkRm9ybURlbGV0ZUxpbmsiLCJyZW1vdmVGb3JtQnV0dG9uIiwiaW5uZXJUZXh0IiwiYXBwZW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJncm91cCIsInN0cnVjdHVyZSIsImJ0biJdLCJzb3VyY2VSb290IjoiIn0=