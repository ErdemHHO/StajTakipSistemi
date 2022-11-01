module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuth;
    res.locals.kullaniciAd=req.session.kullaniciAd;
    res.locals.kullaniciSoyad=req.session.kullaniciSoyad;
    next();
}