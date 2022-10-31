const bcrypt=require("bcrypt");

const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");
const kullanici = require("../models/kullanici.js");
const stajkayit = require("../models/stajkayit.js");
const rol = require("../models/rol.js");


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

//yonetici staj ime islemleri
const stajimeislemleri_get=async function(req, res) {
    try {
        res.render("yonetici/stajImeIslemleri.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}

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
const duyuruguncelle_post=async function(req, res){
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

const duyurusil_get= async function(req, res) {
    try {
        res.render("yonetici/duyurusil.ejs", {
        });
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
    try {
        await kullanici.create({kullaniciNumara:kullaniciNumara,kullaniciAd:kullaniciAd,kullaniciSoyad:kullaniciSoyad,kullaniciParola:hashedPassword,kullaniciMail:kullaniciMail,kullaniciTelNo:kullaniciTelNo,kullaniciFakulte:kullaniciFakulte,kullaniciBolum:kullaniciBolum,kullaniciSinif:kullaniciSinif,rolID:rolID});
    }
    catch(err) {
        console.log(err);
        console.log("hatalı ekleme");
    }
}
const kullanicisil_get=async function(req, res) {
    try {
        res.render("yonetici/kullanicısil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciguncelle_get=async function(req, res) {
    try {
        res.render("yonetici/kullanıcıguncelle.ejs", {
        });
    }
    catch(err) {
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
module.exports={
    stajimeislemleri_get,
    duyuruolustur_get,
    duyuruolustur_post,
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
    kullanicisil_get,

}