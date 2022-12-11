import { useRef } from "react";
import { serverURL } from "../utils/global";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginHandler = (event) => {
    event.preventDefault();
    fetch(`${serverURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
      credentials: 'include',
    })
      .then((respone) => {
        if (respone.ok) {
          console.log(respone);
          navigate("/");
        }
        return respone.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <form className="login-form" onSubmit={loginHandler}>
      <div className="form-control">
        <label>Username</label>
        <input type={"text"} ref={usernameRef}></input>
        <label>Password</label>
        <input type={"password"} ref={passwordRef}></input>
        <button type="submit" className="btn">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
