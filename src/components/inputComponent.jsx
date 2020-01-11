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
  handleRangeInputChange,
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
          onChange={handleRangeInputChange}
          disabled={!!time}
        />
        <output htmlFor="test" name="level">
          {inputMin && `${inputMin}min`} {inputSec && `${inputSec}sec`}
        </output>
      </div>
    </>
  );
}

InputComponents.propTypes = {
  inputError: PropTypes.string.isRequired,
  handleMinInputChange: PropTypes.func.isRequired,
  handleSecInputChange: PropTypes.func.isRequired,
  inputMin: PropTypes.string.isRequired,
  inputSec: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  handleRangeInputChange: PropTypes.func.isRequired,
  rangeInputValue: PropTypes.number.isRequired,
};
export default InputComponents;
