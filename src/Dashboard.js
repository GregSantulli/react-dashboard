import React from 'react';
import moment from 'moment'
import weatherIcon from './weatherIcon'

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.fetchWeather();
    this.state ={
      time: moment()
    }
  }

  days(){
    let arr = []
    const data = this.state.payload && this.state.payload.daily.data
    if (!data) return
    for (let i = 0; i < 6; i++) {
      const dayData = data[i + 1]
      const day = moment(dayData.time * 1000)
      const src = weatherIcon(dayData.icon)
      arr.push(
        <div className="day-block" key={i} >
          <div className="date-block">
            <div>{day.format('ddd')}</div>
            <div>{day.format('Do')}</div>
          </div>  
          {weatherIcon(dayData.icon)}
          <div className="day-summary">{dayData.summary}</div>
          <div className="day-hi-low">
            <div>{Math.round(dayData.temperatureMin)}°</div>
            <div>{Math.round(dayData.temperatureMax)}°</div>
          </div>
        </div>
      )
    }
    return arr
  }

  miniIcon(name){
    const src = `/${name}.svg`
    return <img className="mini-icon" src={src}/>
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      const seconds = moment().diff(this.state.lastFetch || moment(), "seconds")
      if (seconds >= 600) {
        this.fetchWeather();
      }
      this.setState({ time: moment() })
    }, 1000);
  }

  fetchWeather(){
    fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/72e4675ee23046fb6b24a961f4deea29/40.7302,-73.9799").then(resp =>{
      resp.json().then(payload => {
        this.setState({ payload, lastFetch: moment() })
      })
    })
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  currentDate(){
    return moment().format('dddd, MMMM Do YYYY, h:mm a')
  }

  render() {

    let current = {}
    let today = {}

    if (this.state && this.state.payload) {
      current = this.state.payload.currently 
      today = this.state.payload.daily.data[0]
    }

    const seconds = this.state.time.format('ss')

    return (
      <div className="dashboard">
      
        <div className="section top">
          <div> 
            <div className="current-container">
              {weatherIcon(current.icon)}
              <div className="current-weather">
                <div className="temp-container">
                  <div className="current-temp">{Math.round(current.temperature)}°</div>
                  <div className="hi-low">
                    <div>{Math.round(today.temperatureMax)}°</div>
                    <div>{Math.round(today.temperatureMin)}°</div>
                  </div>
                </div>
                <div>{current.summary}</div>
                <div className="current-line">
                  {this.miniIcon('wi-rain-small')} {current.precipProbability}%
                </div>
                <div className="current-line">
                  {this.miniIcon('wi-humidity')} {current.humidity * 100}%
                </div>
                <div className="current-line">
                  {this.miniIcon('wi-strong-wind')} {Math.round(current.windSpeed)} mph
                </div>
                <div className="current-line">
                  {this.miniIcon('wi-horizon-alt')} {moment(today.sunriseTime * 1000).format('h:mm a')}
                </div>
                <div className="current-line">
                  {this.miniIcon('wi-horizon')} {moment(today.sunsetTime * 1000).format('h:mm a')}
                </div>
              </div>
            </div>
            <div>{today.summary}</div>
          </div>

          <div className="current-date">
            <div className="current-day">{this.state.time.format('dddd')}</div>
            <div>{this.state.time.format('MMMM Do')}</div>
            <div>{this.state.time.format('YYYY')}</div>
            <div className="clock">{this.state.time.format('h:mm')}</div>
            <div className="seconds">
              <div>{seconds[0]}</div>
              <div>{seconds[1]}</div>
            </div>
          </div>
        </div>
        <div className="section bottom">{this.days()}</div>
      </div>
    )
  }

}
