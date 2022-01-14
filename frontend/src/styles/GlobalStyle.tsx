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
        html,
        body,
        #__next {
          min-height: 100%;
          height: 100%;
        }

        body,
        #__next {
          height: 100%;
        }
      `}
    />
  );
};

export default GlobalStyles;
