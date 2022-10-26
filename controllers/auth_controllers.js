const duyuruOlustur=(req,res,next)=>{
    res.render('../views/yonetici/duyuru.ejs',{layout:'../views/yonetici/duyuru.ejs'})
}
const loginFormunuGoster=(req,res,next)=>{
    res.render('../views/sayfalar/login.ejs',{layout:'../views/sayfalar/login.ejs'})
}
const login=(req,res,next)=>{
    console.log(req.body)
    res.render('../views/sayfalar/login.ejs',{layout:'../views/sayfalar/login.ejs'})
}
//const AnasayfaGoster=(req,res,next)=>{
//    res.render('../views/sayfalar/homepage.ejs',{layout:'../views/sayfalar/homepage.ejs'})
//}
const kullaniciIslem=(req,res,next)=>{
    res.render('../views/yonetici/kullanıcıIslemleri.ejs',{layout:'../views/yonetici/kullanıcıIslemleri.ejs'})
}
const profil=(req,res,next)=>{
    res.render('../views/yonetici/profil.ejs',{layout:'../views/yonetici/profil.ejs'})
}

module.exports={
    loginFormunuGoster,
    login,
    kullaniciIslem,
    profil,
    duyuruOlustur
}