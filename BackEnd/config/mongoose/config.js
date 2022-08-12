const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/facebook")
  .then(() => console.log("Server configuration set Succesfully.... "))
  .catch(() => console.log("Oops.. There is an error in db Congig"));
