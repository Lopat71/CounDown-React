import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";

const ProgressDisplay = ({ currentTime, totalTime }) => {
  const progress = (currentTime / totalTime) * 100;

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};
export default ProgressDisplay;

ProgressDisplay.propTypes = {
  currentTime: PropTypes.func.isRequired,
  totalTime: PropTypes.func.isRequired,
};
