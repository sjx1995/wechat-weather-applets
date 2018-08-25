//id对应转换星期
const weekName = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({
  onLoad(){
    this.getNow()
  },
  onPullDownRefresh(){
    this.getNow(() =>{
      wx.stopPullDownRefresh()
    })
  },
  data: {
    forecastItem: [],
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '北京市',
        time: new Date().getTime()
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.forecastWeatherWeekly(result)
        },
      complete: ()=> {
        callback && callback()
      }
    })
  },
  forecastWeatherWeekly(result){
    let forecastItem = []
    for (var i=0; i<7; i++) {
      let date = new Date()
      date.setDate(date.getDate() + i)
      forecastItem.push({
        week: weekName[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`,
        temp: `${result[i].minTemp}°-${result[i].maxTemp}°`,
        srcIcon: '/img/' + result[i].weather + '-icon.png'
      })
    }
    forecastItem[0].week = '今天'
    this.setData({
      forecastItem
    })
  }
})