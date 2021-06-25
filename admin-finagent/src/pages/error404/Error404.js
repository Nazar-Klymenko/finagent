import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Error404 = () => {
  return (
    <Error404Styled>
      <span>
        4<span>0</span>4
      </span>
      <h1>Sorry, we couln't find this page</h1>
      <NavLink to="/applications/all">To the main page</NavLink>
    </Error404Styled>
  );
};
export default Error404;

const Error404Styled = styled.div`
  text-align: center;
  span {
    font-size: 4rem;
    color: $LightBlue;
  }
  a {
    color: $LightBlue;
  }
`;
