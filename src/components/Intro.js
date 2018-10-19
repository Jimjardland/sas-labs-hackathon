import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 100px;
  z-index: 50;
  color: white;
  transform: translateX(-50%);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Text = styled.p`
  font-size: 20px;
`;

class Intro extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <Title>Lågpriskalender</Title>
        <Text>Det ska vara kul att resa</Text>
      </Container>
    );
  }
}

export default Intro;
