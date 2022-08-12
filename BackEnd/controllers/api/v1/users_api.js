const User = require("../../../models/user");

const createNewUser = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      const newUser = new User({ ...request.body });
      try {
        await newUser.save();

        return response.status(200).json({
          message: "New User Registerd",
          data: {
            data: newUser,
          },
        });
      } catch (error) {
        return response.status(422).json({
          message: "Error While creating new User",
          error,
        });
      }
    } else {
      return response.status(422).json({
        message: "User already exist",
        data: {
          data: user,
        },
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

const userLogin = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email }).select(
      "+password"
    );

    console.log(user);
    if (user) {
      const isPasswordMatch = await User.checkPassword(
        request.body.password,
        user.password
      );

      if (isPasswordMatch) {
        user["password"] = null;

        let token = User.generateToken(user.toJSON(), "H@rsh", "365d");

        if (token) {
          response.cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            expires: new Date("01 12 2023"),
          });

          return response.status(200).json({
            message: "User Found",
            data: user,
            token,
            expiresIn: 10000,
          });
        } else {
          throw new Error("facing issue while creating token");
        }
      }

      return response.status(403).json({
        message: "password does not match",
      });
    }

    return response.status(404).json({
      error: "user not found",
    });
  } catch (error) {
    console.log(error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

const destroySession = (request, response) => {
  response.clearCookie("userToken");
  return response.status(200).json({
    message: "Logout Sucessfull",
  });
};

const sendUserJWTtoken = async (request, response) => {
  try {
    const user = await User.findById(request.user.id).populate({
      path: "friendship",
      populate: ["userId", "friendId"],
    });

    return response.status(200).json({
      message: "token found",
      token: request.cookies.userToken,
      user,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserData = async (request, response) => {
  try {
    let id = request.user.id;

    if (request.query.id) {
      id = request.query.id;
    }

    const user = await User.findById(id)
      .populate({
        path: "posts",

        populate: [
          { path: "user" },
          { path: "likes" },
          {
            path: "comments",
            options: { sort: "-createdAt" },
            populate: [{ path: "user" }, { path: "likes" }],
          },
        ],
      })
      .populate({
        path: "friendship",
        populate: [{ path: "userId" }, { path: "friendId" }],
      });
    console.log(user);
    if (user) {
      return response.status(200).json({
        user,
        token: request.cookies.userToken,
      });
    }
    return response.status(400).json({
      message: "invalid user",
      token: null,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "internal server error",
    });
  }
};
const getUserPost = async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate({
      path: "posts",

      populate: [
        { path: "user" },
        { path: "likes" },
        {
          path: "comments",
          options: { sort: "-createdAt" },
          populate: [{ path: "user" }, { path: "likes" }],
        },
      ],
    });

    if (user) {
      return response.status(200).json({
        data: user.posts,
      });
    }
    return response.status(400).json({
      message: "invalid user",
      token: null,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "internal server error",
    });
  }
};

const uploadUserProfile = async (request, response) => {
  try {
    const user = await User.findById(request.user._id);

    User.uploadAvtar(request, response, async (error) => {
      if (error) {
        console.log(error);

        return response.status(400).json({
          msg: "error in upload image",
        });
      }

      if (request.file) {
        user.avatar = User.avatarPath + "/" + request.file.filename;

        await user.save();

        return response.status(200).json({
          pathLocation: user.avatar,
          msg: "Image Upload",
        });
      }

      return response.status(400).json({
        msg: "error in upload image",
      });
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      msg: "Internal Serever Error",
    });
  }
};

const getAllUser = async (request, response) => {
  try {
    const user = await User.find({});
    if (request.user) {
      if (user) {
        console.log(user);
        return response.status(200).json({
          message: "Success",
          currentUser: request.user._id,
          data: user,
        });
      }
      console.log("user");
    }
    console.log(request.user);
    return response.status(400).json({
      message: "invalid",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "internal server error",
    });
  }
};
module.exports = {
  createNewUser,
  getUserData,
  userLogin,
  destroySession,
  uploadUserProfile,
  getUserPost,
  getAllUser,
  sendUserJWTtoken,
};
