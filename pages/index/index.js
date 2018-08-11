//天气对应中文
const weatherName = {
  'sunny': '晴天',
  'cloudy': '多云',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪',
  'overcast': '阴天',
}
//天气对应小程序导航栏颜色
const wBgColorName = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  //下拉刷新
  onPullDownRefresh() {
    //传入匿名回调函数
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  data: {
    nowTemp: '',
    nowWeather: '',
    wSrc: ''
  },
  onLoad() {
    this.getNow()  
  },
  //请求数据
  //回调函数，让onLoad时不会加载stopPullDownRefresh
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: "北京市",
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let temp = res.data.result.now.temp
        let weather = res.data.result.now.weather
        console.log(temp, weather)
        this.setData({
          nowTemp: temp + '°',
          nowWeather: weatherName[weather],
          wSrc: '/img/' + weather + '-bg.png',
          wBgColor: wBgColorName[weather],
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: wBgColorName[weather],
        })
        console.log("/img/" + weather + "-bg.png")
      },
      //若callback不为空则执行callback()
      complete: () => {
        callback && callback()
      }
    })
  }
})