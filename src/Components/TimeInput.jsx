import PropTypes from "prop-types";

const TimeInput = ({ minutes, seconds, setMinutes, setSeconds, disabled }) => {
  const handleMinutesChange = (event) => {
    let value = Math.min(event.target.value, 720);
    setMinutes(value);
  };
  const handleSecondsChange = (event) => {
    let value = Math.min(event.target.value, 59);
    setSeconds(value);
  };

  return (
    <div>
      <input
        type="number"
        min="0"
        max="720"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="Минуты"
        disabled={disabled}
      />

      <input
        type="number"
        min="0"
        max="59"
        value={seconds}
        onChange={handleSecondsChange}
        placeholder="Секунды"
        disabled={disabled}
      />
    </div>
  );
};

TimeInput.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  setMinutes: PropTypes.func.isRequired,
  setSeconds: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TimeInput;
