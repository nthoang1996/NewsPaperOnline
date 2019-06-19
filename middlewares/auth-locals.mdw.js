module.exports = (req, res, next) => {
  console.log(req.user);
  res.locals.isAuthenticated = true;
  res.locals.authUser = "HoangNT";
  res.locals.authUserID = "5";
  next();
}