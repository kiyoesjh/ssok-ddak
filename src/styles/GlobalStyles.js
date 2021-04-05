import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: inherit;
  }
  html {
    font-size: 14px;
  }
  body {
    height: 100vh;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
  }
  button {
    cursor: pointer;
  }
  button, input {
    background: none;
    border: 0;
    border-radius: 0;
    padding: 0;
    margin: 0;
    font: inherit;
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
