import { Global, css } from "@emotion/react";

const globalStyle = css`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-family: "Poppins", sans-serif;
    color: ${({ theme }) => theme.typography.black};
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  body {
    height: 100%;
    min-height: 100%;
  }
  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: ${(props) => props.theme.bg};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }

  textarea:focus,
  input:focus,
  button:focus {
    outline: none;
  }

  input,
  textarea {
    font-size: inherit;
    font-family: inherit;
    &::placeholder {
      opacity: 0.7;
    }
  }
  button,
  svg {
    cursor: pointer;
  }
  .arrow-down-rotate {
    transition: transform 0.2s ease-in-out;
  }
`;

const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;
