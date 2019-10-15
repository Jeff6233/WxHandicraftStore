// pages/my/deliveryaddress/delivery-address.js
var touchStartX = 0;//触摸时的原点 
var touchStartY = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离

Page({

  /**
   * 页面的初始数据
   */
  data: {
    DeliveryAddress:[],
    DeliveryAddressId:null
  },

  // 触摸开始事件 
  touchStart: function (e) {
    var that =this;
    touchStartX = e.touches[0].pageX; // 获取触摸时的原点 
    touchStartY = e.touches[0].pageY; // 获取触摸时的原点 
    /**
     * 初始化
     */
    var list = that.data.DeliveryAddress;
    list.forEach((i, k) => {
      i.isReset = true;
    })
    that.setData({ DeliveryAddress: list })
    that.animation.translateX(0)
      .step({ duration: 200 })
    that.setData({ animation: that.animation.export() })

    that.data.DeliveryAddress.forEach((i, k) => {
      i.isTouchMove=false;
      i.isReset=false;
    })
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件 
  touchMove: function (e) {
    var that=this;
    touchMoveX = e.touches[0].pageX;
    touchMoveY = e.touches[0].pageY;

    var moveX = touchMoveX - touchStartX
    var moveY = touchMoveY - touchStartY
    if (Math.sign(moveX) == -1) {
      moveX = moveX * -1
    }
    if (Math.sign(moveY) == -1) {
      moveY = moveY * -1
    }
    if (moveX <= moveY) {// 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -30 && time < 10) {
      }
      // 向下滑动 
      if (touchMoveY - touchStartY >= 30 && time < 10) {
      }
    } else {// 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -30 && time < 10) {
        var list =that.data.DeliveryAddress;
        list.forEach((i,k)=>{
          if(i.Id==e.currentTarget.dataset.id){
            i.isTouchMove=true;
          }
        })
        that.setData({
          DeliveryAddress:list
        })
        if ((touchMoveX - touchStartX)>-100){
          this.animation.translateX(touchMoveX - touchStartX).step({ duration: 200 });
          this.setData({ animation: this.animation.export() });
        }
      }
      // 向右滑动 
      if (touchMoveX - touchStartX >= 30 && time < 10) {
        var list=that.data.DeliveryAddress;
        list.forEach((i,k)=>{
          i.isReset=true;
        })
        this.setData({DeliveryAddress:list})
        this.animation.translateX(0)
          .step({ duration: 200 })
        this.setData({ animation: this.animation.export() })
      }
    }
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    
  }, 
  setDefaultAddress:function(){
    var that=this;
    if(that.data.DeliveryAddressId!=null){
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          wx.request({
            url: `http://49.234.207.234:234/api/UserInfo/SetDefaultDeliveryAddress?userId=${res.data}&deliveryAddressId=${that.data.DeliveryAddressId}`,
            method: 'GET',
            success(res) {
              wx.showToast({
                title: '设置成功',
              })
              that.onLoad();
            }
          })
        },
      })
    }
  },
  addDeliveryAddress:function(){
    wx.navigateTo({
      url: 'deliveryaddress-add/deliveryaddress-add',
    })
  },
  removeAddress:function(e){
    var that=this;
    wx.showModal({
      title: '消息',
      content: '确认删除此地址',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'userId',
            success: function (res) {
              wx.request({
                url: `http://49.234.207.234:234/api/UserInfo/RemoveDeliveryAddress?userId=${res.data}&deliveryAddressId=${e.currentTarget.dataset.deliveryid}`,
                method: 'GET',
                success(res) {
                  if (res.data == "Commit success") {
                    wx.showToast({
                      title: '删除成功',
                    })
                    var list = that.data.DeliveryAddress;
                    list.forEach((i, k) => {
                      i.isReset = true;
                    })
                    that.setData({ DeliveryAddress: list })
                    that.animation.translateX(0)
                      .step({ duration: 200 })
                    that.setData({ animation: that.animation.export() })
                    that.onLoad();
                  } else {
                    wx.showToast({
                      title: '删除失败',
                    })
                  }
                }
              })
            },
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        wx.request({
          url: `http://49.234.207.234:234/api/UserInfo/GetDeliveryAddress?userId=${res.data}`,
          method:'GET',
          success(res){
            that.setData({
              DeliveryAddress:res.data
            })
          }
        })
      },
    })
  },
  selectedAddress:function(e){
    var that=this;
    that.setData({
      DeliveryAddressId:e.detail.value
    })
  },
  openDeliveryAddressAlter:function(e){
    wx.navigateTo({
      url: `deliveryaddress-alter/deliveryaddress-alter?deliveryid=${e.currentTarget.dataset.deliveryid}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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