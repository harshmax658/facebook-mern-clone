import React from "react";
import CreatePost from "../create post/CreatePost";
import Feeds from "../Feeds/Feeds";

const FeedSection = ({ post, setRefreshPost, refreshPost }) => {
  return (
    <div className="feedSection">
      <CreatePost refreshPost={refreshPost} setRefreshPost={setRefreshPost} />
      <Feeds post={post} />
    </div>
  );
};

export default FeedSection;
