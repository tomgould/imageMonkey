// ==UserScript==
// @name       imageMonkey.js
// @namespace  http://imageMonkey.js
// @version    0.1
// @description  replaces all the images with Beer Hold images
// @match      *://*/*
// @copyright  2012+, imageMonkey.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant GM_addStyle
// ==/UserScript==
var baseUrl = [
  'place-hoff.com',
  'lorempixel.com',
  'baconmockup.com',
  'beerhold.it',
  'placeskull.com',
  'placebear.com',
];
var imageMonkey = function () {
  $('img').each(function () {
    theWidth = $(this).width();
    theHeight = $(this).height();
    oldSrc = $(this).attr('src');
    theSrc = getMeAnImage(theWidth, theHeight);
    if (undefined !== oldSrc && oldSrc.length > 1 && oldSrc.indexOf('?lol') < 1 && oldSrc.indexOf('/0') < 1) {
      $(this).addClass('imageMonkey');
      $(this).attr('src', theSrc);
      $(this).css("width", theWidth + "px");
      $(this).css("height", theHeight + "px");
    }
  });
  bgImgOnElem('a');
  bgImgOnElem('div');
  bgImgOnElem('span');
  bgImgOnElem('li');
  setTimeout(replace, 1000);
};
var bgImgOnElem = function (tagName) {
  $(tagName).each(function () {
    theWidth = $(this).width();
    theHeight = $(this).height();
    oldSrc = $(this).css('background-image');
    theSrc = getMeAnImage(theWidth, theHeight);
    if (undefined !== oldSrc && oldSrc !== 'none' && oldSrc.length > 1 && oldSrc.indexOf('?lol') < 1 && oldSrc.indexOf('/0') < 1) {
      $(this).addClass('imageMonkey');
      $(this).css("background-image", "url(" + theSrc + ")");
      $(this).css("width", theWidth + "px");
      $(this).css("height", theHeight + "px");
    }
  });
}
var getMeAnImage = function (width, height) {
  var rand = getRandomMultiplier();
  xwidth = parseInt(rand * width);
  xheight = parseInt(rand * height);
  url = 'http://' + baseUrl[getRandomInt(0, 6)] + '/' + xwidth + '/' + xheight + '?lol';
  console.log(url);
  return url;
};
var getRandomMultiplier = function () {
  return Math.floor((Math.random() + 1) * 1000) / 1000;
};
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
$(document).ready(setTimeout(imageMonkey(), 1000));