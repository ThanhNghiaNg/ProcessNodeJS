import { useRef } from "react";
import { serverURL } from "../utils/global";
const RegisterForm = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const registerHandler = (event) => {
    event.preventDefault();
    fetch(`${serverURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      }),
    });
  };

  return (
    <form className="form-control" onSubmit={registerHandler}>
      <label>Username</label>
      <input type={"text"} ref={usernameRef}></input>
      <label>Password</label>
      <input type={"password"} ref={passwordRef}></input>
      <label>Confirm Password</label>
      <input type={"password"} ref={confirmPasswordRef}></input>
      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
