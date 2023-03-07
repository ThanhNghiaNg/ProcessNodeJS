import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import classes from "./LiveChat.module.css";
import { serverUrl } from "../../utils/constant";
import { authActions } from "../../store/authSlice";
import openSocket from "socket.io-client";

const LiveChat = (props) => {
  const [isShowBoxChat, setIsShowBoxChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [history, setHistory] = useState([]);
  const roomId = useSelector((state) => state.auth.roomId);
  const messageContainerRef = useRef();
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomId) {
      sendRequest({ url: `${serverUrl}/room/${roomId}` }, (data) => {
        const socket = openSocket(`${serverUrl}`);
        socket.on("chat", (data) => {
          if (data.action === "push") {
            setHistory(data.session.streamData);
          }
        });
        setHistory(data.streamData);
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [history]);

  const enteredMessageHandler = (event) => {
    setMessageInput(event.target.value);
  };

  const toggleBoxChatHandler = () => {
    setIsShowBoxChat((state) => !state);
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (messageInput === "/end") {
      dispatch(authActions.deleteRoom());
      setHistory([]);
      setMessageInput("")
      return;
    }
    if (!roomId) {
      sendRequest(
        {
          url: `${serverUrl}/room`,
          method: "POST",
          body: JSON.stringify({ content: messageInput }),
        },
        (data) => {
          dispatch(authActions.createRoom(data.session._id));
          console.log(data.session.streamData);
          setHistory(data.session.streamData);
        }
      );
    } else {
      sendRequest(
        {
          url: `${serverUrl}/room/${roomId}`,
          method: "PATCH",
          body: JSON.stringify({ content: messageInput }),
        },
        (data) => {
          // setHistory(data.streamData);
        }
      );
    }
    setMessageInput("");
  };

  const renderHistory = history.map((mess, idx) => {
    if (mess.user.role === "admin" || mess.user.role === "consultant")
      return (
        <div className={classes["admin-message"]} key={idx}>
          <span className="me-2">
            <i className="fa-solid fa-user"></i>
          </span>
          <p>ADMIN: {mess.content}</p>
        </div>
      );
    else if (mess.user.role === "customer") {
      return (
        <div className={classes["user-message"]} key={idx}>
          {mess.content}
        </div>
      );
    }
  });
  return (
    <div className={classes.box}>
      {isShowBoxChat && (
        <div className={classes.chat}>
          <div
            className={`rounded-top border-bottom p-3 d-flex justify-content-between align-items-center`}
          >
            <p className="fw-bold m-0">Customer Support</p>
            <div className={classes["mini-logo"]}>
              <p>Let's Chat App</p>
            </div>
          </div>
          <div
            className={classes["message-container"]}
            ref={messageContainerRef}
          >
            {renderHistory}
          </div>
          <form
            onSubmit={sendMessageHandler}
            className={`bg-light rounded-bottom p-3 d-flex gap-1 align-items-center`}
          >
            <span className="col-1">
              <i class="fa-solid fa-user"></i>
            </span>
            <input
              className="col-6 border-0"
              type="text"
              placeholder="Enter Message!"
              value={messageInput}
              onChange={enteredMessageHandler}
            ></input>

            <button className={classes.effect} type="button">
              <i class="fa-solid fa-paperclip"></i>
            </button>
            <button className={classes.effect} type="button">
              <i class="fa-solid fa-face-smile"></i>
            </button>
            <button className={classes.send} type="submit">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
      <button
        className={`${classes["toggle-mess"]}`}
        onClick={toggleBoxChatHandler}
      >
        <i className="fa-brands fa-facebook-messenger text-white fs-3"></i>
      </button>
    </div>
  );
};

export default LiveChat;
