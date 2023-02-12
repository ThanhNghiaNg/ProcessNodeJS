import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/AuthContext";
import classes from "./AuthForm.module.css";
import { serverURL } from "../../utils/global";
import { useNavigate } from "react-router-dom";

function AuthForm(props) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isLogin = props.login;
  const emailRef = useRef();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle sign up and login
  const authHandler = (event) => {
    event.preventDefault();
    const sendRequest = async () => {
      try {
        const respone = await fetch(
          `${serverURL}/${isLogin ? "login" : "sign-up"}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailRef.current.value, password }),
          }
        );
        const data = await respone.json();
        if (respone.status === 200) {
          if (isLogin) {
            authCtx.login(data.user);
            navigate("/");
          } else {
            navigate("/login");
            setSuccess("Sign up successfully!");
          }
        } else {
          setError(data.message);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  };
  // change Password Handler
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    setError("");
    setSuccess("");
  };

  return (
    <form className={classes.form}>
      <h3>{isLogin ? "Login" : "Sign Up"}</h3>
      <input className="form-control" type="text" ref={emailRef}></input>
      <input
        className="form-control"
        type="password"
        value={password}
        onChange={changePasswordHandler}
      ></input>
      {error && <p className={classes.error}>{error}</p>}
      {success && <p className={classes.success}>{success}</p>}
      <button onClick={authHandler}>
        {isLogin ? "Login" : "Create Account"}
      </button>
    </form>
  );
}

export default AuthForm;
