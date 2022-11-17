const bcrypt=require("bcrypt");
const emailService=require("../helpers/send-mail");
const config = require("../config/config.js");
const kullanici = require("../models/kullanici.js");
const duyuru = require("../models/duyuru.js");

const loading_get=async function(req, res) {
    try {
        setTimeout(function(){     
            if(rol==1){
                return res.redirect("/admin/kullanicitablosu");
            }
            else if(rol==2){
                return res.redirect("/komisyon/kullanicitablosu");
            }
            else if(rol==3){
                return res.redirect("/ogretmen/stajtablosu");
            }
            if(rol==4){
                return res.redirect("/ogrenci/anasayfa");
            }
            }, 1000);
    }
    catch(err) {
        console.log(err);
    }
}


const anasayfa_get=async function(req, res) {
    try {
        const duyurular=await duyuru.findAll();
        console.log(duyurular);
        return res.render("home-login/homepage.ejs", {
            duyurular:duyurular,
        });
    }
    catch(err) {
        console.log(err);
    }
}

const logout_get=async function(req, res) {
    try {
        await req.session.destroy();
        return res.redirect("/");
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
        req.session.isAuth=true;
        req.session.kullaniciAd=user.kullaniciAd;
        req.session.kullaniciSoyad=user.kullaniciSoyad;
        req.session.kullaniciNumara=user.kullaniciNumara;
        req.session.kullaniciMail=user.kullaniciMail;
        req.session.kullaniciTelNo=user.kullaniciTelNo;
        req.session.kullaniciFakulte=user.kullaniciFakulte;
        req.session.kullaniciBolum=user.kullaniciBolum;
        req.session.kullaniciSinif=user.kullaniciSinif;
        req.session.rolID=user.rolID;
        let rol=user.dataValues.rolID;
        global.rol=rol;
        //login oldu
        return res.redirect("/loading");
      }
      else{
        return res.render("home-login/login.ejs",{message:"Şifre Hatalı!" });   
      }  
    }
    catch(err){
        console.log(err)
    }
}
const sifreSifirlama_post=async function(req, res) {
    const numara=req.body.kullaniciNumarası;
    console.log(numara);
    const telNo=req.body.telefonNumarasi;
    console.log(telNo);
    const email=req.body.kullaniciMail;
    console.log(telNo);
    const yeniSifre=req.body.yeniKullaniciSifre;
    const hashedPassword=await bcrypt.hash(yeniSifre,10);
    const yeniSifreTekrar=req.body.yeniKullaniciSifreTekrar;
    try {
        const user=await kullanici.findOne({
            where:{
                kullaniciNumara:numara,
                kullaniciTelNo:telNo,
                kullaniciMail:email
            }  
          })
        if(!user){
            console.log("user");
            console.log("Numarası Hatalı");
            return res.render("home-login/sifreSifirlama.ejs",{
                message:"Girilen Bilgiler Hatalı!" ,
                renk:"danger"
            })    
            }
        if(yeniSifre==yeniSifreTekrar){
            user.kullaniciParola=hashedPassword;
            emailService.sendMail({
                from:config.email.from,
                to:user.kullaniciMail,
                subject:"Şifreniz Güncellendi.",
                text:"Şifreniz Başarılı Bir Şekilde Güncellendi. Yeni Şifreniz:" + yeniSifre
                });
            await user.save();
            console.log("------------Sifre Güncellendi--------------");
            return res.render("home-login/sifreSifirlama.ejs",{
                message:"Şifreniz Güncellendi Giriş Yapabilirsiniz",
                renk:"success" 
            });  
            
        }
        else{
            console.log("Şifreler Aynı Değil");
            return res.render("home-login/sifreSifirlama.ejs",{
                message:"Girdiğiniz Şifreler Aynı Değil",
                renk:"danger"  
            });  
        }
                 
        }
            
        catch(err) {
            console.log(err);
        }
        }
const sifreSifirlama_get=async function(req, res) {
    try {
        res.render("home-login/sifreSifirlama.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
module.exports={
    anasayfa_get,
    login_get,
    login_post,
    logout_get,
    sifreSifirlama_get,
    sifreSifirlama_post,
    loading_get
}