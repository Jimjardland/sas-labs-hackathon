import React from 'react';
import styled from 'styled-components';
import { lighest } from '../vars';
import UiStore from '../stores/UiStore';

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 50;
  text-align: right;
`;

const Name = styled.div``;

const Points = styled.div``;

class User extends React.Component {
  render() {
    return (
      <Wrapper>
        <Name>Jan Carlzon</Name>
        <Points>EuroBonus poäng: {UiStore.user.points}</Points>
      </Wrapper>
    );
  }
}

export default User;
