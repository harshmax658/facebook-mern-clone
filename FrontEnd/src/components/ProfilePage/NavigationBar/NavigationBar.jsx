import React, { useEffect, useState } from "react";
import "./navigationBar.scss";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import CustomButton from "../../Forms/Custom Button/CustomButton";
import { ObjectToArray } from "../../../redux/User Posts/utilityFunction";
import { useDispatch } from "react-redux";
import { addFriend, removeFriend } from "../../../redux/user/action";

const NavigationBar = ({
  friends,
  token,
  profileFriends,
  currentUser,
  profileUser,
}) => {
  const [mutual, setMutual] = useState(null);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const friendshipToggle = async (otherUserId) => {
    try {
      const request = await fetch(
        `/api/v1/friendship/toggle/?id=${otherUserId}`,
        {
          headers: {
            Accept: "application/json'",
            "Contain-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
        }
      );
      if (request.status === 200) {
        const jsonData = await request.json();
        if (jsonData.data.mutual) {
          setMutual(true);
          dispatch(addFriend(jsonData.data.friendShipStatus._id));
        } else {
          dispatch(removeFriend(jsonData.data.friendShipStatus._id));
          setMutual(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const friendList = ObjectToArray(friends);

    const checkFriendship = () => {
      let found = false;
      let id;
      for (let data of friendList) {
        if (data._id) {
          id = data._id;
        } else {
          id = data;
        }
        if (profileFriends.hasOwnProperty(id)) {
          found = true;
          break;
        }
      }
      if (found) {
        return true;
      } else {
        return false;
      }
    };
    if (!mutual) setMutual(checkFriendship());
  }, [profileFriends, mutual, friends]);

  return (
    <div className="navigation_header">
      <div className="nav_links">
        <ul>
          <NavLink activeClassName="active_tab" to={`${pathname}`}>
            Post
          </NavLink>

          <NavLink to={`${pathname}`}>About</NavLink>

          <NavLink to={`${pathname}`}>Friends</NavLink>

          <NavLink to={`${pathname}`}>Photos</NavLink>

          <NavLink to={`${pathname}`}>Videos</NavLink>

          <NavLink to={`${pathname}`}>Check-ins</NavLink>

          <NavLink to={`${pathname}`}>More</NavLink>
        </ul>
      </div>
      {currentUser._id !== profileUser._id && (
        <div className="action_links">
          {mutual ? (
            <CustomButton
              className="button"
              onClick={() => friendshipToggle(profileUser._id)}
            >
              <span>
                <i className="fas fa-user-friends" id="friend"></i>
              </span>
              Friends
            </CustomButton>
          ) : (
            <CustomButton
              className="button"
              onClick={() => friendshipToggle(profileUser._id)}
            >
              <span>
                <i className="fas fa-user-plus" id="friend"></i>
              </span>
              Add Friend
            </CustomButton>
          )}
          <CustomButton className="button">
            <span>
              <i className="fab fa-facebook-messenger"></i>
            </span>
            Message
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
