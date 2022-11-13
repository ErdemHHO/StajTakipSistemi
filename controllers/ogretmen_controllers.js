const db = require("../data/db.js");
const stajkayit = require("../models/stajkayit.js");
const stajtipi = require("../models/stajtipi.js");
const stajbelgeler = require("../models/stajbelgeler.js");

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

const ogretmenbelgegor_get=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    let kullaniciNumarasi="---------";
    try {
        res.render("ogretmen/belgelerogretmen.ejs", {
            stajTipi:stajTipi,
            kullaniciNumarasi:kullaniciNumarasi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogretmenbelgegor_post=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    const kullaniciNumarasiOgretmen=req.body.kullaniciNumarasi;
    global.kullaniciNumarasiOgretmen=kullaniciNumarasiOgretmen;
    const stajTipiSecim=req.body.stajTipiSecim;
    console.log(stajTipiSecim);
    let secim=0;
    if(stajTipiSecim==1){
        secim=1;
    }
    if(stajTipiSecim==2){
        secim=2;
    }
    if(stajTipiSecim==3){
        secim=3;
    }
    console.log(stajTipiSecim);
    const stajbelgelerara = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:stajTipiSecim
        }
    });
    try {
        if(stajbelgelerara){
            const basvuruForm=stajbelgelerara.basvuruForm;
            const degerlendirmeFormu=stajbelgelerara.degerlendirmeFormu;
            const stajRaporu=stajbelgelerara.stajRaporu;
            if(basvuruForm && degerlendirmeFormu && stajRaporu){
                return res.render("ogretmen/belgelerogretmen.ejs", {
                    kullaniciNumarasi:kullaniciNumarasiOgretmen,
                    stajTipi:stajTipi,  
                    basvuruForm:basvuruForm,
                    degerlendirmeFormu:degerlendirmeFormu,
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(basvuruForm && degerlendirmeFormu){
                return res.render("ogretmen/belgelerogretmen.ejs", { 
                    kullaniciNumarasi:kullaniciNumarasiOgretmen,  
                    stajTipi:stajTipi,    
                    basvuruForm:basvuruForm,
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
            else if(basvuruForm && stajRaporu){
                return res.render("ogretmen/belgelerogretmen.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiOgretmen,
                    stajTipi:stajTipi,   
                    basvuruForm:basvuruForm,
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(stajRaporu && degerlendirmeFormu){
                return res.render("ogretmen/belgelerogretmen.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiOgretmen,
                    stajTipi:stajTipi,   
                    stajRaporu:stajRaporu,
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
            else if(stajRaporu){
                return res.render("ogretmen/belgelerogretmen.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiOgretmen,
                    stajTipi:stajTipi,   
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(degerlendirmeFormu){
                return res.render("ogretmen/belgelerogretmen.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiOgretmen,
                    stajTipi:stajTipi,   
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
        }
        res.render("ogretmen/belgelerogretmen.ejs", {
            stajTipi:stajTipi,
            message:"Kullanıcı staj bilgisi bulunamadı.",
            renk:"danger"
        });
    }
    catch(err) {
        console.log(err);
    }
}

const download3basvuru=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:3
        }
    })
    const basvuru=form.basvuruForm;
    try {
        if(basvuru){
            res.download("./public/file/"+basvuru);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download3degerlendirme=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:3
        }
    })
    const degerlendirmeFormu=form.degerlendirmeFormu;
    try {
        if(degerlendirmeFormu){
            res.download("./public/file/"+degerlendirmeFormu);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download3rapor=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:3
        }
    })
    const rapor=form.stajRaporu;
    try {
        if(rapor){
            res.download("./public/file/"+rapor);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download2basvuru=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:2
        }
    })
    const basvuru=form.basvuruForm;
    try {
        if(basvuru){
            res.download("./public/file/"+basvuru);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download2degerlendirme=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:2
        }
    })
    const degerlendirmeFormu=form.degerlendirmeFormu;
    try {
        if(degerlendirmeFormu){
            res.download("./public/file/"+degerlendirmeFormu);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download2rapor=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:2
        }
    })
    const rapor=form.stajRaporu;
    try {
        if(rapor){
            res.download("./public/file/"+rapor);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download1basvuru=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:1
        }
    })
    const basvuru=form.basvuruForm;
    try {
        if(basvuru){
            res.download("./public/file/"+basvuru);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download1degerlendirme=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:1
        }
    })
    const degerlendirmeFormu=form.degerlendirmeFormu;
    try {
        if(degerlendirmeFormu){
            res.download("./public/file/"+degerlendirmeFormu);
        }
    }
    catch(err) {
        console.log(err);
    }
}
const download1rapor=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasiOgretmen,
            stajTipiID:1
        }
    })
    const rapor=form.stajRaporu;
    try {
        if(rapor){
            res.download("./public/file/"+rapor);
        }
    }
    catch(err) {
        console.log(err);
    }
}



module.exports={
    profilOgretmen_get,
    degerlendirogretmen_get,
    stajogretmentable_get,
    ogretmenbelgegor_get,
    ogretmenbelgegor_post,
    download3basvuru,
    download3degerlendirme,
    download3rapor,
    download2basvuru,
    download2degerlendirme,
    download2rapor,
    download1basvuru,
    download1degerlendirme,
    download1rapor,
}