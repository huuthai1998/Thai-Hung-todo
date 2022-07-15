const bcrypt = require("bcrypt");
var logger = require("../utils/logger");
var db = require("../models");
const { signToken } = require("../utils/jwt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const User = db.user;

exports.sign_in = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByPk(email);
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) throw "Incorrect password";
    const token = signToken(email);

    res.status(200).send({ token });
  } catch (err) {
    res.status(401).send({ message: "email or password is incorrect" });
  }
};

exports.sign_up = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.findByPk(email);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    if (user) throw "This email is already been taken";
    const createdUser = await User.create({
      ...req.body,
      password: hashPassword,
    });
    const token = signToken(email);
    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err.message });
  }
};

exports.get_user = async (req, res, next) => {
  try {
    const { email: payloadEmail } = res.locals;
    const user = await User.findByPk(payloadEmail);
    if (!user) throw "User does not exist";
    const { username, email, avatar } = user;
    res.status(200).send({ user: { username, email, avatar } });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err.message });
  }
};

exports.edit_user = async (req, res, next) => {
  try {
    const { username, avatar } = req.body;
    const { email } = res.locals;
    const user = await User.findByPk(email);
    if (!user) throw "User does not exist";
    user.username = username;
    user.avatar = avatar || user.avatar;
    await user.save();
    res.status(200).send({
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err.message });
  }
};
