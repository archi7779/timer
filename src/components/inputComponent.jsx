import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

function InputComponents({
  inputError,
  handleMinInputChange,
  handleSecInputChange,
  inputMin,
  inputSec,
  time,
  RangehandleChange,
  rangeInputValue,
}) {
  return (
    <>
      <div>
        <Input
          className={`countDonwInput + timeInput + ${inputError}`}
          type="text"
          placeholder="enter minutes"
          data-time="inputMin"
          onChange={handleMinInputChange}
          value={inputMin}
          disabled={!!time}
        />
        <Input
          className="countDonwInput timeInput"
          type="text"
          placeholder="enter seconds"
          data-time="inputSec"
          onChange={handleSecInputChange}
          value={inputSec}
          disabled={!!time}
        />
      </div>
      <div className="rangeInputWrapper">
        <Input
          className=""
          type="range"
          min="0"
          max="60"
          step="0.25"
          value={rangeInputValue}
          onChange={RangehandleChange}
          disabled={!!time}
        />
        <output htmlFor="test" name="level">
          {inputMin && `${inputMin}min`} {inputSec && `${inputSec}sec`}
        </output>
      </div>
    </>
  );
}
InputComponents.defaultProps = {
  inputError: 'ok',
  handleMinInputChange: undefined,
  handleSecInputChange: undefined,
  inputMin: undefined,
  inputSec: undefined,
  time: undefined,
  RangehandleChange: undefined,
  rangeInputValue: undefined,
};
// без деф.Пропс - ошибка. и хз почему у меня инпуты = строки
InputComponents.propTypes = {
  inputError: PropTypes.string,
  handleMinInputChange: PropTypes.func,
  handleSecInputChange: PropTypes.func,
  inputMin: PropTypes.string,
  inputSec: PropTypes.string,
  time: PropTypes.number,
  RangehandleChange: PropTypes.func,
  rangeInputValue: PropTypes.number,
};
export default InputComponents;
