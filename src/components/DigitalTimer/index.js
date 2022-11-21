// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isRunning: false, defaultTimer: 25, inSeconds: 0}

  increaseTimer = () => {
    this.setState(prev => ({defaultTimer: prev.defaultTimer + 1}))
  }

  decreaseTimer = () => {
    const {defaultTimer} = this.state
    if (defaultTimer > 1) {
      this.setState(prevState => ({defaultTimer: prevState.defaultTimer - 1}))
    }
  }

  tick = () => {
    this.setState(prev1 => ({inSeconds: prev1.inSeconds + 1}))
  }

  startTimer = () => {
    this.setState({isRunning: true})
    this.timerId = setInterval(this.tick, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
    this.setState({isRunning: false})
  }

  resetTimer = () => {
    const {defaultTimer} = this.state
    clearInterval(this.timerId)
    this.setState({defaultTimer, inSeconds: 0, isRunning: false})
  }

  isTimerCompleted = () => {
    const {inSeconds, defaultTimer} = this.state
    const timeElapsed = defaultTimer * 60 === inSeconds
    if (timeElapsed) {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    }
  }

  renderSeconds = () => {
    this.isTimerCompleted()
    const {defaultTimer, inSeconds} = this.state
    const remainingTime = defaultTimer * 60 - inSeconds
    const seconds = Math.floor(remainingTime % 60)
    if (remainingTime <= 0) {
      clearInterval(this.timerId)
    }
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {defaultTimer, inSeconds} = this.state
    const remainingTime = defaultTimer * 60 - inSeconds
    const minutes = Math.floor(remainingTime / 60)
    if (remainingTime <= 0) {
      clearInterval(this.timerId)
    }
    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isRunning, defaultTimer} = this.state
    const seconds = this.renderSeconds()
    const minutes = this.renderMinutes()

    return (
      <div className="digital-bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="header-footer">
          <div className="image-bg">
            <div className="card">
              <h1 className="timer">
                {minutes}:{seconds} <br />
                <span className="para">
                  <p>{isRunning ? 'Running' : 'Paused'}</p>
                </span>
              </h1>
            </div>
          </div>
          <div className="bottom">
            <div className="start-reset">
              <div className="start-img">
                <button
                  className="start"
                  onClick={isRunning ? this.pauseTimer : this.startTimer}
                  type="button"
                >
                  <img
                    src={
                      isRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isRunning ? 'pause icon' : 'play icon'}
                    className="image2"
                  />
                  {isRunning ? 'Pause' : 'Start'}
                </button>
              </div>

              <div className="reset-img">
                <button
                  className="reset"
                  type="button"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="image4"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="para2">Set Timer limit</p>
            <div className="footer">
              <button
                className="minus"
                type="button"
                onClick={this.decreaseTimer}
                disabled={isRunning}
              >
                -
              </button>
              <div className="footer-bg">
                <p className="para3">{defaultTimer}</p>
              </div>
              <button
                className="plus"
                type="button"
                onClick={this.increaseTimer}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
