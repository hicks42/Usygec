/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)

import './styles/app.scss';
import './js/main.js';

// start the Stimulus application
import $ from 'jquery';

import './bootstrap'; //css
import 'bootstrap'; //dans node_modules

import { Tooltip, Toast, Popover } from 'bootstrap';

$(function () {
  $('[data-toogle="tooltip"]').tooltip()
});

// ========= glightbox
GLightbox({
  'href': 'https://www.youtube.com/watch?v=r44RKWyfcFw&fbclid=IwAR21beSJORalzmzokxDRcGfkZA1AtRTE__l5N4r09HcGS5Y6vOluyouM9EM',
  'type': 'video',
  'source': 'youtube', // vimeo, youtube or local
  'width': 900,
  'autoplayVideos': true
  });

// faire apparaître le nom de l’image apparaît dans le champs du formulaire
$('.custom-file-input').on('change', function (e) {
  var inputFile = e.currentTarget;
 $(inputFile).parent().find('.custom-file-label').html(inputFile.files[0].name);
});
