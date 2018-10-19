import React from 'react';
import styled from 'styled-components';
import { bgColor } from '../vars';
import TopBar from './TopBar';
import ProblemList from './ProblemList';

const Wrapper = styled.article`
  background-color: ${bgColor};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageWrapper = ({ children }) => (
  <Wrapper>
    <TopBar />
    <ProblemList />
    {children}
  </Wrapper>
);

export default PageWrapper;
