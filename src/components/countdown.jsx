import React from 'react';
import { Button, Input, Progress } from 'antd';

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
    };
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  RangehandleChange = ({ target }) => {
    const milisecs = target.value * 6000;
    const secsToMsecs = (milisecs % 6000) / 60;
    this.setState({
      rangeInputValue: target.value,
      inputMin: parseInt(milisecs / 6000, 10),
      inputSec: secsToMsecs,
    });
  };

  startTimer = () => {
    this.countDown = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.time === 0) {
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
        });
        return;
      }
      this.setState(prevState => ({
        time: prevState.time - 10,
        timer: new Date(prevState.time),
        mode: 'play',
      }));
    }, 10);
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
      this.setState(
        {
          time: inputMin * 60000,
          percent: inputMin * 60000,
          error: false,
          mode: 'play',
        },
        this.startTimer
      );
    } else if (inputSec !== undefined && inputMin === undefined) {
      this.setState(
        {
          time: inputSec * 1000,
          percent: inputSec * 1000,
          error: false,
          mode: 'play',
        },
        this.startTimer
      );
    } else {
      this.setState(
        {
          time: inputMin * 60000 + inputSec * 1000,
          percent: inputMin * 60000 + inputSec * 1000,
          error: false,
          mode: 'play',
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

  handleInputChange = ({ target }) => {
    this.setState({
      [target.dataset.time]: target.value,
    });
  };

  progressBar = () => {
    const { percent, time } = this.state;
    return time ? Math.round((100 * (percent - time)) / percent) : 0;
  };

  render() {
    const { timer, inputMin, inputSec, rangeInputValue, error, time } = this.state;
    const inputEror = error ? 'errorTest' : 'ok';
    return (
      <div className="countDown">
        <h1>CountDown</h1>
        <div>
          <Input
            className={`countDonwInput + timeInput + ${inputEror}`}
            type="text"
            placeholder="enter minutes"
            data-time="inputMin"
            onChange={this.handleInputChange}
            value={inputMin}
            disabled={!!time}
          />
          <Input
            className="countDonwInput timeInput"
            type="text"
            placeholder="enter seconds"
            data-time="inputSec"
            onChange={this.handleInputChange}
            value={inputSec}
            disabled={!!time}
          />
        </div>
        <div className="rangeInputWrapper">
          <Input
            className=""
            type="range"
            name="test"
            min="0"
            max="60"
            step="0.25"
            value={rangeInputValue}
            onChange={this.RangehandleChange}
            disabled={!!time}
          />
          <output htmlFor="test" name="level">
            {rangeInputValue}
          </output>
        </div>
        <div className="countDownOutPut">
          {timer.getUTCHours() < 10 ? `0${timer.getUTCHours()}` : timer.getUTCHours()}ч:
          {timer.getUTCMinutes() < 10 ? `0${timer.getUTCMinutes()}` : timer.getUTCMinutes()}м:
          {timer.getUTCSeconds() < 10 ? `0${timer.getUTCSeconds()}` : timer.getUTCSeconds()}с.
          {parseInt(timer.getMilliseconds() / 10, 10) < 10
            ? `0${parseInt(timer.getMilliseconds() / 10, 10)}`
            : parseInt(timer.getMilliseconds() / 10, 10)}
          мс
        </div>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {this.state.mode === 'pause' ? (
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
