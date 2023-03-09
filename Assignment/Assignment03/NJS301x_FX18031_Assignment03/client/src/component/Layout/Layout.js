import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LiveChat from "../LiveChat/LiveChat";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className={classes.wrapper}>{props.children}</div>

      <Footer />
      <LiveChat />
    </div>
  );
};

export default Layout;
