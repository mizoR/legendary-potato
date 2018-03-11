'use strict';

var Alexa = require("alexa-sdk");

var Sound = require('find-my-iphone');

var APP_ID = process.env.APP_ID;

var APPLE_ID = process.env.APPLE_ID;

var PASSWORD = process.env.PASSWORD;

var DEVICE_NAME = process.env.DEVICE_NAME;

exports.handler = function(event, context) {
  var alexa = Alexa.handler(event, context);

  alexa.appId = APP_ID;

  alexa.registerHandlers(handlers);

  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('AMAZON.HelpIntent');
  },

  'AMAZON.HelpIntent' : function() {
    this.emit(':ask', '誰のアイフォンを鳴らしますか。');
  },

  // TODO: 子供が勝手にこのインテントを発火させない仕組みを入れる
  'SoundIPhoneByName': function () {
    var name = this.event.request.intent.slots.name.value;

    // FIXME: Apple account should be decided by `name`.
    var appleId = APPLE_ID;

    var password = PASSWORD;

    var deviceName = DEVICE_NAME;

    Sound(appleId, password, deviceName, function() {
      console.log("Sounding " + name + "'s phone.");

      this.emit(':tell', name + 'のアイフォンを鳴らしています。');
    });
  }
};
