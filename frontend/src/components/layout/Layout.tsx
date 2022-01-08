import Footer from "@components/Footer";
import Navbar from "@components/navbar/Navbar";
import Wrapper from "./Wrapper";

const Layout = ({ children }: any): JSX.Element => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
};

export default Layout;
