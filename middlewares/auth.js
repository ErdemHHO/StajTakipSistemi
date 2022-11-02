module.exports = (req, res, next) => {
    if(!req.session.isAuth) {
        return res.redirect("/giris?returnUrl=" + req.originalUrl); // => /admin/blogs
    }
    next();
}