import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import classes from "./Layout.module.css";
function Layout(props) {
  return (
    <>
      <Navbar />
      <div className={classes["wrap-body"]}>{props.children}</div>

      <Footer />
    </>
  );
}

export default Layout;
