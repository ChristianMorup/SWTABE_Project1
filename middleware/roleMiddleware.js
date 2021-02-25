const jwt = require("jsonwebtoken");

function hasRole(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secret", (err, user) => {
      if (err || user.role !== role) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  };
}

module.exports = {
  hasRole: hasRole,
};
