const bcrypt=require("bcrypt");

const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");
const kullanici = require("../models/kullanici.js");
const stajkayit = require("../models/stajkayit.js");
const rol = require("../models/rol.js");
const emailService=require("../helpers/send-mail");
const config = require("../config/config.js");


//******DUYURU SAYFALARI******/

//yonetici duyuru tablosu
const duyurutablosu_get= async function(req, res) {
    const duyurular=await duyuru.findAll();
    try {
        res.render("yonetici/duyurutable.ejs", {
            duyurular:duyurular
        });
    }
    catch(err) {
        console.log(err);
    }
}
// yonetici duyuru olustur islemleri
const duyuruolustur_get= async function(req, res) {
    try {
        res.render("yonetici/duyuruolustur.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const duyuruolustur_post=async function(req, res){
    const duyuruBaslik=req.body.duyuruBaslik;
    const duyuruAciklama=req.body.duyuruAciklama;
    const duyuruTuru=req.body.duyuruTuru;
    try{
      await duyuru.create({duyuruBaslik:duyuruBaslik,duyuruAciklama:duyuruAciklama,duyuruTuru:duyuruTuru})  
      res.render("yonetici/duyuruolustur.ejs", {
        message:"Duyuru Eklendi"
        });
    }
    catch(err){
        console.log(err)
    }
}
// yonetici duyuru güncelle islemleri
const duyuruguncelle_get= async function(req, res) {
    try {
        res.render("yonetici/duyuruolustur.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const duyuruguncelle_post= async function(req,res){
        const duyurubaslık= req.body.duyuruBaslik
        const duyuruacıklama= req.body.duyuruAciklama
        const duyurutur = req.body.duyuruTuru
    
        try {
            const Duyuru=await duyuru.findOne({
                where:{
                    duyuruBaslik: duyurubaslık
                }
            })
    
            if (Duyuru) {
    
                Duyuru.duyuruBaslik = duyurubaslık;
                Duyuru.duyuruAciklama = duyuruacıklama;
                Duyuru.duyuruTuru = duyurutur;
    
                await Duyuru.save();
                console.log("başarılı..")
                return res.render("yonetici/duyuruguncelle.ejs",{
                    message: "Duyuru Güncellendi"
                });
                
            }else{
                return res.render("yonetici/duyuruguncelle.ejs",{
                    message: "Duyuru Bulunamadı"
                });
            }
            
        } catch (err) {
            console.log(err);
        }
}
    
const duyurusil_get= async function(req, res) {
    try {
        res.render("yonetici/duyurusil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const duyurusil_post=async function(req,res){
    const duyuruNumarası = req.body.duyurunumarası;

    console.log(duyuruNumarası);
    try {
        const Duyuru = await duyuru.findByPk(duyuruNumarası);
        if(Duyuru) {
            await Duyuru.destroy({
                where:{
                    duyuruID:duyuruNumarası
                }
            });
            return res.render("yonetici/duyurusil.ejs",{

                message: "Duyuru Silindi"
            });
        }else{
            return res.render("yonetici/duyurusil.ejs",{

                message: " Duyuru Bulunamadı"
            });
        }
    }
    catch(err) {
        console.log(err);
    }

}
//yonetici kullanıci tablo islemleri
const kullanicitablosu_get=async function(req, res) {
    try {
        const kullanicilar=await kullanici.findAll();
        res.render("yonetici/kullanicitable.ejs", {
            kullaniciTable: kullanicilar
        });
    }
    catch(err) {
        console.log(err);
    }
}

//yonetici kullanıci ekle islemleri
const kullaniciekle_get=async function(req, res) {
    const roller=await rol.findAll();
    try {
        res.render("yonetici/kullaniciekle.ejs", {
            rol:roller
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciekle_post=async function(req, res) {
    const kullaniciAd=req.body.kullaniciAd;
    console.log(kullaniciAd);
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;
    const kullaniciParola=req.body.kullaniciParola;
    const hashedPassword=await bcrypt.hash(kullaniciParola,10);
    const kullaniciTelNo=req.body.kullaniciTelNo;
    const kullaniciMail=req.body.kullaniciMail;
    const rolID=req.body.rolID;
    // const rolID=req.body.rolID;
    const kullaniciFakulte=req.body.kullaniciFakulte;
    const kullaniciBolum=req.body.kullaniciBolum;
    const kullaniciSinif=req.body.kullaniciSinif;
    const roller=await rol.findAll();
    try {
        const newUser=await kullanici.create({kullaniciNumara:kullaniciNumara,kullaniciAd:kullaniciAd,kullaniciSoyad:kullaniciSoyad,kullaniciParola:hashedPassword,kullaniciMail:kullaniciMail,kullaniciTelNo:kullaniciTelNo,kullaniciFakulte:kullaniciFakulte,kullaniciBolum:kullaniciBolum,kullaniciSinif:kullaniciSinif,rolID:rolID});
        emailService.sendMail({
            from:config.email.from,
            to:newUser.kullaniciMail,
            subject:"Hesabınız oluşturuldu.",
            text:"Hesabınız başarılı bir şekilde oluşturuldu."
        });
        res.render("yonetici/kullaniciekle.ejs", {
            rol:roller,
            message:"Kullanıcı Eklendi"
        });
        
    }
    catch(err) {
        console.log(err);
        console.log("hatalı ekleme");
    }
}
const kullanicisil_get=async function(req, res) {
    try {
        res.render("yonetici/kullanicisil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullanicisil_post=async function(req,res){
    const kullaniciNumarasi = req.body.kullanicinumarasi;

    console.log(kullaniciNumarasi);
    try {
        const Kullanici = await kullanici.findByPk(kullaniciNumarasi);
        if(Kullanici) {
            await Kullanici.destroy();
            return res.render("yonetici/kullanicisil.ejs",{

                message: "Kullanıcı Silindi"
            });
        }else{
            return res.render("yonetici/kullanicisil.ejs",{

                message: " Kullanıcı Bulunamadı"
            });
        }
        // res.redirect("/admin/kullanicisil");
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciguncelle_get=async function(req,res){
    const roller=await rol.findAll();
    try {
        res.render("yonetici/kullaniciguncelle.ejs", {
            roller:roller
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciguncelle_post=async function(req,res){
    const roller=await rol.findAll();
    const kullaniciAd=req.body.kullaniciAd;
    console.log(kullaniciAd);
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;
    const kullaniciParola=req.body.kullaniciParola;
    const hashedPassword=await bcrypt.hash(kullaniciParola,10);
    const kullaniciTelNo=req.body.kullaniciTelNo;
    const kullaniciMail=req.body.kullaniciMail;
    const rolID=req.body.rolID;
    // const rolID=req.body.rolID;
    const kullaniciFakulte=req.body.kullaniciFakulte;
    const kullaniciBolum=req.body.kullaniciBolum;
    const kullaniciSinif=req.body.kullaniciSinif;

    try {
        const kullanıcı = await kullanici.findOne({
            where: {
                kullaniciNumara: kullaniciNumara
            }

        });
        if (kullanıcı) {
            kullanıcı.kullaniciNumara = kullaniciNumara;
            kullanıcı.kullaniciAd = kullaniciAd;
            kullanıcı.kullaniciSoyad = kullaniciSoyad;
            kullanıcı.kullaniciParola = hashedPassword;
            kullanıcı.kullaniciMail = kullaniciMail;
            kullanıcı.kullaniciTelNo = kullaniciTelNo;
            kullanıcı.kullaniciFakulte = kullaniciFakulte;
            kullanıcı.kullaniciBolum = kullaniciBolum;
            kullanıcı.kullaniciSinif = kullaniciSinif;
            kullanıcı.rolID = rolID;

            await kullanıcı.save();
            console.log("başarılı")
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                message :"Kullanıcı Güncellendi"
            });
        }else{
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                message: " Kullanıcı Bulunamadı"
            });
        }

        
    } catch (err) {
        console.log(err);
    }
}

const profil_get=async function(req, res) {
    try {
        res.render("yonetici/profil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
//yonetici staj-ime bilgi tablosu işlemleri
const stajtable_get=async function(req, res) {
    const stajkayittable=await stajkayit.findAll();
    try {
        res.render("yonetici/stajtable.ejs", {      
            stajkayittable:stajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const stajbasvurudegerlendir_get=async function(req, res) {
    try {
        res.render("yonetici/stajbasvurudegerlendir.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const stajbelgeleri_get=async function(req, res) {
    try {
        res.render("yonetici/stajbelgeleri.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const stajogretmenbelirle_get=async function(req, res) {
    try {
        res.render("yonetici/stajogretmenbelirle.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}


//yonetici staj ime islemleri
const stajimeislemleri_get=async function(req, res) {
    try {
        res.render("yonetici/stajdegerlendir.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}

module.exports={
    stajimeislemleri_get,
    duyuruolustur_get,
    duyuruolustur_post,
    duyurusil_post,
    duyurusil_get,
    kullanicitablosu_get,
    kullaniciekle_get,
    kullaniciekle_post,
    stajtable_get,
    duyurutablosu_get,
    duyuruguncelle_get,
    duyuruguncelle_post,
    stajogretmenbelirle_get,
    stajbelgeleri_get,
    stajbasvurudegerlendir_get,
    profil_get,
    kullaniciguncelle_get,
    kullaniciguncelle_post,
    kullanicisil_get,
    kullanicisil_post
}