//天气名称对应
const weatherName = {
  'cloudy': '阴天',
  'heavyrain': '大雨',
  'lightrain': '小雨',
  'overcast': '多云',
  'snow': '下雪',
  'sunny': '晴天',
}

Page({
  onLoad(){
    this.getNow()
  },
  data: {
    week: '',
    date: '',
    temp: '',
    forecastItem: [1,2,3,4,5,6,7],
  },
  getNow(){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '北京市',
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let result = res.data
        console.log(result)
      }
    })
  }
})