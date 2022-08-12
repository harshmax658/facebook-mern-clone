import React from "react";
import "./userSection.scss";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import AirplayIcon from "@material-ui/icons/Airplay";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import FlagRoundedIcon from "@material-ui/icons/FlagRounded";
import EventBusyRoundedIcon from "@material-ui/icons/EventBusyRounded";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const UserSection = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const history = useHistory();
  return (
    <div className="userSection">
      <div className="userName">
        <ul>
          <li onClick={() => history.push("/update")}>
            <img src={currentUser.avatar} alt="" className="avatar" />
            {currentUser.firstName + " " + currentUser.surname}
          </li>
        </ul>
      </div>
      <div className="usersRelatedLinks">
        <ul>
          <li onClick={() => history.push("/update")}>
            <FaUserFriends className="header_icons" type="frnd" />
            Find Friends
          </li>
          <li onClick={() => history.push("/update")}>
            <MdGroups className="header_icons" />
            groups
          </li>
          <li onClick={() => history.push("/update")}>
            <StorefrontOutlinedIcon className="header_icons" />
            MarketPlace
          </li>
          <li onClick={() => history.push("/update")}>
            <AirplayIcon className="header_icons" />
            Watch
          </li>
          <li onClick={() => history.push("/update")}>
            <AccessTimeRoundedIcon className="header_icons" />
            Memories
          </li>
          <li onClick={() => history.push("/update")}>
            <BookmarkRoundedIcon className="header_icons" />
            Saved
          </li>
          <li onClick={() => history.push("/update")}>
            <FlagRoundedIcon className="header_icons" />
            Pages
          </li>
          <li onClick={() => history.push("/update")}>
            <EventBusyRoundedIcon className="header_icons" />
            Events
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSection;
