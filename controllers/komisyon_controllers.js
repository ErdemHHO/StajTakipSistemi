const db = require("../data/db.js");
const stajkayit = require("../models/stajkayit.js");
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
    komisyonbelgegor_get

}