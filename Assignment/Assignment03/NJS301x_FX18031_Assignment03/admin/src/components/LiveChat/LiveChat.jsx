import classes from "./LiveChat.module.css";

import React from "react";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { serverUrl } from "../../utils/global";
import RoomList from "./RoomList";
import Room from "./Room";

function LiveChat(props) {
  const { sendRequest } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    sendRequest({ url: `${serverUrl}/admin/rooms` }, (data) => {
      setData(data);
    });
  }, []);

  return (
    <div className={classes.livechat}>
      <RoomList data={data} />
      <Room />
    </div>
  );
}

export default LiveChat;
