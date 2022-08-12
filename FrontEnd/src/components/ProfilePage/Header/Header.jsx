import React, { useEffect, useState } from "react";
import "./header.scss";
import NavigationBar from "../NavigationBar/NavigationBar";
import { TiCamera } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { setProfileImage } from "../../../redux/user/action";
import CustomButton from "../../../components/Forms/Custom Button/CustomButton";

const Header = ({ profileImage, profileUser }) => {
  const { token, friends, currentUser } = useSelector(
    (state) => state.userReducer
  );
  const { profileFriends } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [imageUploadStart, setImageUploadStart] = useState(false);
  const { firstName, surname } = profileUser;
  const [image, setImage] = useState({
    raw: null,
    original: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(profileImage);
    setImage((prev) => {
      return { ...prev, raw: profileImage };
    });
    return () =>
      setImage((prev) => {
        return { ...prev, raw: null };
      });
  }, [profileImage]);
  const fileHandler = (e) => {
    let rawLink = URL.createObjectURL(e.target.files[0]);

    setImage((prev) => {
      return { ...prev, raw: rawLink, original: e.target.files[0] };
    });
    setImageUploadStart(true);
  };

  const imageUpload = async (e) => {
    if (image.original) {
      const data = new FormData();
      data.append("avatar", image.original);

      const uploadImage = await fetch("/api/v1/user/upload-profile-image", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: data,
      });
      if (uploadImage.status === 200) {
        const iJson = await uploadImage.json();
        dispatch(setProfileImage(iJson.pathLocation));
        setMessage("Image Upload Succesfully");
        setTimeout(() => {
          setImageUploadStart(false);
        }, 2000);
      } else {
        setMessage("error");
      }
    } else {
      setImageUploadStart(false);
    }
  };

  return (
    <div className="profile_header">
      <div className="user_header">
        <div className="wall_image">
          <div className="user_profile_image">
            <img src={image.raw} alt="" />
            {currentUser._id === profileUser._id && (
              <form encType="multipart/form-data">
                <label htmlFor="avatar">
                  <TiCamera />
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={fileHandler}
                />
              </form>
            )}
          </div>
        </div>
        {imageUploadStart && (
          <div className="upload_button">
            <CustomButton onClick={imageUpload}>Upload Image</CustomButton>
            <p className="message">{message}</p>
          </div>
        )}
        <div className="user_name">
          <p id="name">{`${firstName} ${surname}`}</p>
          <div>Add Bio</div>
        </div>
        <div className="navBar">
          <NavigationBar
            friends={friends}
            profileFriends={profileFriends}
            currentUser={currentUser}
            profileUser={profileUser}
            token={token}
          />
          {/* <NavLink to="/post">Post</NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
