// pages/my/deliveryaddress/deliveryaddress-alter/deliveryaddress-alter.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    DeliveryAddressDetail:[],
    deliveryAddressId:'',
    province:null,
    city:null,
    street:null,
    additional:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'userId',
      success: (res) => {
        wx.request({
          url: `http://49.234.207.234:234/api/UserInfo/GetSingleDeliveryAddress?userId=${res.data}&deliveryAddressId=${options.deliveryid}`,
          method: 'GET',
          success: (res) => {
            console.log(res.data)
            that.setData({
              DeliveryAddressDetail:res.data,
              deliveryAddressId:res.data.Id
            })
          }
        });
          
      }
    });
  },
  saveChanges:function(){
    var that=this;
    let province=that.data.province==null?that.data.DeliveryAddressDetail.Province:that.data.province;
    let city=that.data.city==null?that.data.DeliveryAddressDetail.City:that.data.city;
    let street=that.data.street==null?that.data.DeliveryAddressDetail.Street:that.data.street;
    let additional=that.data.additional==null?that.data.DeliveryAddressDetail.Additional:that.data.additional;
    console.log(province+city+street+additional)
    wx.getStorage({
      key: 'userId',
      success: (res) => {
        wx.request({
          url: 'http://49.234.207.234:234/api/UserInfo/AlterDeliveryAddress',
          data: {
            UserId: res.data,
            Province: province,
            City: city,
            Street: street,
            Additional: additional,
            Id: that.data.deliveryAddressId
          },
          method: 'POST',
          success: (res) => {
            if(res.data=="Commit success"){
              wx.showToast({
                title: '修改成功'
              });
            }else{
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              });
                
            }
          }
        });
          
      }
    });
      
  },
  province:function(e){
    var that=this;
    that.setData({
      province:e.detail.value
    })
  },
  city:function(e){
    var that=this;
    that.setData({
      city:e.detail.value
    })
  },
  street:function(e){
    var that=this;
    that.setData({
      street:e.detail.value
    })
  },
  additional:function(e){
    var that=this;
    that.setData({
      additional:e.detail.value
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