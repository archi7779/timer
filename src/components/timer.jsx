import React from 'react';
import { Button } from 'antd';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: new Date(0),
      startTime: null,
      mode: 'pause',
    };
  }

  handleReset = () => {
    clearInterval(this.timerId);
    this.setState({
      startTime: null,
      mode: 'pause',
      timer: new Date(0),
    });
  };

  handleStart = () => {
    const { timer, mode } = this.state;
    if (mode === 'pause') {
      this.setState(
        {
          startTime: new Date(Date.now() - timer),
        },
        () => {
          this.timerId = setInterval(() => {
            this.setState({
              // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
              timer: new Date(Date.now() - this.state.startTime),
              mode: 'play',
            });
          }, 10);
        }
      );
    } else {
      clearInterval(this.timerId);
      this.setState({
        startTime: null,
        mode: 'pause',
        // я ьы хотел все тернарники реализовать через оьъект с динамической дисп. дабы если что быстро через него менять все и везьде. норм?
      });
    }
  };

  render() {
    const { timer, mode } = this.state;
    return (
      // например тут нажатие на кноку можно было бы через этот объект реализовать, например.

      <div className="timer">
        <div className="timer_outPutPart">
          <h1>Timer</h1>
          <div className="timer_numbers">
            {timer.getUTCMinutes() < 10 ? `0${timer.getUTCMinutes()}` : timer.getUTCMinutes()}м:
            {timer.getUTCSeconds() < 10 ? `0${timer.getUTCSeconds()}` : timer.getUTCSeconds()}с.
            {parseInt(timer.getMilliseconds() / 10, 10) < 10
              ? `0${parseInt(timer.getMilliseconds() / 10, 10)}`
              : parseInt(timer.getMilliseconds() / 10, 10)}
            мс
          </div>
        </div>
        {mode === 'play' ? (
          <Button className="playPause" type="primary" onClick={this.handleStart}>
            Pause
          </Button>
        ) : (
          <Button className="playPause" type="primary" onClick={this.handleStart}>
            Start
          </Button>
        )}
        <Button className="playPause" type="primary" onClick={this.handleReset}>
          Reset
        </Button>
      </div>
    );
  }
}
