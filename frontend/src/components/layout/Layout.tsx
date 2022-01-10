import BottomNav from "@components/BottomNav";
import Footer from "@components/Footer";
import Navbar from "@components/navbar/Navbar";
import Wrapper from "./Wrapper";
import { useAuth } from "@context/authContext";

const Layout = ({ children }: any): JSX.Element => {
  const { currentUser } = useAuth(),
    { isLoggedIn, isSendingRequest } = currentUser;
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>

      {isLoggedIn ? <BottomNav /> : <Footer />}
    </>
  );
};

export default Layout;
