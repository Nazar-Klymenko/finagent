import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

const useStyles = makeStyles({
  root: {
    color: "#7d7d7d",
  },
});

const Notifications = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <NotiticationsStyled
      className={classes.root}
      onClick={() => {
        history.push("/notifications");
      }}
    >
      {/* <Message width="22" height="22" /> */}
      <NotificationsNoneRoundedIcon />
    </NotiticationsStyled>
  );
};

export default Notifications;

const NotiticationsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  margin: 0 8px;
  .new-notifications {
    height: 8px;
    width: 8px;
    border-radius: 999px;
    position: absolute;
    top: 0px;
    right: 4px;
    background: ${({ theme }) => theme.blue};
  }

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: 0px 4px;
  }
`;
