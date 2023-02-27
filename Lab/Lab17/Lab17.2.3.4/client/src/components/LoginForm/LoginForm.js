import { useContext, useRef, useState } from "react";
import { serverURL } from "../utils/global";
import { useNavigate } from "react-router-dom";
import classes from "./auth.module.css";
import { AuthContext } from "../../context/AuthProvider";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [message, setMessage] = useState({ error: "", success: "" });

  const loginHandler = (event) => {
    event.preventDefault();
    const sendRequest = async () => {
      const respone = await fetch(`${serverURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
        credentials: "include",
      });
      console.log(respone);
      const data = await respone.json();
      if (respone.status === 200) {
        authCtx.login(data.token);
        setMessage({ error: "", success: data.Message });
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setMessage({ error: data.Message, success: "" });
      }
    };
    sendRequest();
  };
  return (
    <form className={classes["login-form"]} onSubmit={loginHandler}>
      <div className={classes["form-control"]}>
        <div className={classes["input-controls"]}>
          <label>Username</label>
          <input type={"text"} ref={usernameRef}></input>
        </div>
        <div className={classes["input-controls"]}>
          <label>Password</label>
          <input type={"password"} ref={passwordRef}></input>
        </div>
        <p className={classes.error}>{message.error}</p>
        <p className={classes.success}>{message.success}</p>
        <button type="submit" className="btn">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
