const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    surname: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      default: `https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png`,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    friendship: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.checkPassword = async (manualPassword, dbPassword) => {
  return await bcrypt.compare(manualPassword, dbPassword);
};

userSchema.statics.generateToken = (userData, key, expire = "10d") => {
  const token = jwt.sign(userData, key, {
    expiresIn: expire,
  });

  return `Bearer ${token}`;
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (request, file, cb) {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// static Methods
userSchema.statics.uploadAvtar = multer({ storage: storage }).single("avatar");
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
