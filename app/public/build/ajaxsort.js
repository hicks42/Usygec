(self["webpackChunk"] = self["webpackChunk"] || []).push([["ajaxsort"],{

/***/ "./assets/js/ajax_sort.js":
/*!********************************!*\
  !*** ./assets/js/ajax_sort.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
$(document).ready(function () {
  $('.sorting-link').on('click', function () {
    var sortBy = $(this).data('sort-by');
    var sortOrder = $(this).data('sort-order');
    var ajaxUrl = $('#activities-list').data('ajax-url');
    $.ajax({
      url: ajaxUrl,
      data: {
        sort_by: sortBy,
        sort_order: sortOrder
      },
      success: function success(data) {
        $('#activities-list').html(data);
      }
    });
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js"], () => (__webpack_exec__("./assets/js/ajax_sort.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWpheHNvcnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUFBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFXO0VBQzNCRixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUNHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUN0QyxJQUFJQyxNQUFNLEdBQUdKLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNwQyxJQUFJQyxTQUFTLEdBQUdOLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMxQyxJQUFJRSxPQUFPLEdBQUdQLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDSyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRXBETCxDQUFDLENBQUNRLElBQUksQ0FBQztNQUNIQyxHQUFHLEVBQUVGLE9BQU87TUFDWkYsSUFBSSxFQUFFO1FBQUVLLE9BQU8sRUFBRU4sTUFBTTtRQUFFTyxVQUFVLEVBQUVMO01BQVUsQ0FBQztNQUNoRE0sT0FBTyxFQUFFLFNBQUFBLFFBQVNQLElBQUksRUFBRTtRQUNwQkwsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNhLElBQUksQ0FBQ1IsSUFBSSxDQUFDO01BQ3BDO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FqYXhfc29ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgJCgnLnNvcnRpbmctbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNvcnRCeSA9ICQodGhpcykuZGF0YSgnc29ydC1ieScpO1xuICAgICAgdmFyIHNvcnRPcmRlciA9ICQodGhpcykuZGF0YSgnc29ydC1vcmRlcicpO1xuICAgICAgdmFyIGFqYXhVcmwgPSAkKCcjYWN0aXZpdGllcy1saXN0JykuZGF0YSgnYWpheC11cmwnKTtcblxuICAgICAgJC5hamF4KHtcbiAgICAgICAgICB1cmw6IGFqYXhVcmwsXG4gICAgICAgICAgZGF0YTogeyBzb3J0X2J5OiBzb3J0QnksIHNvcnRfb3JkZXI6IHNvcnRPcmRlciB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgJCgnI2FjdGl2aXRpZXMtbGlzdCcpLmh0bWwoZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJvbiIsInNvcnRCeSIsImRhdGEiLCJzb3J0T3JkZXIiLCJhamF4VXJsIiwiYWpheCIsInVybCIsInNvcnRfYnkiLCJzb3J0X29yZGVyIiwic3VjY2VzcyIsImh0bWwiXSwic291cmNlUm9vdCI6IiJ9