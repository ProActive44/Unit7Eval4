const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed_password = bcrypt.hashSync(password, 8);

    const new_user = new userModel({
      email,
      password: hashed_password,
    });
    // console.log(new_user);
    await new_user.save();
    res.status(200).send({ msg: "Signup Successful" });
  } catch (error) {
    res.status(500).send({ msg: "Failed to Signup", err: `${error}` });
  }
});

signupRouter.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = await userModel.find({email});

    if (!data) {
      res.status(200).send({ msg: "Users not found" });
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching the data" });
  }
});

module.exports = signupRouter;
