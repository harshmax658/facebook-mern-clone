import React from "react";
import "./Header.scss";

// Components
import FormInput from "../Forms/FormInput/FormInput";

// Icons
import { FaUserFriends } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { SiFacebookgaming } from "react-icons/si";
import { CgMenuGridR } from "react-icons/cg";
import { RiMessengerLine } from "react-icons/ri";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import HomeOutlinedIcon from "@material-ui/icons//HomeOutlined";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { userLogout } from "../../redux/user/action";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { currentUser, token } = useSelector((state) => state.userReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const logoutReq = await fetch("/api/v1/user/destroySession", {
      headers: {
        Content_type: "application/json",

        Authorization: token,
      },
      credentials: "include",
    });
    if (logoutReq.status === 200) {
      dispatch(userLogout());
      history.push("/login");
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="nav1">
          <div className="logo" onClick={() => history.push("/")}>
            <MdFacebook />
          </div>
          <div className="searchBar">
            <FormInput placeholder="Seach Facebook"></FormInput>
          </div>
        </div>
        <div className="nav2">
          <div className="icons">
            <ul className="list_Items">
              <NavLink exact to="/">
                <HomeOutlinedIcon className="header_icons" />
              </NavLink>
              <NavLink exact to="/friends">
                <FaUserFriends className="header_icons" />
              </NavLink>
              <NavLink exact to="/update">
                <LiveTvIcon className="header_icons" />
              </NavLink>
              <NavLink exact to="/update">
                <StorefrontOutlinedIcon className="header_icons" />
              </NavLink>
              <NavLink exact to="/update">
                <SiFacebookgaming className="header_icons" />
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="nav3">
          <ul className="list_Items">
            <NavLink exact to={`/profile/${currentUser._id}`}>
              {currentUser.firstName}
            </NavLink>
            <NavLink exact to="/update">
              <CgMenuGridR className="header_icons" />
            </NavLink>
            <NavLink exact to="/update">
              <RiMessengerLine className="header_icons" />
            </NavLink>
            <NavLink exact to="/update">
              <BsFillBellFill className="header_icons" />
            </NavLink>
            <NavLink exact to="/update">
              <AiFillCaretDown
                className="header_icons"
                onClick={logoutHandler}
              />
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
