import classes from "./AuthForm.module.css";
import Card from "../UI/Card";
import Error from "../Error/Error";

import React, { useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

function AuthForm(props) {
  const islogin = props.login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { error, setError, sendRequest } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    if (!email || !password || (!islogin && !name)) {
      return setError("You must fill out all information!");
    }
    const bodyRequest = islogin
      ? { email, password }
      : { email, password, name };
    sendRequest(
      {
        url: `${serverUrl}/${islogin ? "login" : "sign-up"}`,
        method: "POST",
        body: JSON.stringify(bodyRequest),
      },
      (data) => {
        setError("");
        if (islogin) {
          dispatch(authActions.login(data.token));
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    );
  };
  return (
    <Card className="w-50 mx-auto my-3">
      <form onSubmit={submitHandler}>
        {error && <Error error={error} />}
        <div className="mt-3">
          <label className="text-uppercase mb-1">your e-mail</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        {!islogin && (
          <div className="mt-3">
            <label className="text-uppercase mb-1">your name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
        )}

        <div className="mt-3">
          <label className="text-uppercase mb-1">password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button className={`btn mt-4 ${classes.submit}`} type="submit">
          {islogin ? "LOGIN" : "SIGNUP"}
        </button>
      </form>
    </Card>
  );
}

export default AuthForm;
