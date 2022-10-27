const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");
const kullanici = require("../models/kullanici.js");

//staj ime islemleri
const stajimeislemleri_get=async function(req, res) {
    try {
        res.render("yonetici/stajImeIslemleri.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}

//duyuru olustur
const duyuruolustur_get= async function(req, res) {
    try {
        res.render("yonetici/duyuru.ejs", {
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
      
    }
    catch(err){
        console.log(err)
    }
}

//kullanıci islemleri
const kullaniciislemleri_get=async function(req, res) {
    try {
        const kullanicilar=await kullanici.findAll();
        res.render("yonetici/kullanıcıIslemleri.ejs", {
            kullaniciTable: kullanicilar
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciislemleri_post=async function(req, res) {
    const kullaniciAd=req.body.kullaniciAd;
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;
    const kullaniciParola=req.body.kullaniciParola;
    const kullaniciTelNo=req.body.kullaniciTelNo;
    const kullaniciMail=req.body.kullaniciMail;
    const rolID=req.body.rolID;
    const kullaniciFakulte=req.body.kullaniciFakulte;
    const kullaniciBolum=req.body.kullaniciBolum;
    const kullaniciSinif=req.body.kullaniciSinif;
    try {
        await kullanici.create({kullaniciNumara:kullaniciNumara,kullaniciAd:kullaniciAd,kullaniciSoyad:kullaniciSoyad,kullaniciParola:kullaniciParola,kullaniciMail:kullaniciMail,kullaniciTelNo:kullaniciTelNo,kullaniciFakulte:kullaniciFakulte,kullaniciBolum:kullaniciBolum,kullaniciSinif:kullaniciSinif,rolID:rolID});
    }
    catch(err) {
        console.log(err);
        console.log("hatalı ekleme");
    }
}

module.exports={
    stajimeislemleri_get,
    duyuruolustur_get,
    duyuruolustur_post,
    kullaniciislemleri_get,
    kullaniciislemleri_post
}