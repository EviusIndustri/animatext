"use strict";

var _randomMinMax = function _randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var _genNoise = function _genNoise() {
  return _randomMinMax(1, 30);
};

var _genVelocity = function _genVelocity(from, to, numOfSteps) {
  var myNoise = _genNoise();

  var time = Math.max(numOfSteps - myNoise, 1);
  var myStep = Math.abs(from - to) / time;
  return myStep;
};

var _toAscii = function _toAscii(char) {
  return char ? char.charCodeAt(0) : null;
};

var animateText = function animateText(text, newText) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3000;
  var cb = arguments.length > 4 ? arguments[4] : undefined;
  var stepLengthReminder = 0;
  var stepList = [];
  var numOfSteps = duration / interval;
  var currentStep = 0;
  var stepLength = Math.abs(newText.length - text.length) / numOfSteps;
  var from = text;
  var to = newText;

  if (newText.length < text.length) {
    from = newText;
    to = text;
  }

  from.split('').forEach(function (v, idx) {
    var fromAscii = _toAscii(from[idx]);

    var targetAscii = _toAscii(to[idx]);

    stepList.push(_genVelocity(fromAscii, targetAscii, numOfSteps));
  });
  var splittedText = text.split('');
  var splittedTextAscii = splittedText.map(function (v) {
    return v.charCodeAt(0);
  });
  var myInterval = setInterval(function () {
    if (splittedText.length > newText.length) {
      var tempStepLength = stepLength + stepLengthReminder;
      splittedText = splittedText.slice(0, splittedText.length - Math.floor(tempStepLength));
      stepLengthReminder = tempStepLength % 1;
    } else if (splittedText.length < newText.length) {
      var _tempStepLength = stepLength + stepLengthReminder;

      for (var i = 0; i < Math.floor(_tempStepLength); i++) {
        var randomAscii = _randomMinMax(65, 123);

        var myAscii = _toAscii(newText[splittedText.length]);

        stepList.push(_genVelocity(randomAscii, myAscii, numOfSteps - currentStep));
        splittedText.push(String.fromCharCode(randomAscii));
        splittedTextAscii.push(randomAscii);
      }

      stepLengthReminder = _tempStepLength % 1;
    }

    splittedText.forEach(function (c, idx) {
      if (c != newText[idx]) {
        if (stepList[idx]) {
          var asciiText = splittedTextAscii[idx];
          var asciiNewText = newText.charCodeAt(idx);
          var nextAscii = asciiText > asciiNewText ? asciiText - stepList[idx] : asciiText + stepList[idx];
          splittedTextAscii[idx] = nextAscii;
          splittedText[idx] = String.fromCharCode(Math.round(nextAscii));
        } else {
          splittedText[idx] = String.fromCharCode(_randomMinMax(65, 123));
        }
      }
    });
    cb(splittedText.join(''));
    currentStep++;

    if (splittedText.join('') === newText) {
      clearInterval(myInterval);
    }
  }, interval);
};

module.exports = animateText;
