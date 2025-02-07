import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";

const TimeSlider = ({ value, onSliderChange }) => {
  return (
    <Slider
      value={value}
      min={0}
      max={60 * 50}
      step={15}
      onChange={(event, newValue) => onSliderChange(newValue)}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => `${Math.floor(value / 60)}:${value % 60}`}
    />
  );
};

export default TimeSlider;

TimeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
};
