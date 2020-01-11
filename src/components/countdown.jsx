import React from 'react';
import { Button, Progress } from 'antd';
import InputComponent from './inputComponent';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeInputValue: undefined,
      timer: new Date(0),
      inputMin: undefined,
      inputSec: undefined,
      time: undefined,
      error: false,
      percent: 0,
      mode: 'pause',
      endPoint: undefined,
    };
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  startTimer = () => {
    this.countDown = setInterval(() => {
      const { time } = this.state;
      if (time <= 0) {
        clearInterval(this.countDown);
        const audio = new Audio(
          'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'
        );
        audio.play();
        this.setState({
          inputMin: undefined,
          inputSec: undefined,
          timer: new Date(0),
          mode: 'pause',
          time: undefined,
          rangeInputValue: undefined,
          endPoint: undefined,
        });
        return;
      }
      this.setState(prevState => ({
        time: prevState.endPoint - new Date().getTime(),
        timer: new Date(prevState.time),
        mode: 'play',
      }));
    }, 1);
  };

  handleStart = () => {
    const { inputMin, inputSec, time } = this.state;
    if (time) {
      this.startTimer();
      return;
    }
    if (inputMin > 720) {
      this.setState({ error: true });
      // eslint-disable-next-line no-alert
      alert('max time is 720 min');
      return;
    }
    if (inputMin === undefined && inputSec === undefined) {
      this.setState({ error: true });
      // eslint-disable-next-line no-alert
      alert('set time up!');
      return;
    }
    if (inputSec === undefined && inputMin !== undefined) {
      const userTimeMs = inputMin * 60000;
      const endPointAsDate = new Date();
      const endPointAsMs = endPointAsDate.setMilliseconds(userTimeMs);
      this.setState(
        {
          time: inputMin * 60000,
          percent: inputMin * 60000,
          error: false,
          mode: 'play',
          endPoint: endPointAsMs,
        },
        this.startTimer
      );
    } else if (inputSec !== undefined && inputMin === undefined) {
      const userTimeMs = inputSec * 1000;
      const endPointAsDate = new Date();
      const endPointAsMs = endPointAsDate.setMilliseconds(userTimeMs);
      this.setState(
        {
          time: inputSec * 1000,
          percent: inputSec * 1000,
          error: false,
          mode: 'play',
          endPoint: endPointAsMs,
        },
        this.startTimer
      );
    } else {
      const userTimeMs = inputMin * 60000 + inputSec * 1000;
      const endPointAsDate = new Date();
      const endPointAsMs = endPointAsDate.setMilliseconds(userTimeMs);
      this.setState(
        {
          time: inputMin * 60000 + inputSec * 1000,
          percent: inputMin * 60000 + inputSec * 1000,
          error: false,
          mode: 'play',
          endPoint: endPointAsMs,
        },
        this.startTimer
      );
    }
  };

  handlePause = () => {
    clearInterval(this.countDown);
    this.setState({
      mode: 'pause',
    });
  };

  handleReset = () => {
    clearInterval(this.countDown);
    this.setState({
      inputMin: undefined,
      inputSec: undefined,
      timer: new Date(0),
      mode: 'pause',
      time: undefined,
      rangeInputValue: undefined,
    });
  };

  handleMinInputChange = ({ target }) => {
    const { inputSec } = this.state;
    this.setState({
      inputMin: target.value,
      rangeInputValue: inputSec ? +target.value + +inputSec / 60 : +target.value,
    });
  };

  handleSecInputChange = ({ target }) => {
    const { inputMin } = this.state;
    this.setState({
      inputSec: target.value,
      rangeInputValue: inputMin ? +inputMin + +target.value / 60 : +target.value / 60,
    });
  };

  handleRangeInputChange = ({ target }) => {
    const milisecs = target.value * 6000;
    const secsToMsecs = (milisecs % 6000) / 100;
    this.setState({
      rangeInputValue: target.value,
      inputMin: parseInt(milisecs / 6000, 10),
      inputSec: secsToMsecs,
    });
  };

  progressBar = () => {
    const { percent, time } = this.state;
    return time ? Math.round((100 * (percent - time)) / percent) : 0;
  };

  render() {
    const { timer, inputMin, inputSec, rangeInputValue, error, time, mode } = this.state;
    const inputError = error ? 'error' : 'ok';
    return (
      <div className="countDown">
        <h1>CountDown</h1>
        <InputComponent
          inputError={inputError}
          handleMinInputChange={this.handleMinInputChange}
          handleSecInputChange={this.handleSecInputChange}
          inputMin={inputMin}
          inputSec={inputSec}
          time={time}
          handleRangeInputChange={this.handleRangeInputChange}
          rangeInputValue={rangeInputValue}
        />
        <div className="countDownOutPut">
          {timer.getUTCHours() < 10 ? `0${timer.getUTCHours()}` : timer.getUTCHours()}ч:
          {timer.getUTCMinutes() < 10 ? `0${timer.getUTCMinutes()}` : timer.getUTCMinutes()}м:
          {timer.getUTCSeconds() < 10 ? `0${timer.getUTCSeconds()}` : timer.getUTCSeconds()}с.
          {parseInt(timer.getMilliseconds() / 10, 10) < 10
            ? `0${parseInt(timer.getMilliseconds() / 10, 10)}`
            : parseInt(timer.getMilliseconds() / 10, 10)}
          мс
        </div>

        {mode === 'pause' ? (
          <Button type="primary" onClick={this.handleStart} className="playPause">
            Start
          </Button>
        ) : (
          <Button type="primary" onClick={this.handlePause} className="playPause">
            Pause
          </Button>
        )}
        <Button type="primary" onClick={this.handleReset} className="playPause">
          Reset
        </Button>
        <Progress percent={this.progressBar()} />
      </div>
    );
  }
}
