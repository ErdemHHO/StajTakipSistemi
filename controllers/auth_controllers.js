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
        //login oldu
        return res.redirect("/");
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
    login_get,
    login_post
}