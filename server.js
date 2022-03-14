require("dotenv").config();
const express = require("express");
const users = require("./server/routes/users");
const posts = require("./server/routes/posts");

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

router.use("/users", users);
router.use("/posts", posts);

// router.use("/posit", (req, res, next) =>
//   express.static("./public/", { fallthrough: false }(req, res, next))
// );
router.use(express.static(__dirname + "/public"));

router.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
