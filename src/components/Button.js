import React from 'react';
import styled from 'styled-components';
import { primaryColor, secondaryColor } from '../vars';

const StyledButton = styled.button`
  text-transform: uppercase;
  background-color: ${({ inverted }) =>
    inverted ? secondaryColor : primaryColor};
  color: ${({ inverted }) => (inverted ? primaryColor : secondaryColor)};

  padding: 10px 16px;
  border-radius: 30px;
  border: none;
  outline: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease,
    background-color 0.3s ease;
  border: 2px solid transparent;
  min-width: 120px;
  text-align: center;

  @media (min-width: 730px) {
    margin-left: ${({ marginLeft }) => (marginLeft ? '20px' : 0)};
  }

  &:hover {
    background-color: ${({ inverted }) =>
      !inverted ? secondaryColor : primaryColor};
    color: ${({ inverted }) => (!inverted ? primaryColor : secondaryColor)};
    border-color: ${({ inverted }) =>
      !inverted ? primaryColor : secondaryColor};
  }
`;

class Button extends React.Component {
  render() {
    const { text, inverted, onClick, marginLeft } = this.props;

    return (
      <StyledButton
        inverted={inverted}
        marginLeft={marginLeft}
        onClick={onClick}
      >
        {text}
      </StyledButton>
    );
  }
}

export default Button;
