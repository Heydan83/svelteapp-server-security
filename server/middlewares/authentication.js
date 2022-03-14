const jwt = require("jsonwebtoken");
const { refreshingToken } = require("../libs/authentication");

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).send({ message: "token not found" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // "error": "TokenExpiredError: jwt expired"
      if (err) {
        if (err.error === "TokenExpiredError: jwt expired") {
          let refreshToken = req.headers.cookie;
          if (!refreshToken)
            return res.status(200).send({ message: "no refresh token" });
          refreshToken = refreshToken.split("=")[1];
          if (!refreshToken)
            return res.status(200).send({ message: "no refresh token" });
          const accessToken = refreshingToken(refreshToken);

          req.headers["authorization"] = `Bearer ${accessToken}`;
          authenticateToken(req, res, next);
        } else throw new Error(err);
      }

      req.user = user;
      next();
    });
  } catch (err) {
    res.send({ error: err.message });
  }
}

module.exports.authenticateToken = authenticateToken;
