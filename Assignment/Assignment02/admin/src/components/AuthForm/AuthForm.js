import { useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { serverURL } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import useHttp from "../../hooks/useHttp";
import { useDispatch } from "react-redux";

function AuthForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState("");
  const { error, setError, sendRequest } = useHttp();

  // handle sign up and login
  const authHandler = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: `${serverURL}/admin/login`,
        method: "POST",
        body: { email: emailRef.current.value, password },
      },
      (data) => {
        console.log(data);
        if (!error) {
          dispatch(authActions.login(data.user));
          navigate("/");
        }
      }
    );
  };
  // change Password Handler
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    setError("");
    setSuccess("");
  };

  return (
    <form className={classes.form}>
      <h3>Login</h3>
      <input className="form-control" type="text" ref={emailRef}></input>
      <input
        className="form-control"
        type="password"
        value={password}
        onChange={changePasswordHandler}
      ></input>
      <p>
        <em>Hint: both email and password is "admin"</em>
      </p>
      {error && <p className={classes.error}>{error}</p>}
      {success && <p className={classes.success}>{success}</p>}
      <button onClick={authHandler}>Login</button>
    </form>
  );
}

export default AuthForm;
