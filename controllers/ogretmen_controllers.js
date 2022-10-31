const db = require("../data/db.js");
const stajkayit = require("../models/stajkayit.js");


const stajogretmentable_get=async function(req, res) {
    const ogretmenstajkayittable=await stajkayit.findAll();
    try {
        res.render("ogretmen/stajogretmentable.ejs", {      
            stajdegerlendirme:ogretmenstajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const degerlendirogretmen_get=async function(req, res) {
    const ogretmenstajkayittable=await stajkayit.findAll();
    try {
        res.render("ogretmen/degerlendirogretmen.ejs", {      
            stajdegerlendirme:ogretmenstajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const profilOgretmen_get=async function(req, res) {
    const ogretmenstajkayittable=await stajkayit.findAll();
    try {
        res.render("ogretmen/profilOgretmen.ejs", {      
            stajdegerlendirme:ogretmenstajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const belgelerogretmen_get=async function(req, res) {
    const ogretmenstajkayittable=await stajkayit.findAll();
    try {
        res.render("ogretmen/belgelerogretmen.ejs", {      
            stajdegerlendirme:ogretmenstajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}



module.exports={
    belgelerogretmen_get,profilOgretmen_get,degerlendirogretmen_get,stajogretmentable_get
}