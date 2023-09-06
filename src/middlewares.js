const { verifyToken } = require("./utils");

const verifyUser = async (req, res, next) => {
  let accessToken = req.get("authorization");

  if (!accessToken) {
    return res.status(410).json({
      success: false,
      message: "Unauthorized",
    });
  }
  accessToken = accessToken.replace(/^Bearer\s/, "");

  const decoded = verifyToken(accessToken);

  if (decoded) {
    res.secretData = "This is a secret data string. Shh!!";
    res.decoded = decoded;
    return next();
  }

  return res.status(410).json({
    success: false,
    message: "Unauthorized",
  });
};

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
  verifyUser,
};
