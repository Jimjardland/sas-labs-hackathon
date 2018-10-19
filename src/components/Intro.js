import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 100px;
  z-index: 50;
  color: white;
  transform: translateX(-50%);
`;

const Title = styled.h1`
  font-size: 48px;
`;

class Intro extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <Title>Lågpriskalender</Title>
      </Container>
    );
  }
}

export default Intro;
