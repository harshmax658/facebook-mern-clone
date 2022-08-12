import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../chat box/ChatBox";
// import { ObjectToArray } from "../../redux/User Posts/utilityFunction";
import "./userFriend.scss";
import io from "socket.io-client";
import { sendPostData } from "../../Apis/ApiCalls";

const UserFriend = ({ token }) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [userFriends, setUserFriend] = useState([]);
  const [chatBox, setchatBox] = useState([]);
  const [openChatBox, setOpenChatBox] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const socketRef = useRef();
  useEffect(() => {
    if (currentUser.friendship) {
      setUserFriend(currentUser.friendship);
    }
  }, [currentUser]);

  const closeChatBox = (id) => {
    const newOpenChat = openChatBox.filter((data) => data !== id);

    setOpenChatBox(newOpenChat);
    setchatBox((prev) => {
      return prev.filter((data) => data._id !== id);
    });
  };

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3000");

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connection established using Socket....!");
      socket.emit("user_join", { user_id: currentUser._id });
    });
    socket.on("recieve_message", (data) => {
      chatBox.forEach((chat) => {
        if (chat._id === data.user._id) {
          setNewMessage(data);
        }
      });
    });

    return () => socketRef.current.disconnect();
  }, [chatBox, currentUser]);

  const openChatForUser = (obj) => {
    if (!openChatBox.includes(obj._id)) {
      if (!chatBox[0]) {
        setchatBox([obj]);
      } else {
        setchatBox([chatBox[0], obj]);
      }

      setOpenChatBox((prev) => {
        return [...prev, obj._id];
      });
    }
  };
  const checkFriend = (data, key) => {
    let obj;
    if (data.friendId._id === currentUser._id) {
      obj = data.userId;
    } else {
      obj = data.friendId;
    }

    return (
      <li key={key} onClick={() => openChatForUser(obj)}>
        <img src={obj.avatar} alt="friend avatar" />
        {`${obj.firstName} ${obj.surname}`}
      </li>
    );
  };
  const sendMessage = async (message, user, receiver) => {
    socketRef.current.emit("send_message", {
      message,
      user,
      receiver,
    });

    await sendPostData(
      "/api/v1/message/create-message",
      {
        message,
        sender_id: user._id,
        receiver_id: receiver._id,
      },
      token,
      "post"
    );
  };

  return (
    <div className="friends">
      <ul>{userFriends.map((data, key) => checkFriend(data, key))}</ul>

      <div className="chatBox">
        {chatBox.map((user, key) => {
          return (
            <ChatBox
              key={key}
              sendMessage={sendMessage}
              user={user}
              setNewMessage={setNewMessage}
              newMessage={
                newMessage && user._id === newMessage.user._id && newMessage
              }
              token={token}
              closeChatBox={closeChatBox}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserFriend;
