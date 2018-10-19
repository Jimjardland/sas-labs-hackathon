import React from 'react';
import Typed from 'typed.js';
import t from '../locale';
import styled from 'styled-components';

const strings = [t('example1'), t('example2'), t('example3')];

const Container = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
`;

class ExampleSenteces extends React.Component {
  target = React.createRef();

  state = {
    started: false
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.target.current) {
        new Typed(this.target.current, { strings, loop: true, typeSpeed: 40 });
        this.setState({ started: true });
      }
    }, 3500);
  }

  render() {
    return (
      <Container>
        {!this.state.started && t('input.start')}
        <span ref={this.target} />
      </Container>
    );
  }
}

export default ExampleSenteces;
