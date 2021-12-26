import { useEffect } from "react";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useHistory } from "react-router-dom";

import { useNotifications } from "@context/notificationContext";

const useStyles = makeStyles({
  root: {
    color: "#7d7d7d",
  },
});

const Notifications = () => {
  const history = useHistory();
  const classes = useStyles();

  const { newNotifications, checkNotifications } = useNotifications();

  useEffect(() => {
    checkNotifications();
  }, [checkNotifications]);

  return (
    <NotiticationsStyled
      className={classes.root}
      onClick={() => {
        history.push("/notifications");
      }}
    >
      {newNotifications && <span className="new-notifications"></span>}
      {/* <Message width="22" height="22" /> */}
      <NotificationsNoneRoundedIcon />
    </NotiticationsStyled>
  );
};

export default Notifications;

const NotiticationsStyled = styled("div")`
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
    background: ${({ theme }) => theme.palette.primary.main};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    padding: 0px 4px;
  }
`;
