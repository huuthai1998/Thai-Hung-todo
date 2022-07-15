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
    if (!user) throw new Error("Email is incorrect")
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) throw new Error("Password is incorrect");
    const token = signToken(email);
    res.status(200).send({ token });
  } catch (err) {
    logger.error(err);
    res.status(401).send({ message: err.message });
  }
};

exports.sign_up = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.findByPk(email);
    if (user) {
      res.status(409).send({ message: "This email has already been taken" });
    } else {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      await User.create({
        email,
        username,
        password: hashPassword,
      });
      res.status(200).send({ message: "Sign up successfully" });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.get_user = async (req, res, next) => {
  try {
    const { email: payloadEmail } = res.locals;
    const user = await User.findByPk(payloadEmail);
    if (!user) throw new Error("User does not exist");
    const { username, email, avatar } = user;
    res.status(200).send({ user: { username, email, avatar } });
  } catch (err) {
    logger.error(err);
    res.status(401).send({ message: err.message });
  }
};

exports.edit_user = async (req, res, next) => {
  try {
    const { username, avatar } = req.body;
    const { email } = res.locals;
    const user = await User.findByPk(email);
    if (!user) throw new Error("User does not exist");
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
    logger.error(err);
    res.status(401).send({ message: err.message });
  }
};
