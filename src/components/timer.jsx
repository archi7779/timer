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

  componentDidMount() {}

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
              timer: new Date(Date.now() - this.state.startTime),
              mode: 'play',
            });
          }, 100);
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
            {timer.getMinutes()}:{timer.getSeconds()}:{parseInt(timer.getMilliseconds() / 100)}
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
