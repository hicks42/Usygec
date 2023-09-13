(self["webpackChunk"] = self["webpackChunk"] || []).push([["datepicker"],{

/***/ "./assets/js/datetimepicker.js":
/*!*************************************!*\
  !*** ./assets/js/datetimepicker.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
(function ($) {
  'use strict';

  $.fn.dateTimePicker = function (options) {
    var settings = $.extend({
      selectData: "now",
      dateFormat: "DD-MMM-YYYY HH:mm",
      dateFormatDigit: "YYYY-MM-DD HH:mm",
      showTime: true,
      locale: 'fr',
      positionShift: {
        top: 20,
        left: 1
      },
      title: "Select Date and Time",
      buttonTitle: "Select"
    }, options);
    moment.locale(settings.locale);
    var elem = this;
    var limitation = {
      "hour": 23,
      "minute": 59
    };
    var mousedown = false;
    var timeout = 800;
    var selectDate = settings.selectData == "now" ? moment() : moment(settings.selectData, settings.dateFormat);
    if (selectDate < moment()) {
      selectDate = moment();
    }
    var startDate = copyDate(moment());
    var lastSelected = copyDate(selectDate);
    return this.each(function () {
      if (lastSelected != selectDate) {
        selectDate = copyDate(lastSelected);
      }
      elem.addClass("dtp_main float-end");
      updateMainElemGlobal();
      //  elem.text(selectDate.format(settings.dateFormat));
      function updateMainElemGlobal() {
        var arrF = settings.dateFormat.split(' ');
        if (settings.showTime && arrF.length != 2) {
          arrF.length = 2;
          arrF[0] = 'DD/MMM/YYYY';
          arrF[1] = 'HH:mm';
        }
        var $s = $('<span>');
        $s.text(lastSelected.format(arrF[0]));
        elem.empty();
        elem.append($s);
        $s = $('<i>');
        $s.addClass('fa fa-calendar ico-size');
        elem.append($s);
        if (settings.showTime) {
          $s = $('<span>');
          $s.text(lastSelected.format(arrF[1]));
          elem.append($s);
          $s = $('<i>');
          $s.addClass('fa fa-clock-o ico-size aaa');
          elem.append($s);
        }
      }
      elem.on('click', function () {
        var $win = $('<div>');
        $win.addClass("dtp_modal-win");
        var $body = $('body');
        $body.append($win);
        var $content = createContent();
        $body.append($content);
        var offset = elem.offset();

        // $content.css({ top: (offset.top + settings.positionShift.top) + "px", left: (offset.left + settings.positionShift.left) + "px" });

        // $content.css({ top: (offset.top + settings.positionShift.top) + "px", left: (settings.positionShift.left) + "%" });

        feelDates(selectDate);
        $win.on('click', function () {
          $content.remove();
          $win.remove();
        });
        if (settings.showTime) {
          attachChangeTime();
          var $fieldTime = $('#field-time');
          var $hour = $fieldTime.find('#d-hh');
          var $minute = $fieldTime.find('#d-mm');
        }
        function feelDates(selectM) {
          var $fDate = $content.find('#field-data');
          $fDate.empty();
          $fDate.append(createMonthPanel(selectM));
          $fDate.append(createCalendar(selectM));
        }
        function createCalendar(selectedMonth) {
          var $c = $('<div>');
          $c.addClass('dtp_modal-calendar');
          for (var i = 0; i < 7; i++) {
            var $e = $('<div>');
            $e.addClass('dtp_modal-calendar-cell dtp_modal-colored');
            $e.text(moment().weekday(i).format('ddd'));
            $c.append($e);
          }
          var m = copyDate(selectedMonth);
          m.date(1);
          // console.log(m.format('DD--MM--YYYY'));
          // console.log(selectData.format('DD--MM--YYYY'));
          // console.log(m.weekday());
          var flagStart = totalMonths(selectedMonth) === totalMonths(startDate);
          var flagSelect = totalMonths(lastSelected) === totalMonths(selectedMonth);
          var cerDay = parseInt(selectedMonth.format('D'));
          var dayNow = parseInt(startDate.format('D'));
          for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
              var $b = $('<div>');
              $b.html('&nbsp;');
              $b.addClass('dtp_modal-calendar-cell');
              if (m.month() == selectedMonth.month() && m.weekday() == j) {
                var day = parseInt(m.format('D'));
                $b.text(day);

                // forbide past selection
                // if (flagStart && day < dayNow) {
                // $b.addClass('dtp_modal-grey');
                // }
                // else

                // forbide futur selection
                if (flagStart && day > dayNow) {
                  $b.addClass('dtp_modal-grey');
                } else if (flagSelect && day == cerDay) {
                  $b.addClass('dtp_modal-cell-selected');
                } else {
                  $b.addClass('cursorily');
                  $b.bind('click', changeDate);
                }
                m.add(1, 'days');
              }
              $c.append($b);
            }
          }
          return $c;
        }
        function changeDate() {
          var $div = $(this);
          selectDate.date($div.text());
          lastSelected = copyDate(selectDate);
          updateDate();
          var $fDate = $content.find('#field-data');
          var old = $fDate.find('.dtp_modal-cell-selected');
          old.removeClass('dtp_modal-cell-selected');
          old.addClass('cursorily');
          $div.addClass('dtp_modal-cell-selected');
          $div.removeClass('cursorily');
          old.bind('click', changeDate);
          $div.unbind('click');
          // console.log(selectDate.format('DD-MM-YYYY HH:mm'));
        }

        function createMonthPanel(selectMonth) {
          var $d = $('<div>');
          $d.addClass('dtp_modal-months');
          var $s = $('<i></i>');
          $s.addClass('fa fa-angle-left cursorily ico-size-month hov');
          //$s.attr('data-fa-mask', 'fas fa-circle');
          $s.bind('click', prevMonth);
          $d.append($s);
          $s = $('<span>');
          $s.text(selectMonth.format("MMM YYYY"));
          $d.append($s);
          if (totalMonths(selectDate) < totalMonths(startDate)) {
            $s = $('<i></i>');
            $s.addClass('fa fa-angle-right cursorily ico-size-month hov');
            $s.bind('click', nextMonth);
            $d.append($s);
          }
          return $d;
        }
        function close() {
          if (settings.showTime) {
            lastSelected.hour(parseInt($hour.text()));
            lastSelected.minute(parseInt($minute.text()));
            selectDate.hour(parseInt($hour.text()));
            selectDate.minute(parseInt($minute.text()));
          }
          updateDate();
          $content.remove();
          $win.remove();
        }
        function nextMonth() {
          selectDate.add(1, 'month');
          feelDates(selectDate);
        }
        function prevMonth() {
          // to forbid past selection
          //if (totalMonths(selectDate) > totalMonths(startDate)) {

          // to forbid futur selection ??
          // if (totalMonths(selectDate) < totalMonths(startDate)) {
          selectDate.add(-1, 'month');
          feelDates(selectDate);
          // }
        }

        function attachChangeTime() {
          var $angles = $($content).find('i[id^="angle-"]');
          // $angles.bind('click', changeTime);
          $angles.bind('mouseup', function () {
            mousedown = false;
            timeout = 800;
          });
          $angles.bind('mousedown', function () {
            mousedown = true;
            changeTime(this);
          });
        }
        function changeTime(el) {
          var $el = this || el;
          $el = $($el);
          ///angle-up-hour angle-up-minute angle-down-hour angle-down-minute
          var arr = $el.attr('id').split('-');
          var increment = 1;
          if (arr[1] == 'down') {
            increment = -1;
          }
          appendIncrement(arr[2], increment);
          setTimeout(function () {
            autoIncrement($el);
          }, timeout);
        }
        function autoIncrement(el) {
          if (mousedown) {
            if (timeout > 200) {
              timeout -= 200;
            }
            changeTime(el);
          }
        }
        function appendIncrement(typeDigits, increment) {
          var $i = typeDigits == "hour" ? $hour : $minute;
          var val = parseInt($i.text()) + increment;
          if (val < 0) {
            val = limitation[typeDigits];
          } else if (val > limitation[typeDigits]) {
            val = 0;
          }
          $i.text(formatDigits(val));
        }
        function formatDigits(val) {
          if (val < 10) {
            return '0' + val;
          }
          return val;
        }
        function createTimer() {
          var $div = $('<div>');
          $div.addClass('dtp_modal-time-mechanic');
          var $panel = $('<div>');
          $panel.addClass('dtp_modal-append');
          var $i = $('<i>');
          $i.attr('id', 'angle-up-hour');
          $i.addClass('fa fa-angle-up ico-size-large cursorily hov');
          $panel.append($i);
          var $m = $('<span>');
          $m.addClass('dtp_modal-midle');
          $panel.append($m);
          $i = $('<i>');
          $i.attr('id', 'angle-up-minute');
          $i.addClass('fa fa-angle-up ico-size-large cursorily hov');
          $panel.append($i);
          $div.append($panel);
          $panel = $('<div>');
          $panel.addClass('dtp_modal-digits');
          var $d = $('<span>');
          $d.addClass('dtp_modal-digit');
          $d.attr('id', 'd-hh');
          $d.text(lastSelected.format('HH'));
          $panel.append($d);
          $m = $('<span>');
          $m.addClass('dtp_modal-midle-dig');
          $m.html(':');
          $panel.append($m);
          $d = $('<span>');
          $d.addClass('dtp_modal-digit');
          $d.attr('id', 'd-mm');
          $d.text(lastSelected.format('mm'));
          $panel.append($d);
          $div.append($panel);
          $panel = $('<div>');
          $panel.addClass('dtp_modal-append');
          $i = $('<i>');
          $i.attr('id', 'angle-down-hour');
          $i.addClass('fa fa-angle-down ico-size-large cursorily hov');
          $panel.append($i);
          $m = $('<span>');
          $m.addClass('dtp_modal-midle');
          $panel.append($m);
          $i = $('<i>');
          $i.attr('id', 'angle-down-minute');
          $i.addClass('fa fa-angle-down ico-size-large cursorily hov');
          $panel.append($i);
          $div.append($panel);
          return $div;
        }
        function createContent() {
          var $c = $('<div>');
          if (settings.showTime) {
            $c.addClass("dtp_modal-content");
          } else {
            $c.addClass("dtp_modal-content-no-time");
          }
          var $el = $('<div>');
          $el.addClass("dtp_modal-title");
          $el.text(settings.title);
          $c.append($el);
          $el = $('<div>');
          $el.addClass('dtp_modal-cell-date');
          $el.attr('id', 'field-data');
          $c.append($el);
          if (settings.showTime) {
            $el = $('<div>');
            $el.addClass('dtp_modal-cell-time');
            var $a = $('<div>');
            $a.addClass('dtp_modal-time-block');
            $a.attr('id', 'field-time');
            $el.append($a);
            var $line = $('<div>');
            $line.attr('id', 'time-line');
            $line.addClass('dtp_modal-time-line');
            $line.text(lastSelected.format(settings.dateFormat));
            $a.append($line);
            $a.append(createTimer());
            var $but = $('<div>');
            $but.addClass('dpt_modal-button');
            $but.text(settings.buttonTitle);
            $but.bind('click', close);
            $el.append($but);
            $c.append($el);
          }
          return $c;
        }
        function updateDate() {
          if (settings.showTime) {
            $('#time-line').text(lastSelected.format(settings.dateFormat));
          }
          updateMainElem();
          elem.next().val(selectDate.format(settings.dateFormat));
          var $value = selectDate.format(settings.dateFormatDigit);
          var $inpute = $('#result');
          $inpute.attr("value", $value);
          if (!settings.showTime) {
            $content.remove();
            $win.remove();
          }
        }
        function updateMainElem() {
          var arrF = settings.dateFormat.split(' ');
          if (settings.showTime && arrF.length != 2) {
            arrF.length = 2;
            arrF[0] = 'DD/MM/YYYY';
            arrF[1] = 'HH:mm';
          }
          var $s = $('<span>');
          $s.text(lastSelected.format(arrF[0]));
          elem.empty();
          elem.append($s);
          $s = $('<i>');
          $s.addClass('fa fa-calendar ico-size');
          elem.append($s);
          if (settings.showTime) {
            $s = $('<span>');
            $s.text(lastSelected.format(arrF[1]));
            elem.append($s);
            $s = $('<i>');
            $s.addClass('fa fa-clock-o ico-size');
            elem.append($s);
          }
        }
      });
    });
  };
  function copyDate(d) {
    return moment(d.toDate());
  }
  function totalMonths(m) {
    var r = m.format('YYYY') * 12 + parseInt(m.format('MM'));
    return r;
  }
})(jQuery);
// fa-caret-down

var psl;
if (window.innerWidth < 450) {
  psl = 2;
} else {
  psl = 33;
}
$(document).ready(function () {
  $('#picker').dateTimePicker({
    // positionShift: { top: 30, left: psl },
    title: "Selectinez l\'heure et la date.",
    buttonTitle: "Valider"
  });
  // $('#picker-no-time').dateTimePicker({ showTime: false, dateFormat: 'DD/MMMM/YYYY', title: 'Select Date' });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_expo-9e55a2","vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_functio-fc602f"], () => (__webpack_exec__("./assets/js/datetimepicker.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEdBQUd0RCxDQUFDLENBQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHK0IsUUFBUSxDQUFDTixDQUFDLENBQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsT0FBTytFLENBQUM7RUFDVjtBQUVGLENBQUMsRUFBQ0MsTUFBTSxDQUFDO0FBQ1Q7O0FBRUEsSUFBSUMsR0FBRztBQUNQLElBQUlDLE1BQU0sQ0FBQ0MsVUFBVSxHQUFHLEdBQUcsRUFBRTtFQUMzQkYsR0FBRyxHQUFHLENBQUM7QUFDVCxDQUFDLE1BQU07RUFDTEEsR0FBRyxHQUFHLEVBQUU7QUFDVjtBQUVBbEgsQ0FBQyxDQUFDcUgsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzVCdEgsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDRSxjQUFjLENBQUM7SUFDMUI7SUFDQVksS0FBSyxFQUFFLGlDQUFpQztJQUN4Q0MsV0FBVyxFQUFFO0VBQ2YsQ0FBQyxDQUFDO0VBQ0Y7QUFDRixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGF0ZXRpbWVwaWNrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJC5mbi5kYXRlVGltZVBpY2tlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICBzZWxlY3REYXRhOiBcIm5vd1wiLFxuICAgICAgZGF0ZUZvcm1hdDogXCJERC1NTU0tWVlZWSBISDptbVwiLFxuICAgICAgZGF0ZUZvcm1hdERpZ2l0OiBcIllZWVktTU0tREQgSEg6bW1cIixcbiAgICAgIHNob3dUaW1lOiB0cnVlLFxuICAgICAgbG9jYWxlOiAnZnInLFxuICAgICAgcG9zaXRpb25TaGlmdDogeyB0b3A6IDIwLCBsZWZ0OiAxIH0sXG4gICAgICB0aXRsZTogXCJTZWxlY3QgRGF0ZSBhbmQgVGltZVwiLFxuICAgICAgYnV0dG9uVGl0bGU6IFwiU2VsZWN0XCJcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIG1vbWVudC5sb2NhbGUoc2V0dGluZ3MubG9jYWxlKTtcbiAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgdmFyIGxpbWl0YXRpb24gPSB7IFwiaG91clwiOiAyMywgXCJtaW51dGVcIjogNTkgfTtcbiAgICB2YXIgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgdmFyIHRpbWVvdXQgPSA4MDA7XG4gICAgdmFyIHNlbGVjdERhdGUgPSBzZXR0aW5ncy5zZWxlY3REYXRhID09IFwibm93XCIgPyBtb21lbnQoKSA6IG1vbWVudChzZXR0aW5ncy5zZWxlY3REYXRhLCBzZXR0aW5ncy5kYXRlRm9ybWF0KTtcbiAgICBpZiAoc2VsZWN0RGF0ZSA8IG1vbWVudCgpKSB7XG4gICAgICBzZWxlY3REYXRlID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHZhciBzdGFydERhdGUgPSBjb3B5RGF0ZShtb21lbnQoKSk7XG4gICAgdmFyIGxhc3RTZWxlY3RlZCA9IGNvcHlEYXRlKHNlbGVjdERhdGUpO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGxhc3RTZWxlY3RlZCAhPSBzZWxlY3REYXRlKSB7XG4gICAgICAgIHNlbGVjdERhdGUgPSBjb3B5RGF0ZShsYXN0U2VsZWN0ZWQpO1xuICAgICAgfVxuICAgICAgZWxlbS5hZGRDbGFzcyhcImR0cF9tYWluIGZsb2F0LWVuZFwiKTtcbiAgICAgIHVwZGF0ZU1haW5FbGVtR2xvYmFsKCk7XG4gICAgICAvLyAgZWxlbS50ZXh0KHNlbGVjdERhdGUuZm9ybWF0KHNldHRpbmdzLmRhdGVGb3JtYXQpKTtcbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZU1haW5FbGVtR2xvYmFsKCkge1xuICAgICAgICB2YXIgYXJyRiA9IHNldHRpbmdzLmRhdGVGb3JtYXQuc3BsaXQoJyAnKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLnNob3dUaW1lICYmIGFyckYubGVuZ3RoICE9IDIpIHtcbiAgICAgICAgICBhcnJGLmxlbmd0aCA9IDI7XG4gICAgICAgICAgYXJyRlswXSA9ICdERC9NTU0vWVlZWSc7XG4gICAgICAgICAgYXJyRlsxXSA9ICdISDptbSc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyICRzID0gJCgnPHNwYW4+Jyk7XG5cbiAgICAgICAgJHMudGV4dChsYXN0U2VsZWN0ZWQuZm9ybWF0KGFyckZbMF0pKTtcbiAgICAgICAgZWxlbS5lbXB0eSgpO1xuICAgICAgICBlbGVtLmFwcGVuZCgkcyk7XG4gICAgICAgICRzID0gJCgnPGk+Jyk7XG4gICAgICAgICRzLmFkZENsYXNzKCdmYSBmYS1jYWxlbmRhciBpY28tc2l6ZScpO1xuICAgICAgICBlbGVtLmFwcGVuZCgkcyk7XG4gICAgICAgIGlmIChzZXR0aW5ncy5zaG93VGltZSkge1xuICAgICAgICAgICRzID0gJCgnPHNwYW4+Jyk7XG4gICAgICAgICAgJHMudGV4dChsYXN0U2VsZWN0ZWQuZm9ybWF0KGFyckZbMV0pKTtcbiAgICAgICAgICBlbGVtLmFwcGVuZCgkcyk7XG4gICAgICAgICAgJHMgPSAkKCc8aT4nKTtcbiAgICAgICAgICAkcy5hZGRDbGFzcygnZmEgZmEtY2xvY2stbyBpY28tc2l6ZSBhYWEnKTtcbiAgICAgICAgICBlbGVtLmFwcGVuZCgkcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHdpbiA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICR3aW4uYWRkQ2xhc3MoXCJkdHBfbW9kYWwtd2luXCIpO1xuICAgICAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgICRib2R5LmFwcGVuZCgkd2luKTtcbiAgICAgICAgdmFyICRjb250ZW50ID0gY3JlYXRlQ29udGVudCgpO1xuICAgICAgICAkYm9keS5hcHBlbmQoJGNvbnRlbnQpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKTtcblxuICAgICAgICAvLyAkY29udGVudC5jc3MoeyB0b3A6IChvZmZzZXQudG9wICsgc2V0dGluZ3MucG9zaXRpb25TaGlmdC50b3ApICsgXCJweFwiLCBsZWZ0OiAob2Zmc2V0LmxlZnQgKyBzZXR0aW5ncy5wb3NpdGlvblNoaWZ0LmxlZnQpICsgXCJweFwiIH0pO1xuXG4gICAgICAgIC8vICRjb250ZW50LmNzcyh7IHRvcDogKG9mZnNldC50b3AgKyBzZXR0aW5ncy5wb3NpdGlvblNoaWZ0LnRvcCkgKyBcInB4XCIsIGxlZnQ6IChzZXR0aW5ncy5wb3NpdGlvblNoaWZ0LmxlZnQpICsgXCIlXCIgfSk7XG5cbiAgICAgICAgZmVlbERhdGVzKHNlbGVjdERhdGUpO1xuICAgICAgICAkd2luLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkY29udGVudC5yZW1vdmUoKTtcbiAgICAgICAgICAkd2luLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNldHRpbmdzLnNob3dUaW1lKSB7XG4gICAgICAgICAgYXR0YWNoQ2hhbmdlVGltZSgpO1xuICAgICAgICAgIHZhciAkZmllbGRUaW1lID0gJCgnI2ZpZWxkLXRpbWUnKTtcbiAgICAgICAgICB2YXIgJGhvdXIgPSAkZmllbGRUaW1lLmZpbmQoJyNkLWhoJyk7XG4gICAgICAgICAgdmFyICRtaW51dGUgPSAkZmllbGRUaW1lLmZpbmQoJyNkLW1tJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmZWVsRGF0ZXMoc2VsZWN0TSkge1xuICAgICAgICAgIHZhciAkZkRhdGUgPSAkY29udGVudC5maW5kKCcjZmllbGQtZGF0YScpO1xuICAgICAgICAgICRmRGF0ZS5lbXB0eSgpO1xuICAgICAgICAgICRmRGF0ZS5hcHBlbmQoY3JlYXRlTW9udGhQYW5lbChzZWxlY3RNKSk7XG4gICAgICAgICAgJGZEYXRlLmFwcGVuZChjcmVhdGVDYWxlbmRhcihzZWxlY3RNKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDYWxlbmRhcihzZWxlY3RlZE1vbnRoKSB7XG4gICAgICAgICAgdmFyICRjID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAkYy5hZGRDbGFzcygnZHRwX21vZGFsLWNhbGVuZGFyJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIHZhciAkZSA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICAgICAkZS5hZGRDbGFzcygnZHRwX21vZGFsLWNhbGVuZGFyLWNlbGwgZHRwX21vZGFsLWNvbG9yZWQnKTtcbiAgICAgICAgICAgICRlLnRleHQobW9tZW50KCkud2Vla2RheShpKS5mb3JtYXQoJ2RkZCcpKTtcbiAgICAgICAgICAgICRjLmFwcGVuZCgkZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBtID0gY29weURhdGUoc2VsZWN0ZWRNb250aCk7XG4gICAgICAgICAgbS5kYXRlKDEpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG0uZm9ybWF0KCdERC0tTU0tLVlZWVknKSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coc2VsZWN0RGF0YS5mb3JtYXQoJ0RELS1NTS0tWVlZWScpKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtLndlZWtkYXkoKSk7XG4gICAgICAgICAgdmFyIGZsYWdTdGFydCA9IHRvdGFsTW9udGhzKHNlbGVjdGVkTW9udGgpID09PSB0b3RhbE1vbnRocyhzdGFydERhdGUpO1xuICAgICAgICAgIHZhciBmbGFnU2VsZWN0ID0gdG90YWxNb250aHMobGFzdFNlbGVjdGVkKSA9PT0gdG90YWxNb250aHMoc2VsZWN0ZWRNb250aCk7XG4gICAgICAgICAgdmFyIGNlckRheSA9IHBhcnNlSW50KHNlbGVjdGVkTW9udGguZm9ybWF0KCdEJykpO1xuICAgICAgICAgIHZhciBkYXlOb3cgPSBwYXJzZUludChzdGFydERhdGUuZm9ybWF0KCdEJykpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICB2YXIgJGIgPSAkKCc8ZGl2PicpO1xuICAgICAgICAgICAgICAkYi5odG1sKCcmbmJzcDsnKTtcbiAgICAgICAgICAgICAgJGIuYWRkQ2xhc3MoJ2R0cF9tb2RhbC1jYWxlbmRhci1jZWxsJyk7XG4gICAgICAgICAgICAgIGlmIChtLm1vbnRoKCkgPT0gc2VsZWN0ZWRNb250aC5tb250aCgpICYmIG0ud2Vla2RheSgpID09IGopIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gcGFyc2VJbnQobS5mb3JtYXQoJ0QnKSk7XG4gICAgICAgICAgICAgICAgJGIudGV4dChkYXkpO1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yYmlkZSBwYXN0IHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIC8vIGlmIChmbGFnU3RhcnQgJiYgZGF5IDwgZGF5Tm93KSB7XG4gICAgICAgICAgICAgICAgLy8gJGIuYWRkQ2xhc3MoJ2R0cF9tb2RhbC1ncmV5Jyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIGVsc2VcblxuICAgICAgICAgICAgICAgIC8vIGZvcmJpZGUgZnV0dXIgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGZsYWdTdGFydCAmJiBkYXkgPiBkYXlOb3cpIHtcbiAgICAgICAgICAgICAgICAgICRiLmFkZENsYXNzKCdkdHBfbW9kYWwtZ3JleScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmbGFnU2VsZWN0ICYmIGRheSA9PSBjZXJEYXkpIHtcbiAgICAgICAgICAgICAgICAgICRiLmFkZENsYXNzKCdkdHBfbW9kYWwtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICRiLmFkZENsYXNzKCdjdXJzb3JpbHknKTtcbiAgICAgICAgICAgICAgICAgICRiLmJpbmQoJ2NsaWNrJywgY2hhbmdlRGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG0uYWRkKDEsICdkYXlzJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJGMuYXBwZW5kKCRiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRjO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlRGF0ZSgpIHtcblxuICAgICAgICAgIHZhciAkZGl2ID0gJCh0aGlzKTtcbiAgICAgICAgICBzZWxlY3REYXRlLmRhdGUoJGRpdi50ZXh0KCkpO1xuICAgICAgICAgIGxhc3RTZWxlY3RlZCA9IGNvcHlEYXRlKHNlbGVjdERhdGUpO1xuICAgICAgICAgIHVwZGF0ZURhdGUoKTtcbiAgICAgICAgICB2YXIgJGZEYXRlID0gJGNvbnRlbnQuZmluZCgnI2ZpZWxkLWRhdGEnKTtcbiAgICAgICAgICB2YXIgb2xkID0gJGZEYXRlLmZpbmQoJy5kdHBfbW9kYWwtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIG9sZC5yZW1vdmVDbGFzcygnZHRwX21vZGFsLWNlbGwtc2VsZWN0ZWQnKTtcbiAgICAgICAgICBvbGQuYWRkQ2xhc3MoJ2N1cnNvcmlseScpO1xuICAgICAgICAgICRkaXYuYWRkQ2xhc3MoJ2R0cF9tb2RhbC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgICAgJGRpdi5yZW1vdmVDbGFzcygnY3Vyc29yaWx5Jyk7XG4gICAgICAgICAgb2xkLmJpbmQoJ2NsaWNrJywgY2hhbmdlRGF0ZSk7XG4gICAgICAgICAgJGRpdi51bmJpbmQoJ2NsaWNrJyk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coc2VsZWN0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW0nKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVNb250aFBhbmVsKHNlbGVjdE1vbnRoKSB7XG4gICAgICAgICAgdmFyICRkID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAkZC5hZGRDbGFzcygnZHRwX21vZGFsLW1vbnRocycpO1xuICAgICAgICAgIHZhciAkcyA9ICQoJzxpPjwvaT4nKTtcbiAgICAgICAgICAkcy5hZGRDbGFzcygnZmEgZmEtYW5nbGUtbGVmdCBjdXJzb3JpbHkgaWNvLXNpemUtbW9udGggaG92Jyk7XG4gICAgICAgICAgLy8kcy5hdHRyKCdkYXRhLWZhLW1hc2snLCAnZmFzIGZhLWNpcmNsZScpO1xuICAgICAgICAgICRzLmJpbmQoJ2NsaWNrJywgcHJldk1vbnRoKTtcbiAgICAgICAgICAkZC5hcHBlbmQoJHMpO1xuICAgICAgICAgICRzID0gJCgnPHNwYW4+Jyk7XG4gICAgICAgICAgJHMudGV4dChzZWxlY3RNb250aC5mb3JtYXQoXCJNTU0gWVlZWVwiKSk7XG4gICAgICAgICAgJGQuYXBwZW5kKCRzKTtcbiAgICAgICAgICBpZiAodG90YWxNb250aHMoc2VsZWN0RGF0ZSkgPCB0b3RhbE1vbnRocyhzdGFydERhdGUpKSB7XG4gICAgICAgICAgICAkcyA9ICQoJzxpPjwvaT4nKTtcbiAgICAgICAgICAgICRzLmFkZENsYXNzKCdmYSBmYS1hbmdsZS1yaWdodCBjdXJzb3JpbHkgaWNvLXNpemUtbW9udGggaG92Jyk7XG4gICAgICAgICAgICAkcy5iaW5kKCdjbGljaycsIG5leHRNb250aCk7XG4gICAgICAgICAgICAkZC5hcHBlbmQoJHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJGQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3Muc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIGxhc3RTZWxlY3RlZC5ob3VyKHBhcnNlSW50KCRob3VyLnRleHQoKSkpO1xuICAgICAgICAgICAgbGFzdFNlbGVjdGVkLm1pbnV0ZShwYXJzZUludCgkbWludXRlLnRleHQoKSkpO1xuICAgICAgICAgICAgc2VsZWN0RGF0ZS5ob3VyKHBhcnNlSW50KCRob3VyLnRleHQoKSkpO1xuICAgICAgICAgICAgc2VsZWN0RGF0ZS5taW51dGUocGFyc2VJbnQoJG1pbnV0ZS50ZXh0KCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRGF0ZSgpO1xuICAgICAgICAgICRjb250ZW50LnJlbW92ZSgpO1xuICAgICAgICAgICR3aW4ucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBuZXh0TW9udGgoKSB7XG4gICAgICAgICAgc2VsZWN0RGF0ZS5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICAgICAgZmVlbERhdGVzKHNlbGVjdERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcHJldk1vbnRoKCkge1xuICAgICAgICAgIC8vIHRvIGZvcmJpZCBwYXN0IHNlbGVjdGlvblxuICAgICAgICAgIC8vaWYgKHRvdGFsTW9udGhzKHNlbGVjdERhdGUpID4gdG90YWxNb250aHMoc3RhcnREYXRlKSkge1xuXG5cbiAgICAgICAgICAvLyB0byBmb3JiaWQgZnV0dXIgc2VsZWN0aW9uID8/XG4gICAgICAgICAgLy8gaWYgKHRvdGFsTW9udGhzKHNlbGVjdERhdGUpIDwgdG90YWxNb250aHMoc3RhcnREYXRlKSkge1xuICAgICAgICAgIHNlbGVjdERhdGUuYWRkKC0xLCAnbW9udGgnKTtcbiAgICAgICAgICBmZWVsRGF0ZXMoc2VsZWN0RGF0ZSk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYXR0YWNoQ2hhbmdlVGltZSgpIHtcbiAgICAgICAgICB2YXIgJGFuZ2xlcyA9ICQoJGNvbnRlbnQpLmZpbmQoJ2lbaWRePVwiYW5nbGUtXCJdJyk7XG4gICAgICAgICAgLy8gJGFuZ2xlcy5iaW5kKCdjbGljaycsIGNoYW5nZVRpbWUpO1xuICAgICAgICAgICRhbmdsZXMuYmluZCgnbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgdGltZW91dCA9IDgwMDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkYW5nbGVzLmJpbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vdXNlZG93biA9IHRydWU7XG4gICAgICAgICAgICBjaGFuZ2VUaW1lKHRoaXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVGltZShlbCkge1xuICAgICAgICAgIHZhciAkZWwgPSB0aGlzIHx8IGVsO1xuICAgICAgICAgICRlbCA9ICQoJGVsKTtcbiAgICAgICAgICAvLy9hbmdsZS11cC1ob3VyIGFuZ2xlLXVwLW1pbnV0ZSBhbmdsZS1kb3duLWhvdXIgYW5nbGUtZG93bi1taW51dGVcbiAgICAgICAgICB2YXIgYXJyID0gJGVsLmF0dHIoJ2lkJykuc3BsaXQoJy0nKTtcbiAgICAgICAgICB2YXIgaW5jcmVtZW50ID0gMTtcbiAgICAgICAgICBpZiAoYXJyWzFdID09ICdkb3duJykge1xuICAgICAgICAgICAgaW5jcmVtZW50ID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFwcGVuZEluY3JlbWVudChhcnJbMl0sIGluY3JlbWVudCk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50KCRlbCk7XG4gICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhdXRvSW5jcmVtZW50KGVsKSB7XG4gICAgICAgICAgaWYgKG1vdXNlZG93bikge1xuICAgICAgICAgICAgaWYgKHRpbWVvdXQgPiAyMDApIHtcbiAgICAgICAgICAgICAgdGltZW91dCAtPSAyMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2VUaW1lKGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhcHBlbmRJbmNyZW1lbnQodHlwZURpZ2l0cywgaW5jcmVtZW50KSB7XG5cbiAgICAgICAgICB2YXIgJGkgPSB0eXBlRGlnaXRzID09IFwiaG91clwiID8gJGhvdXIgOiAkbWludXRlO1xuICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUludCgkaS50ZXh0KCkpICsgaW5jcmVtZW50O1xuICAgICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICB2YWwgPSBsaW1pdGF0aW9uW3R5cGVEaWdpdHNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2YWwgPiBsaW1pdGF0aW9uW3R5cGVEaWdpdHNdKSB7XG4gICAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkaS50ZXh0KGZvcm1hdERpZ2l0cyh2YWwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdERpZ2l0cyh2YWwpIHtcblxuICAgICAgICAgIGlmICh2YWwgPCAxMCkge1xuICAgICAgICAgICAgcmV0dXJuICcwJyArIHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVRpbWVyKCkge1xuICAgICAgICAgIHZhciAkZGl2ID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAkZGl2LmFkZENsYXNzKCdkdHBfbW9kYWwtdGltZS1tZWNoYW5pYycpO1xuICAgICAgICAgIHZhciAkcGFuZWwgPSAkKCc8ZGl2PicpO1xuICAgICAgICAgICRwYW5lbC5hZGRDbGFzcygnZHRwX21vZGFsLWFwcGVuZCcpO1xuICAgICAgICAgIHZhciAkaSA9ICQoJzxpPicpO1xuICAgICAgICAgICRpLmF0dHIoJ2lkJywgJ2FuZ2xlLXVwLWhvdXInKTtcbiAgICAgICAgICAkaS5hZGRDbGFzcygnZmEgZmEtYW5nbGUtdXAgaWNvLXNpemUtbGFyZ2UgY3Vyc29yaWx5IGhvdicpO1xuICAgICAgICAgICRwYW5lbC5hcHBlbmQoJGkpO1xuICAgICAgICAgIHZhciAkbSA9ICQoJzxzcGFuPicpO1xuICAgICAgICAgICRtLmFkZENsYXNzKCdkdHBfbW9kYWwtbWlkbGUnKTtcbiAgICAgICAgICAkcGFuZWwuYXBwZW5kKCRtKTtcbiAgICAgICAgICAkaSA9ICQoJzxpPicpO1xuICAgICAgICAgICRpLmF0dHIoJ2lkJywgJ2FuZ2xlLXVwLW1pbnV0ZScpO1xuICAgICAgICAgICRpLmFkZENsYXNzKCdmYSBmYS1hbmdsZS11cCBpY28tc2l6ZS1sYXJnZSBjdXJzb3JpbHkgaG92Jyk7XG4gICAgICAgICAgJHBhbmVsLmFwcGVuZCgkaSk7XG4gICAgICAgICAgJGRpdi5hcHBlbmQoJHBhbmVsKTtcblxuICAgICAgICAgICRwYW5lbCA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICAgJHBhbmVsLmFkZENsYXNzKCdkdHBfbW9kYWwtZGlnaXRzJyk7XG4gICAgICAgICAgdmFyICRkID0gJCgnPHNwYW4+Jyk7XG4gICAgICAgICAgJGQuYWRkQ2xhc3MoJ2R0cF9tb2RhbC1kaWdpdCcpO1xuICAgICAgICAgICRkLmF0dHIoJ2lkJywgJ2QtaGgnKTtcbiAgICAgICAgICAkZC50ZXh0KGxhc3RTZWxlY3RlZC5mb3JtYXQoJ0hIJykpO1xuICAgICAgICAgICRwYW5lbC5hcHBlbmQoJGQpO1xuICAgICAgICAgICRtID0gJCgnPHNwYW4+Jyk7XG4gICAgICAgICAgJG0uYWRkQ2xhc3MoJ2R0cF9tb2RhbC1taWRsZS1kaWcnKTtcbiAgICAgICAgICAkbS5odG1sKCc6Jyk7XG4gICAgICAgICAgJHBhbmVsLmFwcGVuZCgkbSk7XG4gICAgICAgICAgJGQgPSAkKCc8c3Bhbj4nKTtcbiAgICAgICAgICAkZC5hZGRDbGFzcygnZHRwX21vZGFsLWRpZ2l0Jyk7XG4gICAgICAgICAgJGQuYXR0cignaWQnLCAnZC1tbScpO1xuICAgICAgICAgICRkLnRleHQobGFzdFNlbGVjdGVkLmZvcm1hdCgnbW0nKSk7XG4gICAgICAgICAgJHBhbmVsLmFwcGVuZCgkZCk7XG4gICAgICAgICAgJGRpdi5hcHBlbmQoJHBhbmVsKTtcblxuICAgICAgICAgICRwYW5lbCA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICAgJHBhbmVsLmFkZENsYXNzKCdkdHBfbW9kYWwtYXBwZW5kJyk7XG4gICAgICAgICAgJGkgPSAkKCc8aT4nKTtcbiAgICAgICAgICAkaS5hdHRyKCdpZCcsICdhbmdsZS1kb3duLWhvdXInKTtcbiAgICAgICAgICAkaS5hZGRDbGFzcygnZmEgZmEtYW5nbGUtZG93biBpY28tc2l6ZS1sYXJnZSBjdXJzb3JpbHkgaG92Jyk7XG4gICAgICAgICAgJHBhbmVsLmFwcGVuZCgkaSk7XG4gICAgICAgICAgJG0gPSAkKCc8c3Bhbj4nKTtcbiAgICAgICAgICAkbS5hZGRDbGFzcygnZHRwX21vZGFsLW1pZGxlJyk7XG4gICAgICAgICAgJHBhbmVsLmFwcGVuZCgkbSk7XG4gICAgICAgICAgJGkgPSAkKCc8aT4nKTtcbiAgICAgICAgICAkaS5hdHRyKCdpZCcsICdhbmdsZS1kb3duLW1pbnV0ZScpO1xuICAgICAgICAgICRpLmFkZENsYXNzKCdmYSBmYS1hbmdsZS1kb3duIGljby1zaXplLWxhcmdlIGN1cnNvcmlseSBob3YnKTtcbiAgICAgICAgICAkcGFuZWwuYXBwZW5kKCRpKTtcbiAgICAgICAgICAkZGl2LmFwcGVuZCgkcGFuZWwpO1xuICAgICAgICAgIHJldHVybiAkZGl2O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udGVudCgpIHtcbiAgICAgICAgICB2YXIgJGMgPSAkKCc8ZGl2PicpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5zaG93VGltZSkge1xuICAgICAgICAgICAgJGMuYWRkQ2xhc3MoXCJkdHBfbW9kYWwtY29udGVudFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkYy5hZGRDbGFzcyhcImR0cF9tb2RhbC1jb250ZW50LW5vLXRpbWVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciAkZWwgPSAkKCc8ZGl2PicpO1xuICAgICAgICAgICRlbC5hZGRDbGFzcyhcImR0cF9tb2RhbC10aXRsZVwiKTtcbiAgICAgICAgICAkZWwudGV4dChzZXR0aW5ncy50aXRsZSk7XG4gICAgICAgICAgJGMuYXBwZW5kKCRlbCk7XG4gICAgICAgICAgJGVsID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2R0cF9tb2RhbC1jZWxsLWRhdGUnKTtcbiAgICAgICAgICAkZWwuYXR0cignaWQnLCAnZmllbGQtZGF0YScpO1xuICAgICAgICAgICRjLmFwcGVuZCgkZWwpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5zaG93VGltZSkge1xuICAgICAgICAgICAgJGVsID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnZHRwX21vZGFsLWNlbGwtdGltZScpO1xuICAgICAgICAgICAgdmFyICRhID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAgICRhLmFkZENsYXNzKCdkdHBfbW9kYWwtdGltZS1ibG9jaycpO1xuICAgICAgICAgICAgJGEuYXR0cignaWQnLCAnZmllbGQtdGltZScpO1xuICAgICAgICAgICAgJGVsLmFwcGVuZCgkYSk7XG4gICAgICAgICAgICB2YXIgJGxpbmUgPSAkKCc8ZGl2PicpO1xuICAgICAgICAgICAgJGxpbmUuYXR0cignaWQnLCAndGltZS1saW5lJyk7XG4gICAgICAgICAgICAkbGluZS5hZGRDbGFzcygnZHRwX21vZGFsLXRpbWUtbGluZScpO1xuICAgICAgICAgICAgJGxpbmUudGV4dChsYXN0U2VsZWN0ZWQuZm9ybWF0KHNldHRpbmdzLmRhdGVGb3JtYXQpKTtcblxuICAgICAgICAgICAgJGEuYXBwZW5kKCRsaW5lKTtcbiAgICAgICAgICAgICRhLmFwcGVuZChjcmVhdGVUaW1lcigpKTtcbiAgICAgICAgICAgIHZhciAkYnV0ID0gJCgnPGRpdj4nKTtcbiAgICAgICAgICAgICRidXQuYWRkQ2xhc3MoJ2RwdF9tb2RhbC1idXR0b24nKTtcbiAgICAgICAgICAgICRidXQudGV4dChzZXR0aW5ncy5idXR0b25UaXRsZSk7XG4gICAgICAgICAgICAkYnV0LmJpbmQoJ2NsaWNrJywgY2xvc2UpO1xuICAgICAgICAgICAgJGVsLmFwcGVuZCgkYnV0KTtcbiAgICAgICAgICAgICRjLmFwcGVuZCgkZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJGM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlRGF0ZSgpIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3Muc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICQoJyN0aW1lLWxpbmUnKS50ZXh0KGxhc3RTZWxlY3RlZC5mb3JtYXQoc2V0dGluZ3MuZGF0ZUZvcm1hdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVNYWluRWxlbSgpO1xuICAgICAgICAgIGVsZW0ubmV4dCgpLnZhbChzZWxlY3REYXRlLmZvcm1hdChzZXR0aW5ncy5kYXRlRm9ybWF0KSk7XG5cbiAgICAgICAgICB2YXIgJHZhbHVlID0gc2VsZWN0RGF0ZS5mb3JtYXQoc2V0dGluZ3MuZGF0ZUZvcm1hdERpZ2l0KTtcbiAgICAgICAgICB2YXIgJGlucHV0ZSA9ICQoJyNyZXN1bHQnKTtcbiAgICAgICAgICAkaW5wdXRlLmF0dHIoXCJ2YWx1ZVwiLCAkdmFsdWUpO1xuXG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5zaG93VGltZSkge1xuICAgICAgICAgICAgJGNvbnRlbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAkd2luLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZU1haW5FbGVtKCkge1xuICAgICAgICAgIHZhciBhcnJGID0gc2V0dGluZ3MuZGF0ZUZvcm1hdC5zcGxpdCgnICcpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5zaG93VGltZSAmJiBhcnJGLmxlbmd0aCAhPSAyKSB7XG4gICAgICAgICAgICBhcnJGLmxlbmd0aCA9IDI7XG4gICAgICAgICAgICBhcnJGWzBdID0gJ0REL01NL1lZWVknO1xuICAgICAgICAgICAgYXJyRlsxXSA9ICdISDptbSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciAkcyA9ICQoJzxzcGFuPicpO1xuICAgICAgICAgICRzLnRleHQobGFzdFNlbGVjdGVkLmZvcm1hdChhcnJGWzBdKSk7XG4gICAgICAgICAgZWxlbS5lbXB0eSgpO1xuICAgICAgICAgIGVsZW0uYXBwZW5kKCRzKTtcbiAgICAgICAgICAkcyA9ICQoJzxpPicpO1xuICAgICAgICAgICRzLmFkZENsYXNzKCdmYSBmYS1jYWxlbmRhciBpY28tc2l6ZScpO1xuICAgICAgICAgIGVsZW0uYXBwZW5kKCRzKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3Muc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICRzID0gJCgnPHNwYW4+Jyk7XG4gICAgICAgICAgICAkcy50ZXh0KGxhc3RTZWxlY3RlZC5mb3JtYXQoYXJyRlsxXSkpO1xuICAgICAgICAgICAgZWxlbS5hcHBlbmQoJHMpO1xuICAgICAgICAgICAgJHMgPSAkKCc8aT4nKTtcbiAgICAgICAgICAgICRzLmFkZENsYXNzKCdmYSBmYS1jbG9jay1vIGljby1zaXplJyk7XG4gICAgICAgICAgICBlbGVtLmFwcGVuZCgkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfTtcblxuICBmdW5jdGlvbiBjb3B5RGF0ZShkKSB7XG4gICAgcmV0dXJuIG1vbWVudChkLnRvRGF0ZSgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdGFsTW9udGhzKG0pIHtcbiAgICB2YXIgciA9IG0uZm9ybWF0KCdZWVlZJykgKiAxMiArIHBhcnNlSW50KG0uZm9ybWF0KCdNTScpKTtcbiAgICByZXR1cm4gcjtcbiAgfVxuXG59KGpRdWVyeSkpO1xuLy8gZmEtY2FyZXQtZG93blxuXG5sZXQgcHNsO1xuaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNDUwKSB7XG4gIHBzbCA9IDI7XG59IGVsc2Uge1xuICBwc2wgPSAzMztcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAkKCcjcGlja2VyJykuZGF0ZVRpbWVQaWNrZXIoe1xuICAgIC8vIHBvc2l0aW9uU2hpZnQ6IHsgdG9wOiAzMCwgbGVmdDogcHNsIH0sXG4gICAgdGl0bGU6IFwiU2VsZWN0aW5leiBsXFwnaGV1cmUgZXQgbGEgZGF0ZS5cIixcbiAgICBidXR0b25UaXRsZTogXCJWYWxpZGVyXCIsXG4gIH0pO1xuICAvLyAkKCcjcGlja2VyLW5vLXRpbWUnKS5kYXRlVGltZVBpY2tlcih7IHNob3dUaW1lOiBmYWxzZSwgZGF0ZUZvcm1hdDogJ0REL01NTU0vWVlZWScsIHRpdGxlOiAnU2VsZWN0IERhdGUnIH0pO1xufSk7XG4iXSwibmFtZXMiOlsiJCIsImZuIiwiZGF0ZVRpbWVQaWNrZXIiLCJvcHRpb25zIiwic2V0dGluZ3MiLCJleHRlbmQiLCJzZWxlY3REYXRhIiwiZGF0ZUZvcm1hdCIsImRhdGVGb3JtYXREaWdpdCIsInNob3dUaW1lIiwibG9jYWxlIiwicG9zaXRpb25TaGlmdCIsInRvcCIsImxlZnQiLCJ0aXRsZSIsImJ1dHRvblRpdGxlIiwibW9tZW50IiwiZWxlbSIsImxpbWl0YXRpb24iLCJtb3VzZWRvd24iLCJ0aW1lb3V0Iiwic2VsZWN0RGF0ZSIsInN0YXJ0RGF0ZSIsImNvcHlEYXRlIiwibGFzdFNlbGVjdGVkIiwiZWFjaCIsImFkZENsYXNzIiwidXBkYXRlTWFpbkVsZW1HbG9iYWwiLCJhcnJGIiwic3BsaXQiLCJsZW5ndGgiLCIkcyIsInRleHQiLCJmb3JtYXQiLCJlbXB0eSIsImFwcGVuZCIsIm9uIiwiJHdpbiIsIiRib2R5IiwiJGNvbnRlbnQiLCJjcmVhdGVDb250ZW50Iiwib2Zmc2V0IiwiZmVlbERhdGVzIiwicmVtb3ZlIiwiYXR0YWNoQ2hhbmdlVGltZSIsIiRmaWVsZFRpbWUiLCIkaG91ciIsImZpbmQiLCIkbWludXRlIiwic2VsZWN0TSIsIiRmRGF0ZSIsImNyZWF0ZU1vbnRoUGFuZWwiLCJjcmVhdGVDYWxlbmRhciIsInNlbGVjdGVkTW9udGgiLCIkYyIsImkiLCIkZSIsIndlZWtkYXkiLCJtIiwiZGF0ZSIsImZsYWdTdGFydCIsInRvdGFsTW9udGhzIiwiZmxhZ1NlbGVjdCIsImNlckRheSIsInBhcnNlSW50IiwiZGF5Tm93IiwiaiIsIiRiIiwiaHRtbCIsIm1vbnRoIiwiZGF5IiwiYmluZCIsImNoYW5nZURhdGUiLCJhZGQiLCIkZGl2IiwidXBkYXRlRGF0ZSIsIm9sZCIsInJlbW92ZUNsYXNzIiwidW5iaW5kIiwic2VsZWN0TW9udGgiLCIkZCIsInByZXZNb250aCIsIm5leHRNb250aCIsImNsb3NlIiwiaG91ciIsIm1pbnV0ZSIsIiRhbmdsZXMiLCJjaGFuZ2VUaW1lIiwiZWwiLCIkZWwiLCJhcnIiLCJhdHRyIiwiaW5jcmVtZW50IiwiYXBwZW5kSW5jcmVtZW50Iiwic2V0VGltZW91dCIsImF1dG9JbmNyZW1lbnQiLCJ0eXBlRGlnaXRzIiwiJGkiLCJ2YWwiLCJmb3JtYXREaWdpdHMiLCJjcmVhdGVUaW1lciIsIiRwYW5lbCIsIiRtIiwiJGEiLCIkbGluZSIsIiRidXQiLCJ1cGRhdGVNYWluRWxlbSIsIm5leHQiLCIkdmFsdWUiLCIkaW5wdXRlIiwiZCIsInRvRGF0ZSIsInIiLCJqUXVlcnkiLCJwc2wiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJzb3VyY2VSb290IjoiIn0=