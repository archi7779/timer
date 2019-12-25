import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Button, Input } from 'antd';
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
      // реакт выдает ошибку, управляемые\не управляемые компоненты. как обойти если мне на ипнутах хочется плейсхолдер иметь.
    };
  }

  RangehandleChange = ({ target }) => {
    const milisecs = target.value * 6000;
    const test = (milisecs % 6000) / 60;
    this.setState({
      rangeInputValue: target.value,
      inputMin: parseInt(milisecs / 6000),
      inputSec: test,
    });
  };

  handleStart = () => {
    const {inputMin, inputSec, time} = this.state;
    if (inputMin > 720) {
      this.setState({ error: true });
      alert('max time is 720 min');
      return;
    }

    if (inputSec === undefined && inputMin !== undefined) {
      this.setState(
        {
          time: inputMin * 60000,
          error: false,
        },
        () => {
          this.countDown = setInterval(() => {
            if (time === 0) {
              clearInterval(this.countDown);
              // ++sound
              this.midiSounds.playChordNow(3, [60], 2.5);
            }
            this.setState({
              time: time - 100,
              timer: new Date(time - 10800000),
            });
          }, 100);
        }
      );
    } else if (inputSec !== undefined && inputMin === undefined) {
      this.setState(
        {
          time: inputSec * 1000,
        },
        () => {
          this.countDown = setInterval(() => {
            if (time === 0) {
              clearInterval(this.countDown);
              // ++sound
              this.midiSounds.playChordNow(3, [60], 2.5);
            }
            this.setState({
              time: time - 100,
              timer: new Date(time - 10800000),
            });
          }, 100);
        }
      );
    } else {
      this.setState(
        {
          time: inputMin * 60000 + inputSec * 1000,
        },
        () => {
          this.countDown = setInterval(() => {
            if (time === 0) {
              clearInterval(this.countDown);
              // ++sound
              this.midiSounds.playChordNow(3, [60], 2.5);
            }
            this.setState({
              time: time - 100,
              timer: new Date(time - 10800000),
            });
          }, 100);
        }
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

  render() {
    const { timer, inputMin, inputSec, rangeInputValue, error } = this.state;
    const inputEror = error ? 'errorTest' : 'ok';
    const soundStyles = {
      display: 'none',
      zIndex: -1000,
    };
    return (
      <div className="">
        <div>
          <Input
            className="countDonwInput"
            type="range"
            name="test"
            min="0"
            max="60"
            step="0.25"
            value={rangeInputValue}
            onChange={this.RangehandleChange}
          />
          <output htmlFor="test" name="level">
            {rangeInputValue}min
          </output>
        </div>
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

        <div>
          {timer.getHours()}:{timer.getMinutes()}:{timer.getSeconds()}:
          {parseInt(timer.getMilliseconds() / 100)}
        </div>

        <Button type="primary" onClick={this.handleStart}>
          Start
        </Button>
        <Button type="primary" onClick={this.handleReset}>
          Reset
        </Button>
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
