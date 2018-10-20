import React from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import emitter from '../uiEmitter';
import { findDOMNode } from 'react-dom';
import once from 'lodash/once';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 100px;
  z-index: 50;
  color: white;
  transform: translateX(-50%);
  text-align: center;

  @media (max-width: 730px) {
    top: 20px;
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  opacity: 0;

  @media (max-width: 730px) {
    font-size: 28px;
  }
`;

const Text = styled.p`
  font-size: 20px;
  opacity: 0;
`;

class Intro extends React.Component {
  title = React.createRef();
  text = React.createRef();

  show = () => {
    anime
      .timeline({ loop: false })
      .add({
        targets: findDOMNode(this.title.current),
        opacity: [0, 1],
        translateY: [-20, 0]
      })
      .add({
        targets: findDOMNode(this.text.current),
        opacity: [0, 1],
        translateY: [-20, 0],
        offset: '-=450',
        complete: () => {
          setTimeout(() => {
            this.hide();
          }, 3000);
        }
      });
  };

  hide = once(() => {
    anime({
      targets: findDOMNode(this.title.current),
      opacity: [1, 0],
      translateY: [0, -20]
    });
    anime({
      targets: findDOMNode(this.text.current),
      opacity: [1, 0],
      translateY: [0, -20]
    });
  });

  componentDidMount() {
    emitter.on('showHeader', this.show);
    emitter.on('mapTouched', this.hide);
  }

  componentWillUnmount() {
    emitter.off('showHeader', this.show);
    emitter.off('mapTouched', this.hide);
  }

  render() {
    return (
      <Container>
        <Title innerRef={this.title}>Lågpriskalender</Title>
        <Text innerRef={this.text}>Det ska vara kul att resa</Text>
      </Container>
    );
  }
}

export default Intro;
