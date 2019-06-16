module.exports = (req, res, next) => {
  // console.log("===============================================auth-locals");
  // console.log(req);
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
  }
  next();
}