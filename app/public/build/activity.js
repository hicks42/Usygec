(self["webpackChunk"] = self["webpackChunk"] || []).push([["activity"],{

/***/ "./assets/js/activity.js":
/*!*******************************!*\
  !*** ./assets/js/activity.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
// Variables
var container = document.querySelector(".activity-container");
var activityList = document.querySelector(".activity-list");

// Add Collection
var addActivityToCollection = function addActivityToCollection(e) {
  var collectionHolder = document.querySelector('.' + e.currentTarget.dataset.collectionHolderClass);
  var item = document.createElement('li');
  item.className = "new-activity-card rounded overflow-hidden p-2 mt-3";
  item.innerHTML = collectionHolder.dataset.prototype.replace(/__name__/g, collectionHolder.dataset.index);
  collectionHolder.appendChild(item);
  collectionHolder.dataset.index++;
  addFormDeleteLink(item);
  item.scrollIntoView({
    behavior: 'smooth'
  });
};
document.querySelectorAll('.add-activity-btn').forEach(function (btn) {
  btn.addEventListener("click", addActivityToCollection);
});

////////////////// New Activity bloc //////////////////////////////////
var addFormDeleteLink = function addFormDeleteLink(newItem) {
  var removeFormButton = document.createElement('button');
  removeFormButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  removeFormButton.className = "btn btn-warning fs-6 px-2 btn-sm";

  // const newActiveInput = newItem.querySelector('input[name$="[dueDate]"]');
  var newActiveInput = newItem.querySelector('.due-date-ghost"]');
  newActiveInput.insertAdjacentElement('afterend', removeFormButton);
  removeFormButton.addEventListener('click', function (e) {
    e.preventDefault();
    newItem.remove();
  });
};
document.querySelectorAll('div.new-info').forEach(function (newItem) {
  addFormDeleteLink(newItem);
});

////////////////// Existing Activity bloc //////////////////////////////////
var addGroupDeleteLink = function addGroupDeleteLink(item) {
  var removeFormButton = document.createElement('button');
  removeFormButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  removeFormButton.className = "btn btn-danger w-3 btn-sm";
  item.append(removeFormButton);
  removeFormButton.addEventListener('click', function (e) {
    e.preventDefault();
    item.parentNode.remove();
  });
};
document.querySelectorAll('div.activity-info').forEach(function (group) {
  addGroupDeleteLink(group);
});

////////////////// Filtering Activity bloc //////////////////////////////////
// Attachez un écouteur d'événement au bouton de filtrage
var filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', filterActivities);

// Fonction de filtrage des activités
function filterActivities() {
  var activities = document.querySelectorAll('.activity-card');
  var isShowInactive = filterButton.classList.contains('show-inactive');
  activities.forEach(function (activity) {
    var isActiveInput = activity.querySelector('input[name$="[isActive]"]');
    var isInactive = isActiveInput && !isActiveInput.checked;
    if (isShowInactive && isInactive) {
      activity.style.display = 'block';
    } else if (!isShowInactive && isInactive) {
      activity.style.display = 'none';
    } else {
      activity.style.display = 'block';
    }
  });
  if (isShowInactive) {
    filterButton.textContent = 'Cacher';
    filterButton.classList.remove('show-inactive');
  } else {
    filterButton.textContent = 'Voir';
    filterButton.classList.add('show-inactive');
  }
}

////////////////// Ghosting inactiv bloc //////////////////////////////////
function handleIsActiveChange(event) {
  var isActiveInput = event.target;
  var activityCard = isActiveInput.closest('.activity-card');
  if (!isActiveInput.checked) {
    activityCard.classList.add('inactive');
  } else {
    activityCard.classList.remove('inactive');
  }
}
// Attach event listeners to each isActive input
var isActiveInputs = document.querySelectorAll('input[name$="[isActive]"]');
isActiveInputs.forEach(function (isActiveInput) {
  isActiveInput.addEventListener('change', handleIsActiveChange);
});

////// classe "inactive" au chargement de la page ////////////////////////
window.addEventListener('DOMContentLoaded', function () {
  var activities = document.querySelectorAll('.activity-card');
  activities.forEach(function (activity) {
    var isActiveInput = activity.querySelector('input[name$="[isActive]"]');
    var isInactive = isActiveInput && !isActiveInput.checked;
    if (isInactive) {
      activity.classList.add('inactive');
    }
  });
});

////////////////////// recherche ////////////////////////
function searchActivities() {
  var searchInput = document.getElementById('search-input');
  var searchTerm = searchInput.value.toLowerCase();
  var activities = document.querySelectorAll('.activity-card');
  activities.forEach(function (activity) {
    var descriptionElement = activity.querySelector('textarea[name$="[description]"]');
    var nameElement = activity.querySelector('input[name$="[name]"]');
    if (descriptionElement && descriptionElement.textContent) {
      var description = descriptionElement.textContent.toLowerCase();
      var name = '';
      if (nameElement) {
        name = nameElement.value.trim().toLowerCase();
      }
      if (description.includes(searchTerm) || name.includes(searchTerm)) {
        activity.style.display = 'block';
      } else {
        activity.style.display = 'none';
      }
    }
  });
}
var activitySearchForm = document.getElementById('search-input');
activitySearchForm.addEventListener('input', function () {
  searchActivities();
});
window.searchActivities = searchActivities;

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-is-regexp-logic.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-regexp.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-regexp.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/internals/not-a-regexp.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/not-a-regexp.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw $TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-trim-forced.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim-forced.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var PROPER_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").PROPER);
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-trim.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var replace = uncurryThis(''.replace);
var ltrim = RegExp('^[' + whitespaces + ']+');
var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '$1');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "./node_modules/core-js/internals/whitespaces.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/whitespaces.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.includes.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.includes.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $includes = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").includes);
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.includes.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "./node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js/internals/correct-is-regexp-logic.js");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.trim.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.trim.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $trim = (__webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim);
var forcedStringTrimMethod = __webpack_require__(/*! ../internals/string-trim-forced */ "./node_modules/core-js/internals/string-trim-forced.js");

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_expo-9e55a2","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_str-cc3808"], () => (__webpack_exec__("./assets/js/activity.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBTUEsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztBQUMvRCxJQUFNQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDOztBQUU3RDtBQUNBLElBQU1FLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBdUJBLENBQUlDLENBQUMsRUFBSztFQUNyQyxJQUFNQyxnQkFBZ0IsR0FBR0wsUUFBUSxDQUFDQyxhQUFhLENBQUMsR0FBRyxHQUFHRyxDQUFDLENBQUNFLGFBQWEsQ0FBQ0MsT0FBTyxDQUFDQyxxQkFBcUIsQ0FBQztFQUNwRyxJQUFNQyxJQUFJLEdBQUdULFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLElBQUksQ0FBQztFQUN6Q0QsSUFBSSxDQUFDRSxTQUFTLHVEQUF1RDtFQUNyRUYsSUFBSSxDQUFDRyxTQUFTLEdBQUdQLGdCQUFnQixDQUFDRSxPQUFPLENBQUNNLFNBQVMsQ0FBQ0MsT0FBTyxDQUFDLFdBQVcsRUFBRVQsZ0JBQWdCLENBQUNFLE9BQU8sQ0FBQ1EsS0FBSyxDQUFDO0VBQ3hHVixnQkFBZ0IsQ0FBQ1csV0FBVyxDQUFDUCxJQUFJLENBQUM7RUFDbENKLGdCQUFnQixDQUFDRSxPQUFPLENBQUNRLEtBQUssRUFBRTtFQUNoQ0UsaUJBQWlCLENBQUNSLElBQUksQ0FBQztFQUN2QkEsSUFBSSxDQUFDUyxjQUFjLENBQUM7SUFBRUMsUUFBUSxFQUFFO0VBQVMsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRG5CLFFBQVEsQ0FBQ29CLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFBQyxHQUFHLEVBQUk7RUFDNURBLEdBQUcsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFcEIsdUJBQXVCLENBQUM7QUFDeEQsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsSUFBTWMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQkEsQ0FBSU8sT0FBTyxFQUFLO0VBQ3JDLElBQU1DLGdCQUFnQixHQUFHekIsUUFBUSxDQUFDVSxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ3pEZSxnQkFBZ0IsQ0FBQ2IsU0FBUyxHQUFHLHVDQUF1QztFQUNwRWEsZ0JBQWdCLENBQUNkLFNBQVMscUNBQXFDOztFQUUvRDtFQUNBLElBQU1lLGNBQWMsR0FBR0YsT0FBTyxDQUFDdkIsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQ2pFeUIsY0FBYyxDQUFDQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUVGLGdCQUFnQixDQUFDO0VBRWxFQSxnQkFBZ0IsQ0FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNuQixDQUFDLEVBQUs7SUFDaERBLENBQUMsQ0FBQ3dCLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCSixPQUFPLENBQUNLLE1BQU0sQ0FBQyxDQUFDO0VBQ2xCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDdCLFFBQVEsQ0FBQ29CLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQ0csT0FBTyxFQUFLO0VBQzdEUCxpQkFBaUIsQ0FBQ08sT0FBTyxDQUFDO0FBQzVCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLElBQU1NLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0JBLENBQUlyQixJQUFJLEVBQUs7RUFDbkMsSUFBTWdCLGdCQUFnQixHQUFHekIsUUFBUSxDQUFDVSxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ3pEZSxnQkFBZ0IsQ0FBQ2IsU0FBUyxHQUFHLHVDQUF1QztFQUNwRWEsZ0JBQWdCLENBQUNkLFNBQVMsOEJBQThCO0VBRXhERixJQUFJLENBQUNzQixNQUFNLENBQUNOLGdCQUFnQixDQUFDO0VBRTdCQSxnQkFBZ0IsQ0FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNuQixDQUFDLEVBQUs7SUFDaERBLENBQUMsQ0FBQ3dCLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCbkIsSUFBSSxDQUFDdUIsVUFBVSxDQUFDSCxNQUFNLENBQUMsQ0FBQztFQUMxQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ3QixRQUFRLENBQUNvQixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQ1ksS0FBSyxFQUFLO0VBQ2hFSCxrQkFBa0IsQ0FBQ0csS0FBSyxDQUFDO0FBQzNCLENBQUMsQ0FBQzs7QUFFRjtBQUNBO0FBQ0EsSUFBTUMsWUFBWSxHQUFHbEMsUUFBUSxDQUFDbUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztBQUM3REQsWUFBWSxDQUFDWCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVhLGdCQUFnQixDQUFDOztBQUV4RDtBQUNBLFNBQVNBLGdCQUFnQkEsQ0FBQSxFQUFHO0VBQzFCLElBQU1DLFVBQVUsR0FBR3JDLFFBQVEsQ0FBQ29CLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0VBQzlELElBQU1rQixjQUFjLEdBQUdKLFlBQVksQ0FBQ0ssU0FBUyxDQUFDQyxRQUFRLENBQUMsZUFBZSxDQUFDO0VBRXZFSCxVQUFVLENBQUNoQixPQUFPLENBQUMsVUFBQ29CLFFBQVEsRUFBSztJQUMvQixJQUFNQyxhQUFhLEdBQUdELFFBQVEsQ0FBQ3hDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN6RSxJQUFNMEMsVUFBVSxHQUFHRCxhQUFhLElBQUksQ0FBQ0EsYUFBYSxDQUFDRSxPQUFPO0lBRTFELElBQUlOLGNBQWMsSUFBSUssVUFBVSxFQUFFO01BQ2hDRixRQUFRLENBQUNJLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87SUFDbEMsQ0FBQyxNQUFNLElBQUksQ0FBQ1IsY0FBYyxJQUFJSyxVQUFVLEVBQUU7TUFDeENGLFFBQVEsQ0FBQ0ksS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUNqQyxDQUFDLE1BQU07TUFDTEwsUUFBUSxDQUFDSSxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0lBQ2xDO0VBQ0YsQ0FBQyxDQUFDO0VBRUYsSUFBSVIsY0FBYyxFQUFFO0lBQ2xCSixZQUFZLENBQUNhLFdBQVcsR0FBRyxRQUFRO0lBQ25DYixZQUFZLENBQUNLLFNBQVMsQ0FBQ1YsTUFBTSxDQUFDLGVBQWUsQ0FBQztFQUNoRCxDQUFDLE1BQU07SUFDTEssWUFBWSxDQUFDYSxXQUFXLEdBQUcsTUFBTTtJQUNqQ2IsWUFBWSxDQUFDSyxTQUFTLENBQUNTLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFDN0M7QUFDRjs7QUFFQTtBQUNBLFNBQVNDLG9CQUFvQkEsQ0FBQ0MsS0FBSyxFQUFFO0VBQ25DLElBQU1SLGFBQWEsR0FBR1EsS0FBSyxDQUFDQyxNQUFNO0VBQ2xDLElBQU1DLFlBQVksR0FBR1YsYUFBYSxDQUFDVyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7RUFFNUQsSUFBSSxDQUFDWCxhQUFhLENBQUNFLE9BQU8sRUFBRTtJQUMxQlEsWUFBWSxDQUFDYixTQUFTLENBQUNTLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFDeEMsQ0FBQyxNQUFNO0lBQ0xJLFlBQVksQ0FBQ2IsU0FBUyxDQUFDVixNQUFNLENBQUMsVUFBVSxDQUFDO0VBQzNDO0FBQ0Y7QUFDQTtBQUNBLElBQU15QixjQUFjLEdBQUd0RCxRQUFRLENBQUNvQixnQkFBZ0IsQ0FBQywyQkFBMkIsQ0FBQztBQUM3RWtDLGNBQWMsQ0FBQ2pDLE9BQU8sQ0FBQyxVQUFDcUIsYUFBYSxFQUFLO0VBQ3hDQSxhQUFhLENBQUNuQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUwQixvQkFBb0IsQ0FBQztBQUNoRSxDQUFDLENBQUM7O0FBRUY7QUFDQU0sTUFBTSxDQUFDaEMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUNoRCxJQUFNYyxVQUFVLEdBQUdyQyxRQUFRLENBQUNvQixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztFQUU5RGlCLFVBQVUsQ0FBQ2hCLE9BQU8sQ0FBQyxVQUFDb0IsUUFBUSxFQUFLO0lBQy9CLElBQU1DLGFBQWEsR0FBR0QsUUFBUSxDQUFDeEMsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3pFLElBQU0wQyxVQUFVLEdBQUdELGFBQWEsSUFBSSxDQUFDQSxhQUFhLENBQUNFLE9BQU87SUFFMUQsSUFBSUQsVUFBVSxFQUFFO01BQ2RGLFFBQVEsQ0FBQ0YsU0FBUyxDQUFDUyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3BDO0VBQ0YsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVGO0FBQ0EsU0FBU1EsZ0JBQWdCQSxDQUFBLEVBQUc7RUFDMUIsSUFBTUMsV0FBVyxHQUFHekQsUUFBUSxDQUFDbUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztFQUMzRCxJQUFNdUIsVUFBVSxHQUFHRCxXQUFXLENBQUNFLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLENBQUM7RUFFbEQsSUFBTXZCLFVBQVUsR0FBR3JDLFFBQVEsQ0FBQ29CLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0VBQzlEaUIsVUFBVSxDQUFDaEIsT0FBTyxDQUFDLFVBQUNvQixRQUFRLEVBQUs7SUFDL0IsSUFBTW9CLGtCQUFrQixHQUFHcEIsUUFBUSxDQUFDeEMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDO0lBQ3BGLElBQU02RCxXQUFXLEdBQUdyQixRQUFRLENBQUN4QyxhQUFhLENBQUMsdUJBQXVCLENBQUM7SUFFbkUsSUFBSTRELGtCQUFrQixJQUFJQSxrQkFBa0IsQ0FBQ2QsV0FBVyxFQUFFO01BQ3hELElBQU1nQixXQUFXLEdBQUdGLGtCQUFrQixDQUFDZCxXQUFXLENBQUNhLFdBQVcsQ0FBQyxDQUFDO01BRWhFLElBQUlJLElBQUksR0FBRyxFQUFFO01BQ2IsSUFBSUYsV0FBVyxFQUFFO1FBQ2ZFLElBQUksR0FBR0YsV0FBVyxDQUFDSCxLQUFLLENBQUNNLElBQUksQ0FBQyxDQUFDLENBQUNMLFdBQVcsQ0FBQyxDQUFDO01BQy9DO01BRUEsSUFBSUcsV0FBVyxDQUFDRyxRQUFRLENBQUNSLFVBQVUsQ0FBQyxJQUFJTSxJQUFJLENBQUNFLFFBQVEsQ0FBQ1IsVUFBVSxDQUFDLEVBQUU7UUFDakVqQixRQUFRLENBQUNJLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87TUFDbEMsQ0FBQyxNQUFNO1FBQ0xMLFFBQVEsQ0FBQ0ksS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtNQUNqQztJQUNGO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7QUFFQSxJQUFNcUIsa0JBQWtCLEdBQUduRSxRQUFRLENBQUNtQyxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQ2xFZ0Msa0JBQWtCLENBQUM1QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUNqRGlDLGdCQUFnQixDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUZELE1BQU0sQ0FBQ0MsZ0JBQWdCLEdBQUdBLGdCQUFnQjs7Ozs7Ozs7Ozs7QUN6SjdCO0FBQ2Isc0JBQXNCLG1CQUFPLENBQUMsNkZBQWdDO0FBQzlELGFBQWEsbUJBQU8sQ0FBQyxxRkFBNEI7QUFDakQscUJBQXFCLGdJQUFnRDs7QUFFckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLHNCQUFzQixtQkFBTyxDQUFDLDZGQUFnQzs7QUFFOUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpQkFBaUI7QUFDdkIsSUFBSTtBQUNKOzs7Ozs7Ozs7Ozs7QUNmYTtBQUNiLGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7QUFDL0MsY0FBYyxtQkFBTyxDQUFDLGlGQUEwQjtBQUNoRCxzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7O0FBRTlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWmE7QUFDYixlQUFlLG1CQUFPLENBQUMsNkVBQXdCOztBQUUvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7Ozs7Ozs7Ozs7OztBQ1RhO0FBQ2IsMkJBQTJCLG1IQUE0QztBQUN2RSxZQUFZLG1CQUFPLENBQUMscUVBQW9CO0FBQ3hDLGtCQUFrQixtQkFBTyxDQUFDLGlGQUEwQjs7QUFFcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7OztBQ2ZhO0FBQ2Isa0JBQWtCLG1CQUFPLENBQUMscUdBQW9DO0FBQzlELDZCQUE2QixtQkFBTyxDQUFDLDJHQUF1QztBQUM1RSxlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLGtCQUFrQixtQkFBTyxDQUFDLGlGQUEwQjs7QUFFcEQ7QUFDQTtBQUNBOztBQUVBLHVCQUF1QiwrQ0FBK0M7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixxQkFBcUI7QUFDOUM7QUFDQTtBQUNBLHlCQUF5QixvQkFBb0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5QmE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0hhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxnQkFBZ0IsdUhBQStDO0FBQy9ELFlBQVksbUJBQU8sQ0FBQyxxRUFBb0I7QUFDeEMsdUJBQXVCLG1CQUFPLENBQUMsK0ZBQWlDOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLElBQUksd0RBQXdEO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxrQkFBa0IsbUJBQU8sQ0FBQyxxR0FBb0M7QUFDOUQsaUJBQWlCLG1CQUFPLENBQUMsbUZBQTJCO0FBQ3BELDZCQUE2QixtQkFBTyxDQUFDLDJHQUF1QztBQUM1RSxlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLDJCQUEyQixtQkFBTyxDQUFDLHlHQUFzQzs7QUFFekU7O0FBRUE7QUFDQTtBQUNBLElBQUksMEVBQTBFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcEJZO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxZQUFZLDZHQUF3QztBQUNwRCw2QkFBNkIsbUJBQU8sQ0FBQywrRkFBaUM7O0FBRXRFO0FBQ0E7QUFDQSxJQUFJLHVFQUF1RTtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FjdGl2aXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtaXMtcmVnZXhwLWxvZ2ljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25vdC1hLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLXRyaW0tZm9yY2VkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy50cmltLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFZhcmlhYmxlc1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3Rpdml0eS1jb250YWluZXJcIik7XG5jb25zdCBhY3Rpdml0eUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2aXR5LWxpc3RcIik7XG5cbi8vIEFkZCBDb2xsZWN0aW9uXG5jb25zdCBhZGRBY3Rpdml0eVRvQ29sbGVjdGlvbiA9IChlKSA9PiB7XG4gIGNvbnN0IGNvbGxlY3Rpb25Ib2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbGxlY3Rpb25Ib2xkZXJDbGFzcyk7XG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBpdGVtLmNsYXNzTmFtZSA9IGBuZXctYWN0aXZpdHktY2FyZCByb3VuZGVkIG92ZXJmbG93LWhpZGRlbiBwLTIgbXQtM2A7XG4gIGl0ZW0uaW5uZXJIVE1MID0gY29sbGVjdGlvbkhvbGRlci5kYXRhc2V0LnByb3RvdHlwZS5yZXBsYWNlKC9fX25hbWVfXy9nLCBjb2xsZWN0aW9uSG9sZGVyLmRhdGFzZXQuaW5kZXgpO1xuICBjb2xsZWN0aW9uSG9sZGVyLmFwcGVuZENoaWxkKGl0ZW0pO1xuICBjb2xsZWN0aW9uSG9sZGVyLmRhdGFzZXQuaW5kZXgrKztcbiAgYWRkRm9ybURlbGV0ZUxpbmsoaXRlbSk7XG4gIGl0ZW0uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG59O1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRkLWFjdGl2aXR5LWJ0bicpLmZvckVhY2goYnRuID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRBY3Rpdml0eVRvQ29sbGVjdGlvbik7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vIE5ldyBBY3Rpdml0eSBibG9jIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNvbnN0IGFkZEZvcm1EZWxldGVMaW5rID0gKG5ld0l0ZW0pID0+IHtcbiAgY29uc3QgcmVtb3ZlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICByZW1vdmVGb3JtQnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT4nO1xuICByZW1vdmVGb3JtQnV0dG9uLmNsYXNzTmFtZSA9IGBidG4gYnRuLXdhcm5pbmcgZnMtNiBweC0yIGJ0bi1zbWA7XG5cbiAgLy8gY29uc3QgbmV3QWN0aXZlSW5wdXQgPSBuZXdJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWUkPVwiW2R1ZURhdGVdXCJdJyk7XG4gIGNvbnN0IG5ld0FjdGl2ZUlucHV0ID0gbmV3SXRlbS5xdWVyeVNlbGVjdG9yKCcuZHVlLWRhdGUtZ2hvc3RcIl0nKTtcbiAgbmV3QWN0aXZlSW5wdXQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIHJlbW92ZUZvcm1CdXR0b24pO1xuXG4gIHJlbW92ZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBuZXdJdGVtLnJlbW92ZSgpO1xuICB9KTtcbn07XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5uZXctaW5mbycpLmZvckVhY2goKG5ld0l0ZW0pID0+IHtcbiAgYWRkRm9ybURlbGV0ZUxpbmsobmV3SXRlbSk7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vIEV4aXN0aW5nIEFjdGl2aXR5IGJsb2MgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3QgYWRkR3JvdXBEZWxldGVMaW5rID0gKGl0ZW0pID0+IHtcbiAgY29uc3QgcmVtb3ZlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICByZW1vdmVGb3JtQnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT4nO1xuICByZW1vdmVGb3JtQnV0dG9uLmNsYXNzTmFtZSA9IGBidG4gYnRuLWRhbmdlciB3LTMgYnRuLXNtYDtcblxuICBpdGVtLmFwcGVuZChyZW1vdmVGb3JtQnV0dG9uKTtcblxuICByZW1vdmVGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaXRlbS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB9KTtcbn07XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5hY3Rpdml0eS1pbmZvJykuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgYWRkR3JvdXBEZWxldGVMaW5rKGdyb3VwKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8gRmlsdGVyaW5nIEFjdGl2aXR5IGJsb2MgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQXR0YWNoZXogdW4gw6ljb3V0ZXVyIGQnw6l2w6luZW1lbnQgYXUgYm91dG9uIGRlIGZpbHRyYWdlXG5jb25zdCBmaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWJ1dHRvbicpO1xuZmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmlsdGVyQWN0aXZpdGllcyk7XG5cbi8vIEZvbmN0aW9uIGRlIGZpbHRyYWdlIGRlcyBhY3Rpdml0w6lzXG5mdW5jdGlvbiBmaWx0ZXJBY3Rpdml0aWVzKCkge1xuICBjb25zdCBhY3Rpdml0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5LWNhcmQnKTtcbiAgY29uc3QgaXNTaG93SW5hY3RpdmUgPSBmaWx0ZXJCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWluYWN0aXZlJyk7XG5cbiAgYWN0aXZpdGllcy5mb3JFYWNoKChhY3Rpdml0eSkgPT4ge1xuICAgIGNvbnN0IGlzQWN0aXZlSW5wdXQgPSBhY3Rpdml0eS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lJD1cIltpc0FjdGl2ZV1cIl0nKTtcbiAgICBjb25zdCBpc0luYWN0aXZlID0gaXNBY3RpdmVJbnB1dCAmJiAhaXNBY3RpdmVJbnB1dC5jaGVja2VkO1xuXG4gICAgaWYgKGlzU2hvd0luYWN0aXZlICYmIGlzSW5hY3RpdmUpIHtcbiAgICAgIGFjdGl2aXR5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0gZWxzZSBpZiAoIWlzU2hvd0luYWN0aXZlICYmIGlzSW5hY3RpdmUpIHtcbiAgICAgIGFjdGl2aXR5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2aXR5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGlzU2hvd0luYWN0aXZlKSB7XG4gICAgZmlsdGVyQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhY2hlcic7XG4gICAgZmlsdGVyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctaW5hY3RpdmUnKTtcbiAgfSBlbHNlIHtcbiAgICBmaWx0ZXJCdXR0b24udGV4dENvbnRlbnQgPSAnVm9pcic7XG4gICAgZmlsdGVyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Nob3ctaW5hY3RpdmUnKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8gR2hvc3RpbmcgaW5hY3RpdiBibG9jIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGhhbmRsZUlzQWN0aXZlQ2hhbmdlKGV2ZW50KSB7XG4gIGNvbnN0IGlzQWN0aXZlSW5wdXQgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IGFjdGl2aXR5Q2FyZCA9IGlzQWN0aXZlSW5wdXQuY2xvc2VzdCgnLmFjdGl2aXR5LWNhcmQnKTtcblxuICBpZiAoIWlzQWN0aXZlSW5wdXQuY2hlY2tlZCkge1xuICAgIGFjdGl2aXR5Q2FyZC5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICB9IGVsc2Uge1xuICAgIGFjdGl2aXR5Q2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZScpO1xuICB9XG59XG4vLyBBdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIGVhY2ggaXNBY3RpdmUgaW5wdXRcbmNvbnN0IGlzQWN0aXZlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZSQ9XCJbaXNBY3RpdmVdXCJdJyk7XG5pc0FjdGl2ZUlucHV0cy5mb3JFYWNoKChpc0FjdGl2ZUlucHV0KSA9PiB7XG4gIGlzQWN0aXZlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlSXNBY3RpdmVDaGFuZ2UpO1xufSk7XG5cbi8vLy8vLyBjbGFzc2UgXCJpbmFjdGl2ZVwiIGF1IGNoYXJnZW1lbnQgZGUgbGEgcGFnZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBhY3Rpdml0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2aXR5LWNhcmQnKTtcblxuICBhY3Rpdml0aWVzLmZvckVhY2goKGFjdGl2aXR5KSA9PiB7XG4gICAgY29uc3QgaXNBY3RpdmVJbnB1dCA9IGFjdGl2aXR5LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWUkPVwiW2lzQWN0aXZlXVwiXScpO1xuICAgIGNvbnN0IGlzSW5hY3RpdmUgPSBpc0FjdGl2ZUlucHV0ICYmICFpc0FjdGl2ZUlucHV0LmNoZWNrZWQ7XG5cbiAgICBpZiAoaXNJbmFjdGl2ZSkge1xuICAgICAgYWN0aXZpdHkuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gcmVjaGVyY2hlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gc2VhcmNoQWN0aXZpdGllcygpIHtcbiAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0Jyk7XG4gIGNvbnN0IHNlYXJjaFRlcm0gPSBzZWFyY2hJbnB1dC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gIGNvbnN0IGFjdGl2aXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZpdHktY2FyZCcpO1xuICBhY3Rpdml0aWVzLmZvckVhY2goKGFjdGl2aXR5KSA9PiB7XG4gICAgY29uc3QgZGVzY3JpcHRpb25FbGVtZW50ID0gYWN0aXZpdHkucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZSQ9XCJbZGVzY3JpcHRpb25dXCJdJyk7XG4gICAgY29uc3QgbmFtZUVsZW1lbnQgPSBhY3Rpdml0eS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lJD1cIltuYW1lXVwiXScpO1xuXG4gICAgaWYgKGRlc2NyaXB0aW9uRWxlbWVudCAmJiBkZXNjcmlwdGlvbkVsZW1lbnQudGV4dENvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25FbGVtZW50LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGxldCBuYW1lID0gJyc7XG4gICAgICBpZiAobmFtZUVsZW1lbnQpIHtcbiAgICAgICAgbmFtZSA9IG5hbWVFbGVtZW50LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVzY3JpcHRpb24uaW5jbHVkZXMoc2VhcmNoVGVybSkgfHwgbmFtZS5pbmNsdWRlcyhzZWFyY2hUZXJtKSkge1xuICAgICAgICBhY3Rpdml0eS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2aXR5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgYWN0aXZpdHlTZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpO1xuYWN0aXZpdHlTZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICBzZWFyY2hBY3Rpdml0aWVzKCk7XG59KTtcblxud2luZG93LnNlYXJjaEFjdGl2aXRpZXMgPSBzZWFyY2hBY3Rpdml0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHkoQXJyYXlQcm90b3R5cGUsIFVOU0NPUEFCTEVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBjcmVhdGUobnVsbClcbiAgfSk7XG59XG5cbi8vIGFkZCBhIGtleSB0byBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIHZhciByZWdleHAgPSAvLi87XG4gIHRyeSB7XG4gICAgJy8uLydbTUVUSE9EX05BTUVdKHJlZ2V4cCk7XG4gIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgIHRyeSB7XG4gICAgICByZWdleHBbTUFUQ0hdID0gZmFsc2U7XG4gICAgICByZXR1cm4gJy8uLydbTUVUSE9EX05BTUVdKHJlZ2V4cCk7XG4gICAgfSBjYXRjaCAoZXJyb3IyKSB7IC8qIGVtcHR5ICovIH1cbiAgfSByZXR1cm4gZmFsc2U7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc3JlZ2V4cFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY2xhc3NvZihpdCkgPT09ICdSZWdFeHAnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNSZWdFeHAoaXQpKSB7XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcIlRoZSBtZXRob2QgZG9lc24ndCBhY2NlcHQgcmVndWxhciBleHByZXNzaW9uc1wiKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFBST1BFUl9GVU5DVElPTl9OQU1FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKS5QUk9QRVI7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgbm9uID0gJ1xcdTIwMEJcXHUwMDg1XFx1MTgwRSc7XG5cbi8vIGNoZWNrIHRoYXQgYSBtZXRob2Qgd29ya3Mgd2l0aCB0aGUgY29ycmVjdCBsaXN0XG4vLyBvZiB3aGl0ZXNwYWNlcyBhbmQgaGFzIGEgY29ycmVjdCBuYW1lXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICByZXR1cm4gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXdoaXRlc3BhY2VzW01FVEhPRF9OQU1FXSgpXG4gICAgICB8fCBub25bTUVUSE9EX05BTUVdKCkgIT09IG5vblxuICAgICAgfHwgKFBST1BFUl9GVU5DVElPTl9OQU1FICYmIHdoaXRlc3BhY2VzW01FVEhPRF9OQU1FXS5uYW1lICE9PSBNRVRIT0RfTkFNRSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ15bJyArIHdoaXRlc3BhY2VzICsgJ10rJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAoJyhefFteJyArIHdoaXRlc3BhY2VzICsgJ10pWycgKyB3aGl0ZXNwYWNlcyArICddKyQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gcmVwbGFjZShzdHJpbmcsIGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSByZXBsYWNlKHN0cmluZywgcnRyaW0sICckMScpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbm1vZHVsZS5leHBvcnRzID0gJ1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MjAwMFxcdTIwMDFcXHUyMDAyJyArXG4gICdcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmNsdWRlcztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbi8vIEZGOTkrIGJ1Z1xudmFyIEJST0tFTl9PTl9TUEFSU0UgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtaW5jbHVkZXMgLS0gZGV0ZWN0aW9uXG4gIHJldHVybiAhQXJyYXkoMSkuaW5jbHVkZXMoKTtcbn0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCUk9LRU5fT05fU1BBUlNFIH0sIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2luY2x1ZGVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBub3RBUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25vdC1hLXJlZ2V4cCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgY29ycmVjdElzUmVnRXhwTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1pcy1yZWdleHAtbG9naWMnKTtcblxudmFyIHN0cmluZ0luZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzXG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUsIGZvcmNlZDogIWNvcnJlY3RJc1JlZ0V4cExvZ2ljKCdpbmNsdWRlcycpIH0sIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaFN0cmluZyAvKiAsIHBvc2l0aW9uID0gMCAqLykge1xuICAgIHJldHVybiAhIX5zdHJpbmdJbmRleE9mKFxuICAgICAgdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKSksXG4gICAgICB0b1N0cmluZyhub3RBUmVnRXhwKHNlYXJjaFN0cmluZykpLFxuICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICApO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICR0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcbnZhciBmb3JjZWRTdHJpbmdUcmltTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltLWZvcmNlZCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUsIGZvcmNlZDogZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCgndHJpbScpIH0sIHtcbiAgdHJpbTogZnVuY3Rpb24gdHJpbSgpIHtcbiAgICByZXR1cm4gJHRyaW0odGhpcyk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFjdGl2aXR5TGlzdCIsImFkZEFjdGl2aXR5VG9Db2xsZWN0aW9uIiwiZSIsImNvbGxlY3Rpb25Ib2xkZXIiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbGxlY3Rpb25Ib2xkZXJDbGFzcyIsIml0ZW0iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwicHJvdG90eXBlIiwicmVwbGFjZSIsImluZGV4IiwiYXBwZW5kQ2hpbGQiLCJhZGRGb3JtRGVsZXRlTGluayIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJuZXdJdGVtIiwicmVtb3ZlRm9ybUJ1dHRvbiIsIm5ld0FjdGl2ZUlucHV0IiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJhZGRHcm91cERlbGV0ZUxpbmsiLCJhcHBlbmQiLCJwYXJlbnROb2RlIiwiZ3JvdXAiLCJmaWx0ZXJCdXR0b24iLCJnZXRFbGVtZW50QnlJZCIsImZpbHRlckFjdGl2aXRpZXMiLCJhY3Rpdml0aWVzIiwiaXNTaG93SW5hY3RpdmUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFjdGl2aXR5IiwiaXNBY3RpdmVJbnB1dCIsImlzSW5hY3RpdmUiLCJjaGVja2VkIiwic3R5bGUiLCJkaXNwbGF5IiwidGV4dENvbnRlbnQiLCJhZGQiLCJoYW5kbGVJc0FjdGl2ZUNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwiYWN0aXZpdHlDYXJkIiwiY2xvc2VzdCIsImlzQWN0aXZlSW5wdXRzIiwid2luZG93Iiwic2VhcmNoQWN0aXZpdGllcyIsInNlYXJjaElucHV0Iiwic2VhcmNoVGVybSIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJkZXNjcmlwdGlvbkVsZW1lbnQiLCJuYW1lRWxlbWVudCIsImRlc2NyaXB0aW9uIiwibmFtZSIsInRyaW0iLCJpbmNsdWRlcyIsImFjdGl2aXR5U2VhcmNoRm9ybSJdLCJzb3VyY2VSb290IjoiIn0=