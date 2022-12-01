import NavBar from "./NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Layout;
