import React from 'react';
import styled from 'styled-components';
import t from '../locale';
import { primaryColor } from '../vars';

const Text = styled.p`
  color: ${primaryColor};
`;

class Intro extends React.Component {
  componentDidMount() {}

  render() {
    return <Text>{t('intro.text')}</Text>;
  }
}

export default Intro;
