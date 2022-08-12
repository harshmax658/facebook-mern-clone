const User = require("../../../models/user");
const Friendship = require("../../../models/Friendship");
const checkFriendship = async (user1, user2) => {
  const isFriend = await Friendship.findOne({
    userId: user1,
    friendId: user2,
  });
  return isFriend;
};
const removeFriend = async (user, otherUser, friendShipStatus) => {
  await user.friendship.pull(friendShipStatus._id);
  await otherUser.friendship.pull(friendShipStatus._id);
  await friendShipStatus.remove();
  await user.save();
  await otherUser.save();
  return true;
};

const toggle = async (request, response) => {
  try {
    let mutual = false;
    const user = await User.findById(request.user._id);
    const otherUser = await User.findById(request.query.id);

    if (user && otherUser) {
      let friendShipStatus = await checkFriendship(user._id, otherUser._id);

      if (friendShipStatus) {
        const isRemove = await removeFriend(user, otherUser, friendShipStatus);
        if (isRemove) {
          return response.status(200).json({
            message: "Friend Remove",
            data: {
              mutual,
              friendShipStatus,
            },
          });
        } else {
          throw new Error("not done");
        }
      }
      friendShipStatus = await checkFriendship(otherUser._id, user._id);
      if (friendShipStatus) {
        const isRemove = await removeFriend(user, otherUser, friendShipStatus);
        if (isRemove) {
          return response.status(200).json({
            message: "Friend Remove",
            data: {
              mutual,
              friendShipStatus,
            },
          });
        } else {
          throw new Error("not done");
        }
      }

      const createFriendShip = new Friendship({
        userId: user._id,
        friendId: otherUser._id,
      });
      await createFriendShip.save();
      await user.friendship.push(createFriendShip);
      await otherUser.friendship.push(createFriendShip);
      await user.save();
      await otherUser.save();
      mutual = true;
      return response.status(200).json({
        message: "Friend created",
        data: {
          mutual,
          friendShipStatus: createFriendShip,
        },
      });
    }
    return response.status(400).json({
      friendShipStatus: "not Found",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { toggle };
