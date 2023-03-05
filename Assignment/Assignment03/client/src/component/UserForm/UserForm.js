import classes from "./UserForm.module.css";
import Button from "../UI/Button";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import { authActions } from "../../store/authSlice";

const UserForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogining = props.isLogining; //get props isLogining

  const { error, setError, isLoading, sendRequest } = useHttp(); // state for handle error message
  const [success, setSuccess] = useState(""); // state for handle success message
  const [password, setPassword] = useState(""); // state for handle user enter password

  const fullNameRef = useRef(); // ref to store user's full name
  const emailRef = useRef(); // ref to store user's email
  const phoneRef = useRef(); // // ref to store user's phone

  // Handle user change form Login or Register
  const changeFormHandler = () => {
    navigate(isLogining ? "/register" : "/login");
    setSuccess("");
    setError("");
  };

  // set entered user password
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  // handle when user submit form
  const submitHandler = (event) => {
    event.preventDefault(); // prevent reload page

    // show error if email or password is empty
    if (!emailRef.current.value) {
      setError("Email must not me empty.");
      return;
    } else if (!password) {
      setError("Password must not me empty.");
      return;
    }

    sendRequest(
      {
        url: `${serverUrl}/${isLogining ? "login" : "sign-up"}`,
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password,
          role: ["customer"],
          ...(isLogining
            ? {}
            : {
                phone: phoneRef.current.value,
                fullName: fullNameRef.current.value,
              }),
        }),
      },
      (data) => {
        if (isLogining) {
          dispatch(authActions.login({ token: data.token, name: data.name }));
          navigate("/");
        } else {
          setError("");
          setSuccess("Sign up successfully!");
          setTimeout(() => {
            setSuccess("");
            navigate("/login");
          }, 500);
        }
      }
    );
    // if user is in resigter page
    // else {
    // // change error when user do not type full name
    // if (!fullNameRef.current.value) {
    //   setError("Please enter your full name.");
    // }
    // // change error when user do not type an valid email (has to include '@')
    // else if (!emailRef.current.value.includes("@")) {
    //   setError("Please enter a valid email.");
    // }
    // // change error when user do not type a valid password (has to more than 8 characters)
    // else if (password.length <= 8) {
    //   setError("Password must have more than 8 characters.");
    // }
    // // change error when user do not type phone number
    // else if (!phoneRef.current.value) {
    //   setError("Please enter your phone number.");
    // }
    // // change error when user do not type a valid phone (only have number)
    // else if (!Number.isInteger(Number(phoneRef.current.value))) {
    //   setError("Please enter a valid phone number.");
    // }
    // // if all field is valid, handle register
    // else {
    //   // register user to store and localStorage
    //   // Clear error
    //   setError("");
    //   // change success message
    //   setSuccess("Register Successfuly!");
    //   // Go to login page after show success message 1 second
    //   setTimeout(() => {
    //     changeFormHandler();
    //   }, 1000);
    // }
    // }
  };

  return (
    <form className={classes.form}>
      <p className="fs-3 fst-italic text-center pb-2">
        Sign {!isLogining ? "Up" : "In"}
      </p>
      <div className={classes["input-controls"]}>
        {!isLogining && (
          <input type="text" placeholder="Full name" ref={fullNameRef}></input>
        )}
        <input type="email" placeholder="Email" ref={emailRef}></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={changePasswordHandler}
        ></input>

        {!isLogining && (
          <input type="text" placeholder="Phone" ref={phoneRef}></input>
        )}
      </div>
      {/* show message error if it has */}
      {error && <p className="text-danger">{error}</p>}
      {/* show message successs if register or login successfully */}
      {success && <p className="text-success">{success}</p>}
      <Button onClick={submitHandler}>SIGN {!isLogining ? "UP" : "IN"}</Button>
      <div className={classes.switch}>
        <span>{!isLogining ? "Login" : "Create an account"}</span>?{" "}
        <span onClick={changeFormHandler}>
          {!isLogining ? "Click" : "Sign up"}
        </span>
      </div>
    </form>
  );
};

export default UserForm;