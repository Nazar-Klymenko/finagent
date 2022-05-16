import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useAuth } from "@context/authContext";

import { Navbar } from "@components/navbar";
import { Sidebar } from "@components/sidebar";

import MainWrapper from "./MainWrapper";

const Layout = ({ children }: any): JSX.Element => {
  const { currentUser } = useAuth(),
    { isLoggedIn, isSendingRequest } = currentUser;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Sidebar />
      <Navbar />
      <MainWrapper>{children}</MainWrapper>

      {/* {isLoggedIn ? md ? <BottomNav /> : <Footer /> : <Footer />} */}
    </>
  );
};

export default Layout;
