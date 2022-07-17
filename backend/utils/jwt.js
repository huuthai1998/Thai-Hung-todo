var jwt = require("jsonwebtoken");

const signToken = (email) => {
  var token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
  return token;
};

const isAuthenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.slice(7);
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.locals.email = decodedToken.email;
    next();
  } else return res.status(401).send({ message: "Invalid Token" });
};

module.exports = { signToken, isAuthenticate };
