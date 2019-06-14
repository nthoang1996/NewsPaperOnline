module.exports = (req, res, next) => {
  console.log("auth-locals");
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
  }
  next();
}