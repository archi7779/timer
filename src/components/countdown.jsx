import React from 'react';
import { Button, Input, Progress } from 'antd';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeInputValue: undefined,
      // не знал как еще избавиться от 3 часов разницы из-за часовых поясов
      timer: new Date(-10800000),
      inputMin: undefined,
      inputSec: undefined,
      time: undefined,
      error: false,
      percent: 0,
      mode: 'pause',
      disabled: false,
      // реакт выдает ошибку, управляемые\не управляемые компоненты. как обойти если мне на ипнутах хочется плейсхолдер иметь.
    };
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

  callback = () => {
    // вот тут не работает {time} = state
    this.countDown = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.time === 0) {
        clearInterval(this.countDown);
        const audio = new Audio(
          'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'
        );
        audio.play();
        this.setState({
          // почему-то не получается дать им undefined чтобы инпуты показали плейсхолдеры
          inputMin: undefined,
          inputSec: undefined,
          timer: new Date(-10800000),
          mode: 'pause',
          time: undefined,
          rangeInputValue: undefined,
          disabled: false,
        });
        return;
      }
      this.setState(prevState => ({
        time: prevState.time - 100,
        timer: new Date(prevState.time - 10800000),
        mode: 'play',
        disabled: true,
      }));
    }, 100);
  };

  handleStart = () => {
    const { inputMin, inputSec, time } = this.state;
    if (time) {
      this.callback();
      return;
    }
    // как сделать так, чтобы эта конструкция(выше) работа и при вложенности, а то не работает
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
        this.callback
      );
    } else if (inputSec !== undefined && inputMin === undefined) {
      this.setState(
        {
          time: inputSec * 1000,
          percent: inputSec * 1000,
          error: false,
          mode: 'play',
        },
        this.callback
      );
    } else {
      this.setState(
        {
          time: inputMin * 60000 + inputSec * 1000,
          percent: inputMin * 60000 + inputSec * 1000,
          error: false,
          mode: 'play',
        },
        this.callback
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
      // почему-то не получается дать им undefined чтобы инпуты показали плейсхолдеры
      inputMin: undefined,
      inputSec: undefined,
      timer: new Date(-10800000),
      mode: 'pause',
      time: undefined,
      rangeInputValue: undefined,
      disabled: false,
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
    const { timer, inputMin, inputSec, rangeInputValue, error, disabled } = this.state;
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
            disabled={disabled}
          />
          <Input
            className="countDonwInput timeInput"
            type="text"
            placeholder="enter seconds"
            data-time="inputSec"
            onChange={this.handleInputChange}
            value={inputSec}
            disabled={disabled}
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
            disabled={disabled}
          />
          <output htmlFor="test" name="level">
            {rangeInputValue}
          </output>
        </div>
        <div>
          {timer.getHours()}:{timer.getMinutes()}:{timer.getSeconds()}:
          {parseInt(timer.getMilliseconds() / 100, 10)}
        </div>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {this.state.mode === 'pause' ? (
          <Button type="primary" onClick={this.handleStart}>
            Start
          </Button>
        ) : (
          <Button type="primary" onClick={this.handlePause}>
            Pause
          </Button>
        )}

        <Button type="primary" onClick={this.handleReset}>
          Reset
        </Button>
        <Progress percent={this.progressBar()} />
      </div>
    );
  }
}
