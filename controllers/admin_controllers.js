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

module.exports={
    stajimeislemleri_get,
    duyuruolustur_get,
    duyuruolustur_post,
    kullaniciislemleri_get
}