import React, { useEffect } from "react";
import "./friendsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchOtherUserStart } from "../../redux/other user/action";
import { ObjectToArray } from "../../redux/User Posts/utilityFunction";
import { useHistory } from "react-router";

const FriendsPage = () => {
  const { otherUser, loading } = useSelector((state) => state.otherUserReducer);
  const { token } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) dispatch(fetchOtherUserStart({ token }));
  }, [loading, dispatch, token]);

  return (
    <div>
      {ObjectToArray(otherUser).map((data, key) => {
        return (
          <p key={key} onClick={() => history.push(`/profile/${data._id}`)}>
            {!loading && data.firstName}
          </p>
        );
      })}
    </div>
  );
};

export default FriendsPage;
