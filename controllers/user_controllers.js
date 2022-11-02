const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");

const ogrencihome=async function(req, res) {
    try {
        res.render("ogrenci/ogrencihome.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimebasvur=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimebasvur.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimebasvurubelgesi=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimebasvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimedegerlendirme=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimedegerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimerapor=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimerapor.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1basvur=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1basvur.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1basvurubelgesi=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1degerlendirme=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1degerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1rapor=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1rapor.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2basvur=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2basvur.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2basvurubelgesi=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2degerlendirme=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2degerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2rapor=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2rapor.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const profilOgrenci=async function(req, res) {
    try {
        res.render("ogrenci/profilOgrenci.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}

module.exports={
    ogrencihome,ogrenciimebasvur,ogrenciimebasvurubelgesi,ogrenciimedegerlendirme,ogrenciimerapor,ogrencistaj1basvur,ogrencistaj1basvurubelgesi,ogrencistaj1degerlendirme,ogrencistaj1rapor,ogrencistaj2basvur,ogrencistaj2basvurubelgesi,ogrencistaj2degerlendirme,ogrencistaj2rapor,profilOgrenci
}
