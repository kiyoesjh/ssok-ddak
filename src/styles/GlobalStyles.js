import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';

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
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  html {
    font-size: 14px;
  }
  body {
    height: 100vh;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
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
