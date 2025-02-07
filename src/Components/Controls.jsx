import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: ${({ primary }) => (primary ? "#4CAF50" : "#f44336")};
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#45a049" : "#d32f2f")};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const Controls = ({ isRunning, onStartPause, onReset }) => {
  return (
    <ButtonContainer>
      <StyledButton primary onClick={onStartPause}>
        {isRunning ? "Пауза" : "Старт"}
      </StyledButton>
      <StyledButton onClick={onReset}>Сброс</StyledButton>
    </ButtonContainer>
  );
};

export default Controls;

Controls.propTypes = {
  isRunning: PropTypes.func.isRequired,
  onStartPause: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
