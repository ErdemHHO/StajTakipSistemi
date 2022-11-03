const stajkayit = require("../models/stajkayit.js");
const puppeteer = require('puppeteer');
const path = require('path');
const ogrencihome_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencihome.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}

const ogrenciimebasvur_get=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;
    try {
        res.render("ogrenci/ogrenciimebasvur.ejs", { 
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimebasvur_post=async function(req, res) {
    const stajTipiID = 3;   
    const tc = req.body.tc;
    const iban = req.body.iban;
    const ogrenciadres = req.body.ogrenciadres;
    const ogrenciil = req.body.ogrenciil;
    const ogrenciilce = req.body.ogrenciilce;
    const ogrencipostakodu = req.body.ogrencipostakodu;
    const firmaadi=req.body.firmaadi;
    const firmafaaliyetalani=req.body.firmafaaliyetalani;
    const firmaadres=req.body.firmaadres;
    const firmail=req.body.firmail;
    const firmailce=req.body.firmailce;
    const firmapostakodu=req.body.firmapostakodu;
    const firmatelno=req.body.firmatelno;
    const firmafax=req.body.firmafax;
    const firmaeposta=req.body.firmaeposta;
    const unvan=req.body.unvan;
    let devletkatki=req.body.devletkatki;
    const baslangictarihi=req.body.baslangictarihi;
    const bitistarihi=req.body.bitistarihi;
    const isgunu=req.body.isgunu;
    let aile=req.body.aile;
    let genelsaglik=req.body.genelsaglik;
    let yas25=req.body.yas25;
    let cumartesi=req.body.cumartesi;

    try {
        await stajkayit.create({
            stajTipiID:stajTipiID,
            tc:tc,
            iban:iban,
            ogrenciadres:ogrenciadres,
            ogrenciil:ogrenciil,
            ogrenciilce:ogrenciilce,
            ogrencipostakodu:ogrencipostakodu,
            firmaadi:firmaadi,
            faaliyetalani:firmafaaliyetalani,
            firmaadres:firmaadres,
            firmail:firmail,
            firmailce:firmailce,
            firmapostakodu:firmapostakodu,
            firmatelno:firmatelno,
            firmafax:firmafax,
            firmaeposta:firmaeposta,
            unvan:unvan,
            devletkatki:devletkatki,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
            aile:aile,
            genelsaglik:genelsaglik,
            yas25:yas25,
            cumartesi:cumartesi,
        })
        res.render("ogrenci/ogrencistaj1basvur.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimebasvurubelgesi_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimebasvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimedegerlendirme_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimedegerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimerapor_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrenciimerapor.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}

const ogrencistaj1basvur_get=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;
    try {
        res.render("ogrenci/ogrencistaj1basvur.ejs", {      
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1basvur_post=async function(req, res) {
    const stajTipiID = 1;   
    const tc = req.body.tc;
    const uyruk = req.body.uyruk;
    const ogrenciadres = req.body.ogrenciadres;
    const ogrenciil = req.body.ogrenciil;
    const ogrenciilce = req.body.ogrenciilce;
    const ogrencipostakodu = req.body.ogrencipostakodu;
    const firmaadi=req.body.firmaadi;
    const firmafaaliyetalani=req.body.firmafaaliyetalani;
    const firmaadres=req.body.firmaadres;
    const firmail=req.body.firmail;
    const firmailce=req.body.firmailce;
    const firmapostakodu=req.body.firmapostakodu;
    const firmatelno=req.body.firmatelno;
    const firmafax=req.body.firmafax;
    const firmaeposta=req.body.firmaeposta;
    const unvan=req.body.unvan;
    let devletkatki=req.body.devletkatki;
    const baslangictarihi=req.body.baslangictarihi;
    const bitistarihi=req.body.bitistarihi;
    const isgunu=req.body.isgunu;
    let aile=req.body.aile;
    let genelsaglik=req.body.genelsaglik;
    let yas25=req.body.yas25;
    let cumartesi=req.body.cumartesi;

    try {
        await stajkayit.create({
            stajTipiID:stajTipiID,
            tc:tc,
            uyruk:uyruk,
            ogrenciadres:ogrenciadres,
            ogrenciil:ogrenciil,
            ogrenciilce:ogrenciilce,
            ogrencipostakodu:ogrencipostakodu,
            firmaadi:firmaadi,
            faaliyetalani:firmafaaliyetalani,
            firmaadres:firmaadres,
            firmail:firmail,
            firmailce:firmailce,
            firmapostakodu:firmapostakodu,
            firmatelno:firmatelno,
            firmafax:firmafax,
            firmaeposta:firmaeposta,
            unvan:unvan,
            devletkatki:devletkatki,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
            aile:aile,
            genelsaglik:genelsaglik,
            yas25:yas25,
            cumartesi:cumartesi,
        })
        res.redirect("/ogrenci/pdfstaj1");
    }
    catch(err) {
        console.log(err);
    } 
}
const ogrencistaj1basvurubelgesi_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1degerlendirme_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1degerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1rapor_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj1rapor.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}

const ogrencistaj2basvur_get=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;
    try {
        res.render("ogrenci/ogrencistaj2basvur.ejs", {    
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta  
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2basvur_post=async function(req, res) {
    const stajTipiID = 2;   
    const tc = req.body.tc;
    const uyruk = req.body.uyruk;
    const ogrenciadres = req.body.ogrenciadres;
    const ogrenciil = req.body.ogrenciil;
    const ogrenciilce = req.body.ogrenciilce;
    const ogrencipostakodu = req.body.ogrencipostakodu;
    const firmaadi=req.body.firmaadi;
    const firmafaaliyetalani=req.body.firmafaaliyetalani;
    const firmaadres=req.body.firmaadres;
    const firmail=req.body.firmail;
    const firmailce=req.body.firmailce;
    const firmapostakodu=req.body.firmapostakodu;
    const firmatelno=req.body.firmatelno;
    const firmafax=req.body.firmafax;
    const firmaeposta=req.body.firmaeposta;
    const unvan=req.body.unvan;
    let devletkatki=req.body.devletkatki;
    const baslangictarihi=req.body.baslangictarihi;
    const bitistarihi=req.body.bitistarihi;
    const isgunu=req.body.isgunu;
    let aile=req.body.aile;
    let genelsaglik=req.body.genelsaglik;
    let yas25=req.body.yas25;
    let cumartesi=req.body.cumartesi;

    try {
        await stajkayit.create({
            stajTipiID:stajTipiID,
            tc:tc,
            uyruk:uyruk,
            ogrenciadres:ogrenciadres,
            ogrenciil:ogrenciil,
            ogrenciilce:ogrenciilce,
            ogrencipostakodu:ogrencipostakodu,
            firmaadi:firmaadi,
            faaliyetalani:firmafaaliyetalani,
            firmaadres:firmaadres,
            firmail:firmail,
            firmailce:firmailce,
            firmapostakodu:firmapostakodu,
            firmatelno:firmatelno,
            firmafax:firmafax,
            firmaeposta:firmaeposta,
            unvan:unvan,
            devletkatki:devletkatki,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
            aile:aile,
            genelsaglik:genelsaglik,
            yas25:yas25,
            cumartesi:cumartesi,
        })
        res.render("ogrenci/ogrencistaj1basvur.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
//STAJ 2 BASVURU BELGESİ
const ogrencistaj2basvurubelgesi_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
//STAJ 2 DEĞERLENDİRME
const ogrencistaj2degerlendirme_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2degerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
//STAJ2 RAPOR
const ogrencistaj2rapor_get=async function(req, res) {
    try {
        res.render("ogrenci/ogrencistaj2rapor.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
//PROFİL
const profilOgrenci_get=async function(req, res) {
    try {
        res.render("ogrenci/profilOgrenci.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
//PDF GET 
const staj1pdf_get=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const staj1pdf = await stajkayit.findOne({
        where:{
            stajTipiID:1,
            kullaniciNumara:kullaniciNumara
        }
    });
    
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;
    const tc = staj1pdf.tc;
    const uyruk = staj1pdf.uyruk;
    const ogrenciadres = staj1pdf.ogrenciadres;
    const ogrenciil = staj1pdf.ogrenciil;
    const ogrenciilce = staj1pdf.ogrenciilce;
    const ogrencipostakodu = staj1pdf.ogrencipostakodu;
    const firmaadi = staj1pdf.firmaadi;
    const faaliyetalani = staj1pdf.faaliyetalani;
    const firmaadres = staj1pdf.firmaadres;
    const firmail = staj1pdf.firmail;
    const firmailce = staj1pdf.firmailce;
    const firmapostakodu = staj1pdf.firmapostakodu;
    const firmatelno = staj1pdf.firmatelno;
    const firmafax = staj1pdf.firmafax;
    const firmaeposta = staj1pdf.firmaeposta;
    const unvan = staj1pdf.unvan;
    const baslangictarihi = staj1pdf.baslangictarihi;
    const bitistarihi = staj1pdf.bitistarihi;
    const isgunu = staj1pdf.isgunu;
    const devletkatki = staj1pdf.devletkatki;
    const aile= staj1pdf.aile;
    const genelsaglik= staj1pdf.genelsaglik;
    const yas25= staj1pdf.yas25;
    const cumartesi= staj1pdf.cumartesi;

    try { 
        res.render("ogrenci/pdfstaj1.ejs", {
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            tc:tc,
            uyruk:uyruk,
            ogrenciadres:ogrenciadres,
            ogrenciil:ogrenciil,
            ogrenciilce:ogrenciilce,
            ogrencipostakodu:ogrencipostakodu,
            firmaadi:firmaadi,
            faaliyetalani:faaliyetalani,
            firmaadres:firmaadres,
            firmail:firmail,
            firmailce:firmailce,
            firmapostakodu:firmapostakodu,
            firmatelno:firmatelno,
            firmafax:firmafax,
            firmaeposta:firmaeposta,
            unvan:unvan,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
            devletkatki:devletkatki,
            aile:aile,
            genelsaglik:genelsaglik,
            yas25:yas25,
            cumartesi:cumartesi,
        });

    // (async () => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.goto('http://localhost:3000/ogrenci/pdfstaj1', {
    //     waitUntil: 'networkidle2',
    //     });
    //     await page.setViewport({ width: 1800, height: 1050 });
    //     await page.pdf({ 
    //     path: path.join(__dirname,'../../../../Downloads','erdem123.pdf'), 
    //     format: 'a4',
    //     fullPage:true,
    //     });
    
    //     await browser.close();
    // })();

    }
    catch(err) {
        console.log(err);
    }
}
const pdfime_get=async function(req, res) {
    const imepdf = await stajkayit.findOne({
        where:{
            stajKayitID:12350
        }
    });
    const tc = imepdf.tc;
    const iban = imepdf.iban;
    const ogrenciadres = imepdf.ogrenciadres;
    const ogrenciil = imepdf.ogrenciil;
    const ogrenciilce = imepdf.ogrenciilce;
    const ogrencipostakodu = imepdf.ogrencipostakodu;
    const firmaadi = imepdf.firmaadi;
    const faaliyetalani = imepdf.faaliyetalani;
    const firmaadres = imepdf.firmaadres;
    const firmail = imepdf.firmail;
    const firmailce = imepdf.firmailce;
    const firmapostakodu = imepdf.firmapostakodu;
    const firmatelno = imepdf.firmatelno;
    const firmafax = imepdf.firmafax;
    const firmaeposta = imepdf.firmaeposta;
    const unvan = imepdf.unvan;
    const baslangictarihi = imepdf.baslangictarihi;
    const bitistarihi = imepdf.bitistarihi;
    const isgunu = imepdf.isgunu;
    const devletkatki = imepdf.devletkatki;
    const aile= imepdf.aile;
    const genelsaglik= imepdf.genelsaglik;
    const yas25= imepdf.yas25;
    const cumartesi= imepdf.cumartesi;

    try {
        
        res.render("ogrenci/pdfime.ejs", {
            tc:tc,
            iban:iban,
            ogrenciadres:ogrenciadres,
            ogrenciil:ogrenciil,
            ogrenciilce:ogrenciilce,
            ogrencipostakodu:ogrencipostakodu,
            firmaadi:firmaadi,
            faaliyetalani:faaliyetalani,
            firmaadres:firmaadres,
            firmail:firmail,
            firmailce:firmailce,
            firmapostakodu:firmapostakodu,
            firmatelno:firmatelno,
            firmafax:firmafax,
            firmaeposta:firmaeposta,
            unvan:unvan,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
            devletkatki:devletkatki,
            aile:aile,
            genelsaglik:genelsaglik,
            yas25:yas25,
            cumartesi:cumartesi,
        });
    }
    catch(err) {
        console.log(err);
    }
}

module.exports={
    ogrencihome_get,ogrenciimebasvur_get,ogrenciimebasvurubelgesi_get,ogrenciimedegerlendirme_get,ogrenciimerapor_get,ogrencistaj1basvur_get,ogrencistaj1basvurubelgesi_get,ogrencistaj1degerlendirme_get,ogrencistaj1rapor_get,ogrencistaj2basvur_get,ogrencistaj2basvurubelgesi_get,ogrencistaj2degerlendirme_get,ogrencistaj2rapor_get,profilOgrenci_get,staj1pdf_get,ogrenciimebasvur_post,ogrencistaj1basvur_post,ogrencistaj2basvur_post,pdfime_get
}
