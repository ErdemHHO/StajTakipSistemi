module.exports =async function(req, res, next) {
    res.locals.isAuth = req.session.isAuth;
    res.locals.kullaniciAd=req.session.kullaniciAd;
    res.locals.kullaniciSoyad=req.session.kullaniciSoyad;
    res.locals.kullaniciNumara=req.session.kullaniciNumara;
    res.locals.kullaniciParola=req.session.kullaniciParola;
    res.locals.kullaniciMail=req.session.kullaniciMail;
    res.locals.kullaniciTelNo=req.session.kullaniciTelNo;
    res.locals.kullaniciFakulte=req.session.kullaniciFakulte;
    res.locals.kullaniciBolum=req.session.kullaniciBolum;
    res.locals.kullaniciSinif=req.session.kullaniciSinif;
    res.locals.rolID=req.session.rolID;
    await next();
}  