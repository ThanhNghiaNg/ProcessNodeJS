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
    // event.preventDefault()
    authCtx.logout();
    navigate("/login");
  };
  return (
    <Container className="navbar">
      <div className="container-navbar">
        <div className="top-nav">
          <label>Booking Website</label>
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
              <button>Transaction</button>
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
