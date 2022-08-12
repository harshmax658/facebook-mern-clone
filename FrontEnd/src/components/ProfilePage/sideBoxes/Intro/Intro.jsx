import React from "react";
import "./intro.scss";
// import SideBox from "../Side Box/SideBox";
import SideBox from "../../Side Box/SideBox";

const Intro = () => {
  return (
    <SideBox>
      <div className="title">Intro</div>
      <div className="home">
        Live in <span>Ghaziabad,india</span>
      </div>
      <div className="relationship">Single</div>
      <div className="followers">
        Followed by <span>98 people</span>{" "}
      </div>
      <div className="edit_details btn">Edit details</div>
      <div className="add_Hobbies btn">Add Hobbies</div>
      <div className="add_Featured btn">Add Featured</div>
    </SideBox>
  );
};

export default Intro;
