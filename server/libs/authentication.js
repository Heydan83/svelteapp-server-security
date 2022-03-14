const jwt = require("jsonwebtoken");

function refreshingToken(refreshToken) {
  let accessToken;
  let decodedUserData;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) throw new Error(err);
    decodedUserData = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    accessToken = generateAccessToken({ ...decodedUserData });
  });

  decodedUserData = { ...decodedUserData, accessToken };

  return decodedUserData;
}

function setCookieToken(res, type, token) {
  if (type !== "at" && type !== "rt")
    return new Error("No recognized type of token");
  res.cookie(type, token, {
    secure: true,
    sameSite: true,
    httpOnly: true,
  });

  return true;
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" }); // 60 1 min
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1800s",
  }); // 1800 30 mins
}

module.exports.refreshingToken = refreshingToken;
module.exports.setCookieToken = setCookieToken;
module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
