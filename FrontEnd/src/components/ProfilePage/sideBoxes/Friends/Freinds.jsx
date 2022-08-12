import React from "react";
import "./friends.scss";
import SideBox from "../../Side Box/SideBox";

const Friends = ({ friends }) => {
  return (
    <SideBox className="photo">
      <div className="title">
        <p>Friends</p>
        <span className="link">See All Friends</span>
      </div>
      {friends.map((data, key) => {
        return (
          <div className="photos" key={key}>
            <div className="friend">
              <img src={data.avatar} alt="" />
              <p>{`${data.firstName} ${data.surname}`}</p>
            </div>
          </div>
        );
      })}
    </SideBox>
  );
};

export default Friends;
