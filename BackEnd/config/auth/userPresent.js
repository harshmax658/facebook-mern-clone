const userPresent = (req, res, done) => {
  if (req.cookies.userToken) {
    req.headers.authorization = req.cookies.userToken;
    req.headers = { ...req.headers, authorization: req.cookies.userToken };

    done(null, true);
  } else {
    done(null, false);
  }
};
module.exports = userPresent;
