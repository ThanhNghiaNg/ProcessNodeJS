import classes from "./RoomList.module.css";
import { NavLink, useMatch } from "react-router-dom";
import React from "react";
import Card from "../UI/Card";
import { useState } from "react";

function RoomList({ data }) {
  const [contact, setContact] = useState("");
  const listContent = data
    .filter((item) => item._id.includes(contact))
    .map((item) => {
      return (
        <li key={item._id} className="border-top border-bottom py-3">
          <NavLink
            to={`/chat/${item._id}`}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            <span className="me-0">
              <i className="fa-solid fa-user"></i>
            </span>
            <span>{item._id}</span>
          </NavLink>
        </li>
      );
    });
  return (
    <Card>
      <div className="p-3 mb-3">
        <input
          className="form-control"
          placeholder="Search contact"
          onChange={(event) => {
            setContact(event.target.value);
          }}
        />
      </div>
      <ul className={classes.list}>{listContent}</ul>
    </Card>
  );
}

export default RoomList;
