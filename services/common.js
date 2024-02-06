const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWQ0NjBmZjE0MDY2OTQ0Njg0YmQyNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3MjMxMDE5fQ.iHp6mFJuHT-DehFEi_Kvx8T83624boKgIQkGL9uqTvw";
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjRhNjlhOTlhYmMxOTQ2YWEwMzBkOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNzIzMDAxN30.sjSicLU8-Zfv09Db5XSvupbLE39jBaaJBqlsxtZEogM";
  return token;
};
// admin token =" token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjRhNjlhOTlhYmMxOTQ2YWEwMzBkOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjQ0OTM0OX0.8iJxPKzsahwB67u13pVcn8d01ZEw3ch-mJLtBmoTPWA";"
