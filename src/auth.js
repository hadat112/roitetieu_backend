import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./config/db";
import jwt from "jsonwebtoken";
const app = express();

const PORT = process.env.AUTH_PORT || 3001;
require("dotenv").config();
import bcrypt from "bcrypt";

app.use(cors());

connect();

import User from "./models/User";

app.use(bodyParser.json());

const updateRefreshToken = async (username, password, refreshToken) => {
  await User.findOneAndUpdate(
    { user_name: username, password },
    { $set: { refresh_token: refreshToken } }
  );
};

app.post("/register", async (req, res) => {
  const user_name = req.body.username;
  const user = await User.findOne({ user_name: user_name });
  if (user)
    res
      .status(200)
      .send({ message: "Tên tài khoản đã tồn tại.", success: false });
  if (req.body.password !== req.body.confirm)
    res
      .status(200)
      .send({
        message: "Hai mật khẩu bạn nhập không trùng nhau.",
        success: false,
      });
  else {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const hashPasswordConfirmation = bcrypt.hashSync(req.body.confirm, 10);
    const accessToken = jwt.sign({ user_name }, "secret", {
      expiresIn: "1500s",
    });
    const refreshToken = jwt.sign({ user_name }, "refreshsecret", {
      expiresIn: "30d",
    });
    const newUser = new User({
      user_name: user_name,
      password: hashPassword,
      passwordConfirmation: hashPasswordConfirmation,
      refresh_token: refreshToken,
    });
    newUser.save((error) => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          success: true,
          data: { token: accessToken, refreshToken: refreshToken },
        });
      }
    });
  }
  return res.status(200).send({
    data: username,
    message: "Tao tk thanh cong",
    success: true,
  });
});

app.post("/login", async (req, res) => {
  const user_name = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ user_name: user_name });
  if (!user) {
    return res.json({
      success: false,
      message: "Tên đăng nhập không tồn tại.",
    });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.json({ success: false, message: "Mật khẩu không chính xác." });
  }

  const accessToken = jwt.sign({ user_name }, "secret", { expiresIn: "1500s" });
  const refreshToken = jwt.sign({ user_name }, "refreshsecret", {
    expiresIn: "86400",
  });
  updateRefreshToken(user_name, refreshToken);
  res.json({
    success: true,
    data: { token: accessToken, refreshToken: refreshToken },
  });
});

app.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refresh_token;
  if (!refreshToken)
    return res
      .sendStatus(400)
      .send({ success: false, message: "Refresh token sai!" });
  const user = await User.findOne({ refresh_token: refreshToken });
  if (!user) return res.sendStatus(403);
  const { user_name } = user;
  try {
    jwt.verify(refreshToken, "refreshsecret");
    const accessToken = jwt.sign({ user_name }, "secret", {
      expiresIn: "1500s",
    });
    const newRefreshToken = jwt.sign({ user_name }, "refreshsecret", {
      expiresIn: "86400",
    });
    updateRefreshToken(user_name, newRefreshToken);

    res.json({
      success: true,
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
