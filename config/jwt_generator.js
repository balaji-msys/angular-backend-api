const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const generateAccessToken = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "30d",
      issuer: "vicky",
      audience: id,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (!authToken) return next(createError.Unauthorized());
  const token = authToken.split(" ")[1];
  jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    }
  );
};

module.exports = generateAccessToken;
module.export = verifyAccessToken;
