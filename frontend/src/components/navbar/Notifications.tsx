import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { IconButton } from "@mui/material";
import Link from "next/link";

const Notifications = (): JSX.Element => {
  return (
    <Link href={"/notifications"} passHref>
      <IconButton sx={{ mr: "0.5rem" }}>
        <NotificationsNoneRoundedIcon />
      </IconButton>
    </Link>
  );
};
export default Notifications;
