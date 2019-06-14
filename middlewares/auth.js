module.exports = (req, res, next) => {
    console.log("auth");
    if (!req.user) {
        res.redirect('/account/login');
    }
    else next();
}
