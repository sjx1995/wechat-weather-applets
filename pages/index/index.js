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
    wSrc: '',
    forecast: []
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
        let result = res.data.result
        // console.log("/img/" + weather + "-bg.png")
        //显示现在天气
        let temp = result.now.temp
        let weather = result.now.weather
        // console.log(temp, weather)
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
        // console.log('1')    
        //显示未来7天天气
        let forecast = result.forecast
        //获取当前时间 小时
        let nowHour = new Date().getHours()
        //渲染未来几小时天气预报
        let hourlyWeather = []
        // console.log('2')
        for (var i = 0; i < 24; i += 3) {
            // console.log('3')
            hourlyWeather.push({
              time: (i + nowHour) % 24 + '时',
              icon: '/img/' + forecast[i / 3].weather + '-icon.png',
              temp: forecast[i / 3].temp + '°'
            })
            // console.log(forecast[i / 3].weather, temp)
        }
        hourlyWeather[0].time = '现在'
        // console.log('4')
        this.setData({
            hourlyWeather: hourlyWeather
        })
        //显示今日天气
        let date = new Date()
        this.setData({
          todayDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 今天`,
          todayTemp: `${result.today.minTemp}°-${result.today.maxTemp}°`
        })
      },
      //若callback不为空则执行callback()
      complete: () => {
        callback && callback()
      }
    })
  },
  onTapWeather(){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})