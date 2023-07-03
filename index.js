const express = require("express");
const connection = require("./config/db");
const signupRouter = require("./routers/signup.router");
const loginRouter = require("./routers/login.router");
const authMiddleware = require("./middlewares/authMiddleware");
const employeeRouter = require("./routers/employee.router");
require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use(authMiddleware);
app.use("employees", employeeRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server Started on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
