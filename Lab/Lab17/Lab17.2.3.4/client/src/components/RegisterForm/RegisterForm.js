import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../utils/global";
import classes from "../LoginForm/auth.module.css";
const RegisterForm = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const registerHandler = (event) => {
    event.preventDefault();
    (async function sendRequest() {
      const respone = await fetch(`${serverURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usernameRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
        }),
      });
      const data = await respone.json();
      console.log(data);
      if (respone.status !== 200) {
        setErrorMsg(data.Message);
      } else {
        if (errorMsg) {
          setErrorMsg("");
          navigate("/login");
        }
      }
    })();
  };

  return (
    <form className="form-control" onSubmit={registerHandler}>
      <label>Username</label>
      <input type={"text"} ref={usernameRef}></input>
      <label>Password</label>
      <input type={"password"} ref={passwordRef}></input>
      <label>Confirm Password</label>
      <input type={"password"} ref={confirmPasswordRef}></input>
      <p className={classes.error}>{errorMsg}</p>
      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
