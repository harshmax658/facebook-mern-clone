import React, { useEffect, useState, useRef } from "react";
import "./chatBox.scss";
import WhiteBox from "../white box/WhiteBox";
import ClearIcon from "@material-ui/icons/Clear";
import FormInput from "../Forms/FormInput/FormInput";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CollectionsIcon from "@material-ui/icons/Collections";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { RiFileGifFill } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { sendPostData } from "../../Apis/ApiCalls";
import { useHistory } from "react-router-dom";
const ChatBox = ({
  user,
  closeChatBox,
  sendMessage,
  setNewMessage,
  newMessage,
  token,
}) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const messagesEndRef = useRef(null);
  const history = useHistory();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  });
  useEffect(() => {
    (async function getConversation() {
      const data = await sendPostData(
        "/api/v1/message/get-messages",
        {
          sender: currentUser._id,
          receiver: user._id,
        },
        token
      );
      if (data.chat) {
        setChat(data.data.messages);
        setLoading(false);
      }
    })();
  }, [user, token, currentUser._id]);

  useEffect(() => {
    if (newMessage) {
      setChat((prev) => {
        return [
          ...prev,
          {
            message: newMessage.message,
            messageOwner: newMessage.user._id,
          },
        ];
      });
      setNewMessage(null);
    }
  }, [newMessage, setChat, setNewMessage]);

  return (
    <>
      <WhiteBox className="box">
        <div className="chatTop">
          <div className="userName">
            <img src={user.avatar} alt="" />
            <p
              onClick={() => history.push(`/profile/${user._id}`)}
            >{`${user.firstName} ${user.surname}`}</p>
          </div>
          <ClearIcon
            className="close_chat_box"
            onClick={() => closeChatBox(user._id)}
          />
        </div>
        <div className="messages">
          {!loading &&
            chat.map(({ message, messageOwner }, key) => {
              return messageOwner !== currentUser._id ? (
                <li className="msg other" key={key}>
                  <img src={user.avatar} alt="" /> <span>{message}</span>
                </li>
              ) : (
                <li className="msg self" key={key}>
                  <span>{message}</span>
                </li>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
        <div className="input_box">
          <div className="icons">
            <AddCircleIcon className="icon" />
            <CollectionsIcon className="icon" />
            <EmojiEmotionsIcon className="icon" />
            <RiFileGifFill className="icon gif" />
          </div>
          <FormInput
            placeholder="Aa"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.type === "click") {
                sendMessage(message, currentUser, user);
                setChat((prev) => {
                  return [...prev, { message, messageOwner: currentUser._id }];
                });
                setMessage("");
              }
            }}
            onChange={messageHandler}
            value={message}
            className="message_input"
          />

          {message ? (
            <IoMdSend className="icon message" onClick={sendMessage} />
          ) : (
            <FaThumbsUp className="icon thumb" />
          )}
        </div>
      </WhiteBox>
    </>
  );
};

export default ChatBox;
