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
    const { timer, mode, startTime } = this.state;
    if (mode === 'pause') {
      this.setState(
        {
          startTime: new Date(Date.now() - timer),
        },
        () => {
          this.timerId = setInterval(() => {
            this.setState({
              timer: new Date(Date.now() - startTime),
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
      <div>
        {timer.getMinutes()}:{timer.getSeconds()}:{parseInt(timer.getMilliseconds() / 100)}
        {mode === 'play' ? (
          <Button type="primary" onClick={this.handleStart}>
            Pause
          </Button>
        ) : (
          <Button type="primary" onClick={this.handleStart}>
            Start
          </Button>
        )}
        <Button type="primary" onClick={this.handleReset}>
          Reset
        </Button>
      </div>
    );
  }
}
