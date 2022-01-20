import { useAuth } from "@context/authContext";

import BottomNav from "@components/BottomNav";
import Footer from "@components/Footer";
import { Navbar } from "@components/navbar";

import MainWrapper from "./MainWrapper";

const Layout = ({ children }: any): JSX.Element => {
  const { currentUser } = useAuth(),
    { isLoggedIn, isSendingRequest } = currentUser;
  return (
    <>
      <Navbar />
      <MainWrapper>{children}</MainWrapper>

      {isLoggedIn ? <BottomNav /> : <Footer />}
    </>
  );
};

export default Layout;
