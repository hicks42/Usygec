/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)

import './styles/app.scss';

import './js/bootstrap.min.js';
import './js/count-up.min.js';
import './js/tiny-slider.js';
import './js/glightbox.min.js';
import './js/imagesloaded.min.js';
import './js/isotope.min.js';
import './js/wow.min.js';
import './js/web-animations.min.js';
import './js/main.js';

// start the Stimulus application
// import $ from 'jquery';
const $ = require('jquery');
global.$ = global.jQuery = $;

window.Popper = require('./js/popper.js');

// import './bootstrap'; //css replaced by bootstrap.min
import 'bootstrap'; //dans node_modules

import { Tooltip, Toast, Popover } from 'bootstrap';

$(function () {
  $('[data-toggle="popover"]').popover();
});

// faire apparaître le nom de l’image apparaît dans le champs du formulaire
// $('.custom-file-input').on('change', function (e) {
//   var inputFile = e.currentTarget;
//  $(inputFile).parent().find('.custom-file-label').html(inputFile.files[0].name);
// });
