const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");

router.get("/", authenticateToken, (req, res) => {
  try {
    axios
      .get(`${process.env.JSONPLACEHOLDERURL}/posts/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.userId === req.user.id
        );
        res.send(filteredData);
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get("/:id", authenticateToken, (req, res) => {
  try {
    const params = req.params;
    axios
      .get(`${process.env.JSONPLACEHOLDERURL}/posts/${params.id}`, {
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

router.put("/:id", authenticateToken, (req, res) => {
  try {
    const data = req.body;
    axios
      .get(`${process.env.JSONPLACEHOLDERURL}/posts/${params.id}`, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = router;
