import "./Navbar.css";
import NavbarList from "./NavbarList";
import Container from "../UI/Container";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const Data = require("../../data/navBar.json");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // handle logout
  const logoutHandler = (event) => {
    event.preventDefault();
    authCtx.logout();
    console.log(authCtx);
    navigate("/login");
    // Promise.all().then(() => {

    // });
  };
  return (
    <Container className="navbar">
      <div className="container-navbar">
        <div className="top-nav">
          <label>
            <Link to="/">Booking Website</Link>
          </label>
          {!authCtx.isLoggedIn && (
            <div>
              <button>
                <Link to="/sign-up">Sign up</Link>
              </button>
              <button>
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
          {authCtx.isLoggedIn && (
            <div>
              <button>
                <Link to="/transactions">Transactions</Link>
              </button>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          )}
        </div>
        <div className="bottom-nav">
          <NavbarList data={Data} />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
