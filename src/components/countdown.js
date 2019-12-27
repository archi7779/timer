import React from 'react';
import { Button, Input, Progress } from 'antd';
import MIDISounds from 'midi-sounds-react';

export default class CountDown extends React.Component {
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
      // реакт выдает ошибку, управляемые\не управляемые компоненты. как обойти если мне на ипнутах хочется плейсхолдер иметь.
    };
  }

  RangehandleChange = ({ target }) => {
    const milisecs = target.value * 6000;
    const secsToMsecs = (milisecs % 6000) / 60;
    this.setState({
      rangeInputValue: target.value,
      inputMin: parseInt(milisecs / 6000 , 10),
      inputSec: secsToMsecs,
    });
  };

  callback = () => {
    //вот тут не работает {time}
    const { time } = this.state
    this.countDown = setInterval(() => {
      if (time === 0) {
        clearInterval(this.countDown);
        // ++sound
        this.midiSounds.playChordNow(3, [60], 2.5);
      }
      this.setState({
        time: this.state.time - 100,
        timer: new Date(this.state.time - 10800000),
      });
    }, 100);
  };

  handleStart = () => {
    const { inputMin, inputSec } = this.state;
    // как сделать так, чтобы эта конструкция(выше) работа и при вложенности, а то не работает
    if (inputMin > 720) {
      this.setState({ error: true });
      alert('max time is 720 min');
      return;
    }
    if (inputMin === undefined && inputSec === undefined) {
      this.setState({ error: true });
      alert('set time up!');
      return;
    }
    if (inputSec === undefined && inputMin !== undefined) {
      this.setState(
        {
          time: inputMin * 60000,
          percent: inputMin * 60000,
          error: false,
        },
        this.callback
      );
    } else if (inputSec !== undefined && inputMin === undefined) {
      this.setState(
        {
          time: inputSec * 1000,
          percent: inputSec * 1000,
          error: false,
        },
        this.callback
      );
    } else {
      this.setState(
        {
          time: inputMin * 60000 + inputSec * 1000,
          percent: inputMin * 60000 + inputSec * 1000,
          error: false,
        },
        this.callback
      );
    }
  };

  handleReset = () => {
    clearInterval(this.countDown);
    this.setState({
      // почему-то не получается дать им undefined чтобы инпуты показали плейсхолдеры
      inputMin: 0,
      inputSec: 0,
      timer: new Date(-10800000),
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.dataset.time]: target.value,
    });
  };

  progressBar = () => {
    const { percent, time } = this.state;
    return time
      ? Math.round((100 * (percent - time)) / percent)
      : 0;
  };

  render() {
    const { timer, inputMin, inputSec, rangeInputValue, error } = this.state;
    const inputEror = error ? 'errorTest' : 'ok';
    const soundStyles = {
      display: 'none',
      zIndex: -1000,
    };
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
          />
          <Input
            className="countDonwInput timeInput"
            type="text"
            placeholder="enter seconds"
            data-time="inputSec"
            onChange={this.handleInputChange}
            value={inputSec}
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
          />
          <output htmlFor="test" name="level">
            {rangeInputValue}
          </output>
        </div>
        <div>
          {timer.getHours()}:{timer.getMinutes()}:{timer.getSeconds()}:
          {parseInt(timer.getMilliseconds() / 100, 10)}
        </div>

        <Button type="primary" onClick={this.handleStart}>
          Start
        </Button>
        <Button type="primary" onClick={this.handleReset}>
          Reset
        </Button>
        <Progress percent={this.progressBar()} />
        <MIDISounds
          style={soundStyles}
          ref={ref => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[3]}
        />
      </div>
    );
  }
}
