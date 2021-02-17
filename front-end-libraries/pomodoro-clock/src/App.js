import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
    this.audio = React.createRef();

    this.handleReset = this.handleReset.bind(this);
    this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
    this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
    this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
    this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
    this.state = {
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    };
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);

      this.setState({
        isPlaying: false,
      });
    } else {
      this.setState({
        isPlaying: true,
      });

      this.loop = setInterval(() => {
        const {
          clockCount,
          currentTimer,
          breakCount,
          sessionCount,
        } = this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
          });

          this.audio.current.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };

  handleReset() {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    });

    clearInterval(this.loop);
    this.audio.current.pause();
    this.audio.current.currentTime = 0;
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  handleBreakIncrease() {
    const { breakCount, currentTimer, isPlaying } = this.state;

    if (breakCount < 60) {
      if (!isPlaying && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount + 1,
          clockCount: (breakCount + 1) * 60,
        });
      } else {
        this.setState({
          breakCount: breakCount + 1,
        });
      }
    }
  }
  handleBreakDecrease() {
    const { breakCount, isPlaying, currentTimer } = this.state;

    if (breakCount > 1) {
      if (!isPlaying && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount - 1,
          clockCount: (breakCount - 1) * 60,
        });
      } else {
        this.setState({
          breakCount: breakCount - 1,
        });
      }
    }
  }
  handleSessionIncrease() {
    const { sessionCount, currentTimer, isPlaying } = this.state;

    if (sessionCount < 60) {
      if (!isPlaying && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount + 1,
          clockCount: (sessionCount + 1) * 60,
        });
      } else {
        this.setState({
          sessionCount: sessionCount + 1,
        });
      }
    }
  }
  handleSessionDecrease() {
    const { sessionCount, currentTimer, isPlaying } = this.state;

    if (sessionCount > 1) {
      if (!isPlaying && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount - 1,
          clockCount: (sessionCount - 1) * 60,
        });
      } else {
        this.setState({
          sessionCount: sessionCount - 1,
        });
      }
    }
  }

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying,
    } = this.state;
    const breakProps = {
      title: "Break",
      count: breakCount,
      handleIncrease: this.handleBreakIncrease,
      handleDecrease: this.handleBreakDecrease,
    };

    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleIncrease: this.handleSessionIncrease,
      handleDecrease: this.handleSessionDecrease,
    };

    return (
      <div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container">
          <h1 id="timer-label">{currentTimer}</h1>
          <span id="time-left">{this.convertToTime(clockCount)}</span>
          <div className="flex">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <i className={`fas fa-${isPlaying ? "pause" : "play"}`}></i>
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i className="fas fa-sync"></i>
            </button>
          </div>
        </div>
        <audio
          ref={this.audio}
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          preload="auto"
        ></audio>
      </div>
    );
  }
}

export default App;

const SetTimer = ({ title, handleIncrease, handleDecrease, count }) => {
  const id = title.toLowerCase();
  return (
    <div className="timer-container">
      <h1 id={`${id}-label`}>{title} Length</h1>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={handleDecrease}>
          <i className="fas fa-minus"></i>
        </button>
        <span id={`${id}-length`}>{count}</span>
        <button id={`${id}-increment`} onClick={handleIncrease}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};
