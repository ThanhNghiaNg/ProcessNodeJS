import { useEffect, useState } from "react";

const UserList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const respone = await fetch("http://localhost:5000/users");
      const data = await respone.json();
      const users = data.users;
      console.log(users);
      setData(users);
      setIsLoading(false)
    };
    getUsers();
  }, []);
  let usersContent = <h1>No Found Users</h1>;
  if (isLoading){
    usersContent = <h3>Loading...</h3>;
  }
  if (data.length > 0) {
    usersContent = data.map((user) => <li>{user}</li>);
  }
  return (
    <>
      <h1>Users</h1>
      <ul>{usersContent}</ul>
    </>
  );
};

export default UserList;
