import classes from "./Room.module.css";
import { useEffect, useState } from "react";
import { serverUrl } from "../../utils/global";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Card from "../UI/Card";
import openSocket from "socket.io-client";
import { useRef } from "react";

function Room(props) {
  const [roomData, setRoomData] = useState([]);
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef();
  const { sendRequest } = useHttp();
  const id = useParams().id;
  useEffect(() => {
    if (id) {
      sendRequest({ url: `${serverUrl}/admin/room/${id}` }, (data) => {
        const socket = openSocket(`${serverUrl}`);
        socket.on("chat", (data) => {
          if (data.action === "push") {
            setRoomData(data.session.streamData);
          }
        });
        setRoomData(data.streamData);
      });
    }
  }, [id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [roomData]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!message) return;
    sendRequest(
      {
        url: `${serverUrl}/admin/room/${id}`,
        method: "PATCH",
        body: JSON.stringify({
          content: message,
        }),
      },
      (data) => {
        setMessage("");
      }
    );
  };
  const conversationContent = roomData.map((mess, idx) => {
    if (mess.user.role === "admin" || mess.user.role === "consultant")
      return (
        <div className={classes["admin-message"]} key={idx}>
          You: {mess.content}
        </div>
      );
    else if (mess.user.role === "customer") {
      return (
        <div className={classes["user-message"]} key={idx}>
          <span className="me-2">
            <i className="fa-solid fa-user"></i>
          </span>
          <p>Client: {mess.content}</p>
        </div>
      );
    }
  });
  return (
    <Card className={classes.room}>
      <div className={classes["message-container"]} ref={messageContainerRef}>
        {conversationContent}
      </div>
      <form className={classes.room__form} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type and Enter"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button type="submit">
          <i class="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </Card>
  );
}

export default Room;
