import classes from "./AuthForm.module.css";

import React from "react";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/global";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthForm(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: `${serverUrl}/login`,
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          role: ["admin", "consultant"],
        }),
      },
      (data) => {
        dispatch(authActions.login({ token: data.token, role: data.role }));
        if (data.role === "admin") {
          navigate("/");
        }else{
          navigate("/chat");
        }
      }
    );
  };

  return (
    <form className={classes.form}>
      <div className={classes["input-controls"]}>
        <label>Email</label>
        <input
          className="form-control"
          value={email}
          onChange={(event) => {
            setemail(event.target.value);
          }}
        ></input>
      </div>
      <div className={classes["input-controls"]}>
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(event) => {
            setpassword(event.target.value);
          }}
        ></input>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className={classes["actions-controls"]}>
        <button className="btn btn-outline-success" onClick={submitHandler}>
          Login
        </button>
        <button className="btn btn-outline-info" type="reset">
          Reset
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
