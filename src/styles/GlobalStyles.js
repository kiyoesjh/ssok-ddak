import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import DancingScript from './fonts/DancingScript-SemiBold.ttf';
import RIDIBatang from './fonts/RIDIBatang.otf';

export default createGlobalStyle`
  ${reset};
  button {
    cursor: pointer;
  }
  button, input {
    background: none;
    border: 0;
    border-radius: 0;
    padding: 0;
    margin: 0;
  }
  @font-face {
    font-family: 'Dancing Script';
    src: url(${DancingScript});
  }
  @font-face {
    font-family: 'RIDIBatang';
    src: url(${RIDIBatang});
  }
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  html {
    font-size: 14px;
  }
  body {
    height: 100vh;
    /* font-size: 14px; */
    background-color: #eee;
    color: #888;
  }
  a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }
  textarea {
    padding: 0;
    margin: 0;
    border: none;
  }

`;
