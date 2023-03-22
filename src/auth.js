import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./config/db";
import jwt from "jsonwebtoken";
const app = express();

const PORT = process.env.AUTH_PORT || 5000;
require("dotenv").config();

app.use(cors());

// HTTP logger

connect();

import User from "./models/User";

app.use(bodyParser.json());

const updateRefreshToken = async (username, password, refreshToken) => {
  const res = await User.findOneAndUpdate(
    { user_name: username, password },
    { $set: { refresh_token: refreshToken } }
  );
};

app.post("/login", async (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;
  const hasUser = await User.find({ user_name: user_name, password });
  if (!hasUser) {
    return res.json({
      success: "false",
      message: "Sai username  va password",
      status: 401,
    });
  }
  const accessToken = jwt.sign({ user_name, password }, "secret", {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign({ user_name, password }, "refreshsecret", {
    expiresIn: "1h",
  });
  updateRefreshToken(user_name, password, refreshToken);
  res.json({
    success: "true",
    data: { token: accessToken, refreshToken: refreshToken },
  });
});

app.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refresh_token;
  if (!refreshToken) return res.sendStatus(401);
  const user = await User.find({ refresh_token: refreshToken });
  console.log(user, "user");
  if (!user) return res.sendStatus(403);
  const { user_name, user_id, password } = user;
  try {
    jwt.verify(refreshToken, "refreshsecret");
    const accessToken = jwt.sign({ user_name, user_id, password }, "secret", {
      expiresIn: "15s",
    });
    const newRefreshToken = jwt.sign(
      { user_name, user_id, password },
      "refreshsecret",
      { expiresIn: "1h" }
    );
    updateRefreshToken(user_name, password, newRefreshToken);

    res.json({
      success: "true",
      data: { token: accessToken, refreshToken: refreshToken },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
