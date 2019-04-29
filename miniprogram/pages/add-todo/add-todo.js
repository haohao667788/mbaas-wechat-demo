// pages/add-todo/add-todo.js
const app = getApp();
const sdk = require('mbaas-js-sdk-wechat');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    iconUrl: ''
  },

  onBlur(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  add() {
    if (this.data.inputValue === '') {
      wx.showModal({
        title: '添加失败',
        content: '请填写任务名称。',
        confirmText: '我知道了'
      });
    } else {
      this.addTodo().then(res => {
        if (res.success) {
          wx.navigateBack({
            delta: 1,
          });
        } else {
          wx.showToast({
            title: '请求失败，请重试',
          });
        }
      });
    }
  },

  uploadImg() {
    wx.chooseImage({
      count: 1,
      success: res => {
        const path = res.tempFilePaths[0];
        sdk.file().uploadFile(path, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          sdk.file().getTempUrl(res.objectId, (err, res) => {
            this.setData({
              iconUrl: res.url
            });
          });
        });
      }
    });
  },

  addTodo() {
    return new Promise((resolve, reject) => {
      sdk.db('todos').add({
        text: this.data.inputValue,
        iconUrl: this.data.iconUrl ? this.data.iconUrl : null,
        completed: false,
        createTime: { __type: 'Date', iso: new Date() },
        completeTime: null,
      }, (err, res) => {
        if (err) {
          console.error(err);
          reject({ success: false });
          return;
        }
        console.log('my success');
        resolve({ success: true });
      });
    });
  }
})