import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #ask-chatgpt-container, #ask-chatgpt-popup-container {
    font-family: Open-Sans, Helvetica, sans-serif;
  }
  #ask-chatgpt-popup-container{
    background-color: unset;
    overflow: auto;
    padding: 10px 20px;
    margin: 0;
    border-radius: 8px;
    width: 300px;
  }
`;

export default GlobalStyle;
