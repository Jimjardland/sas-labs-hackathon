import React from 'react';
import styled from 'styled-components';
import UiStore from '../stores/UiStore';

const Wrapper = styled.div`
  color: white;
  position: fixed;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
`;

class RandomDestination extends React.Component {
  render() {
    return <Wrapper onClick={UiStore.randomDestination}>random</Wrapper>;
  }
}

export default RandomDestination;
