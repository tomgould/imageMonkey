// ==UserScript==
// @name       randomImages.js
// @namespace  http://randomImages.js
// @version    0.1
// @description  replaces all the images with Beer Hold images
// @match      *://*/*
// @copyright  2012+, randomImages.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant GM_addStyle
// ==/UserScript==
(function() {
    var randomImages = {
        running: false,
        lastRunTime: 0,
        baseUrl: [
            'place-hoff.com',
            'lorempixel.com',
            'baconmockup.com',
            'fillmurray.com',
            'placecage.com',
            'beerhold.it',
            'placeskull.com',
            'placebear.com'
        ],
        init: function() {
            var timeSinceLastRun = Date.now() - randomImages.lastRunTime;
            if (randomImages.running === false && timeSinceLastRun > 5000) {
                console.log('Running');
                randomImages.running = true;
                randomImages.doReplacements();
                randomImages.running = false;
                randomImages.lastRunTime = Date.now();
                setTimeout(randomImages.init, 1000);
            } else {
                console.log('Bypassing');
            }
        },
        doReplacements: function() {
            $('img').each(function() {
                theWidth = $(this).width();
                theHeight = $(this).height();
                oldSrc = $(this).attr('src');
                theSrc = randomImages.getMeAnImage(theWidth, theHeight);
                if (undefined !== oldSrc && oldSrc.length > 1 && oldSrc.indexOf('?lol') < 1) {
                    $(this).addClass('randomImages');
                    $(this).attr('src', theSrc);
                    $(this).css("width", theWidth + "px");
                    $(this).css("height", theHeight + "px");
                }
            });
            randomImages.bgImgOnElem('a');
            randomImages.bgImgOnElem('div');
            randomImages.bgImgOnElem('span');
            randomImages.bgImgOnElem('li');
        },
        bgImgOnElem: function(tagName) {
            $(tagName).each(function() {
                theWidth = $(this).width();
                theHeight = $(this).height();
                oldSrc = $(this).css('background-image');
                theSrc = randomImages.getMeAnImage(theWidth, theHeight);
                if (undefined !== oldSrc && oldSrc !== 'none' && oldSrc.length > 1 && oldSrc.indexOf('?lol') < 1) {
                    $(this).addClass('randomImages');
                    $(this).css("background-image", "url(" + theSrc + ")");
                    $(this).css("width", theWidth + "px");
                    $(this).css("height", theHeight + "px");
                }
            });
        },
        getMeAnImage: function(width, height) {
            if (width === 0 || height === 0) {
                return undefined;
            }
            var rand = randomImages.getRandomMultiplier();
            xwidth = parseInt(rand * width, 10);
            xheight = parseInt(rand * height, 10);
            url = 'http://' + randomImages.baseUrl[randomImages.getRandomInt(0, 6)] + '/' + xwidth + '/' + xheight + '?lol';

            return url;
        },
        getRandomMultiplier: function() {
            return Math.floor((Math.random() + 1) * 1000) / 1000;
        },
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    };

    randomImages.init();

})();