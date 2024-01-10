const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWQ0NjBmZjE0MDY2OTQ0Njg0YmQyNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA0OTAwOTg2fQ.2Ze89vaZti6GMI-u7wR1D4YZa1U2umdvuCyDtDY_NAo";
  return token;
}