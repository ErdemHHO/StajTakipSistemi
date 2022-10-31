// const duyuruOlustur=(req,res,next)=>{
//     res.render('../views/yonetici/duyuru.ejs',{layout:'../views/yonetici/duyuru.ejs'})
// }
// const loginFormunuGoster=(req,res,next)=>{
//     res.render('../views/sayfalar/login.ejs',{layout:'../views/sayfalar/login.ejs'})
// }
// const login=(req,res,next)=>{
//     console.log(req.body)
//     res.render('../views/sayfalar/login.ejs',{layout:'../views/sayfalar/login.ejs'})
// }
// //const AnasayfaGoster=(req,res,next)=>{
// //    res.render('../views/sayfalar/homepage.ejs',{layout:'../views/sayfalar/homepage.ejs'})
// //}
// const kullaniciIslem=(req,res,next)=>{
//     res.render('../views/yonetici/kullanıcıIslemleri.ejs',{layout:'../views/yonetici/kullanıcıIslemleri.ejs'})
// }
// const profil=(req,res,next)=>{
//     res.render('../views/yonetici/profil.ejs',{layout:'../views/yonetici/profil.ejs'})
// }
const bcrypt=require("bcrypt");
const kullanici = require("../models/kullanici.js");
const duyuru = require("../models/duyuru.js");

const anasayfa_get=async function(req, res) {
    try {
        const duyurular=await duyuru.findAll();
        console.log(duyurular);
        res.render("home-login/homepage.ejs", {
            duyurular:duyurular,
        });
    }
    catch(err) {
        console.log(err);
    }
}

const logout_get=async function(req, res) {
    try {
        // await req.session.destroy();
        return res.redirect("/giris");
    }
    catch(err) {
        console.log(err);
    }
}

const login_get=async function(req, res) {
    try {
        res.render("home-login/login.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const login_post=async function(req, res){
    const numara=req.body.kullanıcıNumarası;
    console.log(numara);
    const sifre=req.body.kullanıcıSifre;
    console.log(sifre);
    try{
        const user=await kullanici.findOne({
        where:{
            kullaniciNumara:numara
        }  
      });
      console.log(user);
      if(!user){
        console.log("user");
        return res.render("home-login/login.ejs",{
            message:"Kullanıcı Numarası Hatalı!" 
        })    
      }
      
      //parola kontrolü
      const match=await bcrypt.compare(sifre, user.kullaniciParola);
      if(match){
        req.session.isAuth=1;
        let rol=user.dataValues.rolID;
        //login oldu
        if(rol==1){
            return res.redirect("/admin/kullaniciekle");
        }
        else if(rol==2){
            return res.redirect("/admin/komisyonstajbilgileri");
        }
        else if(rol==3){
            return res.redirect("/admin/ogretmenstajtab");
        }
        else{
            return res.redirect("/");
        }
      }
      else{
        return res.render("home-login/login.ejs",{message:"Şifre Hatalı!" });   
      }  
    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    anasayfa_get,
    login_get,
    login_post,
    logout_get,
}