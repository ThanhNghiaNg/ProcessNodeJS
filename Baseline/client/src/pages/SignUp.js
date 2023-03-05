import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

function SignUp(props) {
  return (
    <div>
      <AuthForm login={false} />
    </div>
  );
}

export default SignUp;
