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
.mapboxgl-ctrl-bottom-right {
  display:none;
}
html,body {
  background: ${bgColor};
  font-family:'ScandinavianNewRegular' , 'Helvetica',sans-serif;
  color: ${textColor};
  font-size: 16px;
  line-height: 1.5;
  overflow:hidden;
}

h1,h2,h3,h4 {
  font-weight: bold;
  text-transform: uppercase;
  font-family:'ScandinavianNew', 'Helvetica',sans-serif;

}

input {
  border: none
}

@font-face {
  font-family: 'ScandinavianNew';
  src: url('/fonts/ScandinavianNew-Bold.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-Bold.woff') format('woff'),
      url('/fonts/ScandinavianNew-Bold.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'ScandinavianNewRegular';
  src: url('/fonts/ScandinavianNew-Regular.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-Regular.woff') format('woff'),
      url('/fonts/ScandinavianNew-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'ScandinavianNew';
  src: url('/fonts/ScandinavianNew-Medium.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-Medium.woff') format('woff'),
      url('/fonts/ScandinavianNew-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'ScandinavianNew';
  src: url('/fonts/ScandinavianNew-Italic.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-Italic.woff') format('woff'),
      url('/fonts/ScandinavianNew-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'ScandinavianNew';
  src: url('/fonts/ScandinavianNew-BoldItalic.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-BoldItalic.woff') format('woff'),
      url('ScandinavianNew-BoldItalic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'ScandinavianNew';
  src: url('/fonts/ScandinavianNew-MediumItalic.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-MediumItalic.woff') format('woff'),
      url('/fonts/ScandinavianNew-MediumItalic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'ScandinavianNew';
  src: url('/fonts/ScandinavianNew-Black.woff2') format('woff2'),
      url('/fonts/ScandinavianNew-Black.woff') format('woff'),
      url('/fonts/ScandinavianNew-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}


`;

export default Component => Component;
