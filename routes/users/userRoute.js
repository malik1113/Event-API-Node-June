const express = require("express");
const router = express.Router();

const { createUser, getUsers, getUserById } = require("./userController");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json({
      message: "success",
      payload: users,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    res.status(200).json({
        message: "success",
        payload: user
    })
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json({
      message: "User has been successfully created",
      payload: newUser,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

module.exports = router;
