const weatherName = {
  'sunny': '晴天',
  'cloudy': '多云',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪',
  'overcast': '阴天',
}

Page({
  data: {
    nowTemp: '',
    nowWeather: ''
  },
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: "兰州市",
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let temp = res.data.result.now.temp
        let weather = res.data.result.now.weather
        console.log(temp,weather)
        this.setData({
          nowTemp: temp + '°',
          nowWeather: weatherName[weather],
        })
      }
    })
  }
})