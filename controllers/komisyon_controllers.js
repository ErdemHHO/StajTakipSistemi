const db = require("../data/db.js");
const stajkayit = require("../models/stajkayit.js");
const sorumluluk = require("../models/sorumluluk.js");
const stajtipi = require("../models/stajtipi.js");
const kullanici = require("../models/kullanici.js");


//komisyon kullanıcı tablosu
const komisyonstajtablosu_get=async function(req, res) {
    const stajkayittable=await stajkayit.findAll();
    try {
        res.render("komisyon/komisyonstajimetable.ejs", {      
            stajkayittable:stajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}
//komisyon staj tablosu
const komisyonkullanicitablosu_get=async function(req, res) {
    try {
        const kullaniciTable=await kullanici.findAll();
        res.render("komisyon/komisyonkullanıcıtable.ejs", {
            kullaniciTable: kullaniciTable
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonsorumluluk_get=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    try {
        res.render("komisyon/komisyonsorumluluk.ejs", {
            stajTipi:stajTipi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonsorumluluk_post=async function(req, res) {
    const kullaniciNumarasi=req.body.kullaniciNumarasi;
    const stajTipiSecim=req.body.stajTipiSecim;
    let sorumluMu=req.body.sorumlu;
    console.log(sorumluMu);
    const sorumluKontrol = await sorumluluk.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:stajTipiSecim
        }
    })
    const stajTipi=await stajtipi.findAll();
    try {
        if(sorumluKontrol){
            sorumluKontrol.kullaniciNumara = kullaniciNumarasi;
            sorumluKontrol.stajTipiID = stajTipiSecim;
            sorumluKontrol.sorumluMu = sorumluMu;
            await sorumluKontrol.save();
            console.log("başarılı")
            return res.render("komisyon/komisyonsorumluluk.ejs",{
                stajTipi:stajTipi,
                message:"Kullanıcının staj sorumluluk bilgisi güncellendi.",
                renk:"success"
            });
        }
        await sorumluluk.create({kullaniciNumara:kullaniciNumarasi,stajTipiID:stajTipiSecim,sorumluMu:sorumluMu});  
        res.render("komisyon/komisyonsorumluluk.ejs", {
            stajTipi:stajTipi,
            message:"Kullanıcının staj sorumluluk bilgisi oluşturuldu.",
            renk:"success"
        });
    }
    catch(err) {
        res.render("komisyon/komisyonsorumluluk.ejs", {
            stajTipi:stajTipi,
            message:"Hatalı işlem!!!",
            renk:"danger"
        });
        console.log(err);
    }
}
const komisyonbasvurubelge_get=async function(req, res) {
    try {
        res.render("komisyon/komisyonbasvurubelge.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyondegerlendirme_get=async function(req, res) {
    try {
        res.render("komisyon/komisyondegerlendirme.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonstajogrbelirle_get=async function(req, res) {
    try {
        res.render("komisyon/komisyonstajogrbelirle.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const profilKomisyon_get=async function(req, res) {
    try {
        res.render("komisyon/profilKomisyon.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonbelgegor_get=async function(req, res) {
    try {
        res.render("komisyon/komisyonbelgegor.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}

module.exports={
    komisyonkullanicitablosu_get,
    komisyonstajtablosu_get,
    komisyonbasvurubelge_get,
    komisyondegerlendirme_get,
    komisyonstajogrbelirle_get,
    profilKomisyon_get,
    komisyonbelgegor_get,
    komisyonsorumluluk_get,
    komisyonsorumluluk_post

}