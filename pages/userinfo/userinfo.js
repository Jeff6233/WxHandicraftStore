// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    userInfo2:[],
    nickName:'',
    introduce:'',
    phoneNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('userInfo', function (data) {
      that.setData({
        userInfo: data.userInfo
      })
      console.log(data.userInfo)
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo2:res.data
        })
        console.log(that.data.userInfo2)
      },
    })
  },
  saveUserInfo:function(){
    var that=this;
    console.log(that.data.nickName,that.data.introduce,that.data.phoneNum)
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        wx.request({
          url: 'http://49.234.207.234:234/api/UserInfo/AlterUserInfo',
          method: 'POST',
          data: {
            NickName: that.data.nickName,
            Introduce: that.data.introduce,
            Id: res.data,
            PhoneNum: that.data.phoneNum,
          },
          success(res){
            console.log(res.data)
            that.onLoad();
          },
          fail(res){
            wx.showToast({
              title: '保存失败',
            })
          }
        })
      },
    })
    
  },
  nickName:function(e){
    var that=this;
    that.setData({
      nickName:e.detail.value
    })
  },
  introduce: function (e) {
    var that = this;
    that.setData({
      introduce: e.detail.value
    })
  },
  phoneNum: function (e) {
    var that = this;
    that.setData({
      phoneNum: e.detail.value
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})