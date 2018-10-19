import anime from 'animejs';
import React from 'react';
import styled from 'styled-components';
import t from '../locale';
import { primaryColor } from '../vars';
import { findDOMNode } from 'react-dom';
import UiStore from '../stores/UiStore';
import emitter from '../uiEmitter';

const Title = styled.h2`
  font-size: 35px;
  color: ${primaryColor};
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: 800px) {
    font-size: 45px;
  }

  @media (min-width: 1200px) {
    font-size: 60px;
  }
`;

const Input = styled.input`
  padding: 10px;
  max-width: 450px;
  width: 100%;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  opacity: ${props => (props.isScreenShot ? 1 : 0)};
  position: relative;
  z-index: 2;
`;

const Text = styled.p`
  font-size: 20px;
  margin-top: 20px;

  @media (min-width: 1000px) {
    font-size: 26px;
  }
`;

class Complete extends React.Component {
  wrapper = React.createRef();

  componentDidMount() {
    anime({
      delay: 300,
      targets: findDOMNode(this.wrapper.current),
      opacity: [0, 1],
      scale: [0.7, 1],
      complete: () => {
        emitter.emit('initTopbar');
      }
    });
  }

  render() {
    const { children, problem = {} } = this.props;
    const link = `https://swedens-biggest-problem.herokuapp.com/${problem._id}`;
    return (
      <Wrapper isScreenShot={UiStore.isScreenShot} ref={this.wrapper}>
        <div>
          <Text>{t('complete.text')}:</Text>
          <Title>{problem.text}</Title>
        </div>
        {!UiStore.isScreenShot && (
          <React.Fragment>
            <Text>{t('complete.title')}</Text>
            <Input readOnly value={link} />
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default Complete;
