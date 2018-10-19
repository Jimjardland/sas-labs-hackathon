import 'react';
import { injectGlobal } from 'styled-components';
import { bgColor, textColor } from '../vars';

injectGlobal`
* {
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: inherit;
}

html,body {
  background: ${bgColor};
  font-family: 'IBM Plex Sans', sans-serif;
  color: ${textColor};
  font-size: 16px;
  line-height: 1.5;
}

h1,h2,h3,h4 {
  font-weight: bold;
  text-transform: uppercase;
}

input {
  border: none
}

`;

export default Component => Component;
