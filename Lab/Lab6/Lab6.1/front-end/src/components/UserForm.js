import { useRef } from "react";
import { useNavigate } from "react-router";

const UserForm = (props) => {
  const inputUserRef = useRef();
  const navigate = useNavigate();

  const addUserHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: inputUserRef.current.value }),
    }).then((respone) => {
      if (respone.ok) {
        navigate("/users");
      }
      return respone.json();
    });
  };
  return (
    <form onSubmit={addUserHandler} action="/add-user">
      <input type="text" ref={inputUserRef} name="user"></input>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
