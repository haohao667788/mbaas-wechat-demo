//app.js
const sdk = require('mbaas-js-sdk-wechat');

App({
  onLaunch: function () {

    sdk.init({
      "appKey": "",
      "secret": "",
      "envId": ""
    });

    this.globalData = {
      inited: false
    }
  }
})
