import { Global, css } from "@emotion/react";

const GlobalStyles = (): JSX.Element => {
  return (
    <Global
      styles={css`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        html {
          height: 100%;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
        }
        body {
          height: 100%;
          min-height: 100%;
        }
        html,
        body {
          font-family: "Poppins", sans-serif;
        }
        #__next {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
      `}
    />
  );
};

export default GlobalStyles;
