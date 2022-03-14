const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");
const {
  refreshingToken,
  generateAccessToken,
  generateRefreshToken,
  setCookieToken,
} = require("../libs/authentication");
const { adminModules, logInModules } = require("../libs/helpers");

router.get("/", authenticateToken, (req, res) => {
  try {
    axios
      .get(`${process.env.JSONPLACEHOLDERURL}/users/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, email } = req.body;

  try {
    await axios
      .get(`${process.env.JSONPLACEHOLDERURL}/users?username=${username}`)
      .then((response) => {
        const loginUserData = response.data.filter(
          (user) => user.username == username
        )[0];

        if (loginUserData?.email === email) {
          let role;
          loginUserData.username === "Bret"
            ? (role = "Admin")
            : (role = "User");
          const jwtUser = {
            id: loginUserData.id,
            name: loginUserData.name,
            username: loginUserData.username,
            email: loginUserData.email,
            role,
          };
          const atGenerated = generateAccessToken(jwtUser);
          const wasRTGenerated = setCookieToken(
            res,
            "rt",
            generateRefreshToken(jwtUser)
          );
          if (atGenerated && wasRTGenerated) {
            res.json({
              message: "authenticated",
              id: loginUserData.id,
              name: loginUserData.name,
              username: loginUserData.username,
              email: loginUserData.email,
              accessToken: atGenerated,
              role,
            });
          } else res.status(500).send({ error: "Could not generate tokens" });
        } else {
          res.status(401).send({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/token", (req, res) => {
  try {
    let refreshToken = req.headers.cookie;
    if (!refreshToken)
      return res.status(200).send({ message: "no refresh token" });
    refreshToken = refreshToken.split("=")[1];
    if (!refreshToken)
      return res.status(200).send({ message: "no refresh token" });
    const accessToken = refreshingToken(refreshToken);
    res.status(200).json({ message: "authenticated", ...accessToken });
  } catch (err) {
    res.clearCookie("rt");
    res.status(401).send({ error: err.message });
  }
});

// router.get("/admin-modules", authenticateToken, (req, res) => {
//   try {
//     res.status(200).send({ adminModules });
//   } catch (err) {
//     res.send({ error: err.message });
//   }
// });

// router.get("/login-modules", authenticateToken, (req, res) => {
//   try {
//     res.status(200).send({ logInModules });
//   } catch (err) {
//     res.send({ error: err.message });
//   }
// });

module.exports = router;
