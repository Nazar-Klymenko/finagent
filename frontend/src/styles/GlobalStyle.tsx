import { Global, css } from "@emotion/react";
import muiTheme from "@styles/muiTheme";

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

        /* a {
          color: ${muiTheme.palette.primary.main};
          &:visited {
            color: ${muiTheme.palette.primary.main};
          }
        } */
      `}
    />
  );
};

export default GlobalStyles;
