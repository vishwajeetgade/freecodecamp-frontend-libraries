let sessionInterval = null;
let breakInterval = null;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.audioBeepRef = React.createRef(null);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      sessionTimer: 1500,
      sessionTimerMinute: 25,
      sessionTimerSeconds: "00",
      breakTimer: 300,
      breakTimerMinute: 5,
      breakTimerSeconds: "00",
      disableControls: false,
      isBreak: false,
    };

    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleTimerPausePlay = this.handleTimerPausePlay.bind(this);
    this.handleTimerRest = this.handleTimerRest.bind(this);
    this.startSessionInterval = this.startSessionInterval.bind(this);
    this.startBreakInterval = this.startBreakInterval.bind(this);
  }

  handleBreakIncrement() {
    if (this.state.breakLength === 60) {
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      breakLength: prevState.breakLength + 1,
      breakTimer: (prevState.breakLength + 1) * 60,
      breakTimerMinute: prevState.breakLength + 1,
      breakTimerSeconds: "00",
    }));
  }
  handleBreakDecrement() {
    if (this.state.breakLength === 1) {
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      breakLength: prevState.breakLength - 1,
      breakTimer: (prevState.breakLength - 1) * 60,
      breakTimerMinute: prevState.breakLength - 1,
      breakTimerSeconds: "00",
    }));
  }
  handleSessionIncrement() {
    if (this.state.sessionLength === 60) {
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      sessionLength: prevState.sessionLength + 1,
      sessionTimer: (prevState.sessionLength + 1) * 60,
      sessionTimerMinute: prevState.sessionLength + 1,
      sessionTimerSeconds: "00",
    }));
  }
  handleSessionDecrement() {
    if (this.state.sessionLength === 1) {
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      sessionLength: prevState.sessionLength - 1,
      sessionTimer: (prevState.sessionLength - 1) * 60,
      sessionTimerMinute: prevState.sessionLength - 1,
      sessionTimerSeconds: "00",
    }));
  }

  handleTimerPausePlay() {
    clearInterval(sessionInterval);
    clearInterval(breakInterval);
    if (!this.state.disableControls) {
      if (!this.state.isBreak) {
        this.startSessionInterval();
      } else {
        this.startBreakInterval();
      }
    }
    this.setState((prevState) => ({
      ...prevState,
      disableControls: !prevState.disableControls,
    }));
    this.audioBeepRef.current.pause();
  }
  handleTimerRest() {
    clearInterval(sessionInterval);
    clearInterval(breakInterval);
    this.setState({
      disableControls: false,
      breakLength: 5,
      sessionLength: 25,
      sessionTimer: 1500,
      sessionTimerMinute: 25,
      sessionTimerSeconds: "00",
      breakTimer: 300,
      breakTimerMinute: 5,
      breakTimerSeconds: "00",
      isBreak: false,
    });
    this.audioBeepRef.current.pause();
    this.audioBeepRef.current.currentTime = 0;
  }

  startSessionInterval() {
    sessionInterval = setInterval(() => {
      if (this.state.sessionTimer <= 0 && !this.state.isBreak) {
        this.setState((prevState) => ({
          ...prevState,
          sessionTimer: (prevState.sessionLength + 1) * 60,
          sessionTimerMinute: prevState.sessionLength + 1,
          sessionTimerSeconds: "00",
          isBreak: true,
        }));
        this.audioBeepRef.current.currentTime = 0;
        this.audioBeepRef.current.play();
        clearInterval(sessionInterval);
        clearInterval(breakInterval);
        this.startBreakInterval();
      }
      this.setState((prevState) => ({
        ...prevState,
        sessionTimer: prevState.sessionTimer - 1,
        sessionTimerMinute: Math.floor((prevState.sessionTimer - 1) / 60),
        sessionTimerSeconds: (prevState.sessionTimer - 1) % 60,
      }));
    }, 1000);
  }

  startBreakInterval() {
    breakInterval = setInterval(() => {
      if (this.state.breakTimer <= 0 && this.state.isBreak) {
        this.setState((prevState) => ({
          ...prevState,
          breakTimer: (prevState.breakLength + 1) * 60,
          breakTimerMinute: prevState.breakLength + 1,
          breakTimerSeconds: "00",
          isBreak: false,
        }));
        this.audioBeepRef.current.currentTime = 0;
        this.audioBeepRef.current.play();
        clearInterval(sessionInterval);
        clearInterval(breakInterval);
        this.startSessionInterval();
      }
      this.setState((prevState) => ({
        ...prevState,
        breakTimer: prevState.breakTimer - 1,
        breakTimerMinute: Math.floor((prevState.breakTimer - 1) / 60),
        breakTimerSeconds: (prevState.breakTimer - 1) % 60,
      }));
    }, 1000);
  }

  render() {
    return (
      <div className="box">
        <h1>25 + 5 Clock</h1>
        <br />
        <div className="controls">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className="controls--length">
              <button
                id="break-decrement"
                onClick={this.handleBreakDecrement}
                disabled={this.state.disableControls}
              >
                <i className="fa fa-arrow-down fa-2x"></i>
              </button>
              <p id="break-length">{this.state.breakLength}</p>
              <button
                id="break-increment"
                onClick={this.handleBreakIncrement}
                disabled={this.state.disableControls}
              >
                <i className="fa fa-arrow-up fa-2x"></i>
              </button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div className="controls--length">
              <button
                id="session-decrement"
                onClick={this.handleSessionDecrement}
                disabled={this.state.disableControls}
              >
                <i className="fa fa-arrow-down fa-2x"></i>
              </button>
              <p id="session-length">{this.state.sessionLength}</p>
              <button
                id="session-increment"
                onClick={this.handleSessionIncrement}
                disabled={this.state.disableControls}
              >
                <i className="fa fa-arrow-up fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="timer-container">
          <div className="timer-body">
            <h3 id="timer-label">{this.state.isBreak ? "Break" : "Session"}</h3>
            <div>
              <p id="time-left" style={{ fontSize: "3.5rem" }}>
                {this.state.isBreak
                  ? `${
                      this.state.breakTimerMinute < 10
                        ? `0${this.state.breakTimerMinute}`
                        : this.state.breakTimerMinute
                    }:${
                      this.state.breakTimerSeconds < 10 &&
                      typeof this.state.breakTimerSeconds !== "string"
                        ? `0${this.state.breakTimerSeconds}`
                        : this.state.breakTimerSeconds
                    }`
                  : `${
                      this.state.sessionTimerMinute < 10
                        ? `0${this.state.sessionTimerMinute}`
                        : this.state.sessionTimerMinute
                    }:${
                      this.state.sessionTimerSeconds < 10 &&
                      typeof this.state.sessionTimerSeconds !== "string"
                        ? `0${this.state.sessionTimerSeconds}`
                        : this.state.sessionTimerSeconds
                    }`}
              </p>
            </div>
            <div className="timer-controls">
              <button id="start_stop" onClick={this.handleTimerPausePlay}>
                <i className="fa fa-play fa-2x"></i>
                <i className="fa fa-pause fa-2x"></i>
              </button>
              <button id="reset" onClick={this.handleTimerRest}>
                <i className="fa fa-refresh fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={this.audioBeepRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
