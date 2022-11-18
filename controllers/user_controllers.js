const stajkayit = require("../models/stajkayit.js");
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require("fs");
const stajbelgeler = require("../models/stajbelgeler.js");
const sorumluluk = require("../models/sorumluluk.js");
const stajdegerlendirme = require("../models/stajdegerlendirme.js");
const stajdurum = require("../models/stajdurum");

const erisim_get=async function(req, res) {
    try {
        res.render("ogrenci/goruntuleme.ejs", { 
        });
    }
    catch(err) {
        console.log(err);
    }
}

const ogrencihome_get=async function(req, res) {
    const kullaniciNumarasi=req.session.kullaniciNumara;

    const stajdegerlendirme1 = await stajdegerlendirme.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:1
        }
    });
    const stajdegerlendirme2 = await stajdegerlendirme.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:2
        }
    });
    const stajdegerlendirme3 = await stajdegerlendirme.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:3
        }
    });

    let stajDurum1=stajdegerlendirme1.durumID;
    let stajDurum2=stajdegerlendirme2.durumID;
    let stajDurum3=stajdegerlendirme3.durumID;

    const durumsorgu1 = await stajdurum.findOne({
        where:{
            durumID:stajDurum1
        }
    });
    const durumsorgu2 = await stajdurum.findOne({
        where:{
            durumID:stajDurum2
        }
    });
    const durumsorgu3 = await stajdurum.findOne({
        where:{
            durumID:stajDurum3
        }
    });

    let durumGor1=durumsorgu1.durum;
    let durumGor2=durumsorgu2.durum;
    let durumGor3=durumsorgu3.durum;
    console.log(durumGor1);
    console.log(durumGor2);
    console.log(durumGor3);


    const sorumluStaj1 = await sorumluluk.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:1
        }
    });
    const sorumluStaj2 = await sorumluluk.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:2
        }
    });
    const sorumluStaj3 = await sorumluluk.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:3
        }
    });
    let disable1="disabled";
    let disable2="disabled";
    let disable3="disabled";
    let bilgi1="Bu dersten sorumlu değilsiniz";
    let bilgi2="Bu dersten sorumlu değilsiniz";
    let bilgi3="Bu dersten sorumlu değilsiniz";
    if(sorumluStaj1){    
        if(sorumluStaj1.sorumluMu==1){disable1=""; bilgi1=" "}
    }
    if(sorumluStaj2){
        if(sorumluStaj2.sorumluMu==1){disable2=""; bilgi2=" "}
    }
    if(sorumluStaj3){
        if(sorumluStaj3.sorumluMu==1){disable3=""; bilgi3=" "}
    }
    const rolKontrol=req.session.rolID;
    try {
        if(rolKontrol!=4){
            return res.redirect("/ogrenci/erisim");
        }
        res.render("ogrenci/ogrencihome.ejs", {      
            disable1,disable2,disable3,durumGor1,durumGor2,durumGor3,bilgi1,bilgi2,bilgi3
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
    const rolKontrol=req.session.rolID;
    let disabled="";
    const kayitarama = await stajkayit.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:3
        }
    })
    if(!kayitarama){
        disabled="disabled";
    }
    try {
        if(rolKontrol!=4){
            return res.redirect("/ogrenci/erisim");
        }
        res.render("ogrenci/ogrenciimebasvur.ejs", { 
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            disabled:disabled
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimebasvur_post=async function(req, res) {
    const kullaniciNumara1=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;

    const stajTipiID = 3;
    const kullaniciNumara = req.body.kullaniciNumara;
    const kayitara = await stajkayit.findOne({
        where:{
            kullaniciNumara:kullaniciNumara1,
            stajTipiID:3
        }
    })

    const kullaniciAd = req.body.kullaniciAd;
    const kullaniciSoyad = req.body.kullaniciSoyad;
    const kullaniciTelNo = req.body.kullaniciTelNo; 
    const kullaniciMail= req.body.kullaniciMail;  
    const tc = req.body.tc;
    const uyruk = req.body.uyruk;
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
        if(kayitara){
            kayitara.kullaniciNumara = kullaniciNumara1;
            kayitara.kullaniciAd = kullaniciAd;
            kayitara.kullaniciSoyad = kullaniciSoyad;
            kayitara.kullaniciTelNo = kullaniciTelNo;
            kayitara.kullaniciMail = kullaniciMail;
            kayitara.stajTipiID = stajTipiID;
            kayitara.tc = tc;
            kayitara.iban = iban;
            kayitara.uyruk = uyruk;
            kayitara.isgunu = isgunu;
            kayitara.ogrenciadres = ogrenciadres;
            kayitara.ogrenciil = ogrenciil;
            kayitara.ogrenciilce = ogrenciilce;
            kayitara.ogrencipostakodu = ogrencipostakodu;
            kayitara.firmaadi = firmaadi;
            kayitara.faaliyetalani = firmafaaliyetalani;
            kayitara.firmaadres = firmaadres;
            kayitara.firmail = firmail;
            kayitara.firmailce = firmailce;
            kayitara.firmapostakodu = firmapostakodu;
            kayitara.firmatelno = firmatelno;
            kayitara.firmafax = firmafax;
            kayitara.firmaeposta = firmaeposta;
            kayitara.unvan = unvan;
            kayitara.devletkatki = devletkatki;
            kayitara.baslangictarihi = baslangictarihi;
            kayitara.bitistarihi = bitistarihi;
            kayitara.aile = aile;
            kayitara.genelsaglik = genelsaglik;
            kayitara.yas25 = yas25;
            kayitara.cumartesi = cumartesi;
            await kayitara.save();
            return res.render("ogrenci/ogrenciimebasvur.ejs",{
                message: "Başvuru Güncellendi",
                renk:"success",
                kullaniciNumara:kullaniciNumara1,
                isim:isim,
                soyisim:soyisim,
                telNo:telNo,
                eposta:eposta,
                disabled:""
            });
        }
        await stajkayit.create({
            kullaniciNumara:kullaniciNumara1,
            kullaniciAd:kullaniciAd,
            kullaniciSoyad:kullaniciSoyad,
            kullaniciTelNo:kullaniciTelNo,
            kullaniciMail:kullaniciMail,
            stajTipiID:stajTipiID,
            tc:tc,
            iban:iban,
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
        return res.render("ogrenci/ogrenciimebasvur.ejs",{
            message: "Başvuru Kaydedildi",
            renk:"success",
            kullaniciNumara:kullaniciNumara1,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            disabled:""
        });
    }
    catch(err) {
        console.log(err);
    } 
}
const ogrenciimebasvurubelgesi_get=async function(req, res) {
        const rolKontrol=req.session.rolID;
        if(rolKontrol!=4){
            return res.redirect("/ogrenci/erisim");
        }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:3
        }
    })
    if(form){
            const basvuru=form.basvuruForm;
            if(basvuru){
                return res.render("ogrenci/ogrenciimebasvurubelgesi.ejs", {     
                bilgi:basvuru
            });
            }
            return res.render("ogrenci/ogrenciimebasvurubelgesi.ejs", {      
            });
    }
    try {
        return res.render("ogrenci/ogrenciimebasvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const downloadimebasvuru=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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
const ogrenciimebasvurubelgesi_post = async function(req,res){
    let dosya = req.body.basvuruform;

    console.log(dosya);
    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.basvuruform, err => {
            console.log(err);
        })
    }
    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:3
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:3
            }
        })
        console.log(form);
        if(form){
            form.basvuruForm = dosya;
            await form.save();
            console.log("başarılı")
            if(degerlendirme){
                degerlendirme.durumID = 2
                await degerlendirme.save();
            }
            return res.render("ogrenci/ogrenciimebasvurubelgesi.ejs",{
                message: "Başvuru Formunuz Başarıyla Gönderildi",
                renk:"success",
                bilgi:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:3,basvuruForm:dosya})
            if(degerlendirme){
                degerlendirme.durumID = 2
                await degerlendirme.save();
            }
            return res.render("ogrenci/ogrenciimebasvurubelgesi.ejs",{
                message: "Başvuru Formunuz Başarıyla Gönderildi",
                renk:"success",
                bilgi:dosya
            });
        }

    } catch (error) {
        return res.render("ogrenci/ogrenciimebasvurubelgesi.ejs",{
            message: "Başvuru Formunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }


}

const ogrenciimedegerlendirme_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:3
        }
    })
    
    if(form){
        const degerlendirmeFormu=form.degerlendirmeFormu;
        if(degerlendirmeFormu){
            return res.render("ogrenci/ogrenciimedegerlendirme.ejs", {     
            belge:degerlendirmeFormu
            });
        }
        return res.render("ogrenci/ogrenciimedegerlendirme.ejs", {      
        });

}
    try {
        res.render("ogrenci/ogrenciimedegerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimedegerlendirme_post=async function(req, res) {
    let dosya = req.body.degerlendirmeFormu;

    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.degerlendirmeFormu, err => {
            console.log(err);
        })
    }
    console.log(dosya)
    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:3
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:3
            }
        })
        console.log(form);
        if(form){
            form.degerlendirmeFormu = dosya;
            await form.save();
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            console.log("başarılı")
            return res.render("ogrenci/ogrenciimedegerlendirme.ejs",{
                message: "Değerlendirme Formunuz Başarıyla Gönderildi",
                renk:"success",
                belge:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:3,degerlendirmeFormu:dosya})
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrenciimedegerlendirme.ejs",{
                message: "Değerlendirme Formunuz Başarıyla Gönderildi",
                renk:"success",
                belge:dosya
            });
        }
        
    } catch (error) {
        return res.render("ogrenci/ogrenciimedegerlendirme.ejs",{
            message: "Değerlendirme Formunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}
const downloadimedegerlendirme=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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


const ogrenciimerapor_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:3
        }
    })
    if(form){
            const rapor=form.stajRaporu;
            if(rapor){
                return res.render("ogrenci/ogrenciimerapor.ejs", {     
                download:rapor
                });
            }
           return res.render("ogrenci/ogrenciimerapor.ejs", {      
            }); 
    }
    try {
        return res.render("ogrenci/ogrenciimerapor.ejs", {      
        }); 
    }
    catch(err) {
        console.log(err);
    }
}
const ogrenciimerapor_post=async function(req, res) {
    let dosya = req.body.stajRaporu;

    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.stajRaporu, err => {
            console.log(err);
        })
    }

    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:3
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:3
            }
        })
        console.log(form);
        if(form){
            form.stajRaporu = dosya;
            await form.save();
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            console.log("başarılı")
            return res.render("ogrenci/ogrenciimerapor.ejs",{
                message: "Raporunuz Başarıyla Gönderildi",
                renk:"success",
                download:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:3,stajRaporu:dosya})
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrenciimerapor.ejs",{
                message: "Raporunuz Başarıyla Gönderildi",
                renk:"success",
                download:dosya
            });
        }
        
    } catch (error) {
        return res.render("ogrenci/ogrenciimerapor.ejs",{
            message: "Raporunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}
const downloadimerapor=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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

const ogrencistaj1basvur_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;
    let disabled="";
    const kayitarama = await stajkayit.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:1
        }
    })
    if(!kayitarama){
        disabled="disabled";
    }
    try {
        res.render("ogrenci/ogrencistaj1basvur.ejs", {      
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            disabled:disabled
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1basvur_post=async function(req, res) {
    const kullaniciNumara1=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;

    const stajTipiID = 1;
    const kullaniciNumara = req.body.kullaniciNumara;
    const kayitara = await stajkayit.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:1
        }
    })
    const kullaniciAd = req.body.kullaniciAd;
    const kullaniciSoyad = req.body.kullaniciSoyad;
    const kullaniciTelNo = req.body.kullaniciTelNo; 
    const kullaniciMail= req.body.kullaniciMail;  
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
        if(kayitara){
            kayitara.kullaniciNumara = kullaniciNumara;
            kayitara.kullaniciAd = kullaniciAd;
            kayitara.kullaniciSoyad = kullaniciSoyad;
            kayitara.kullaniciTelNo = kullaniciTelNo;
            kayitara.kullaniciMail = kullaniciMail;
            kayitara.stajTipiID = stajTipiID;
            kayitara.tc = tc;
            kayitara.isgunu = isgunu;
            kayitara.uyruk = uyruk;
            kayitara.ogrenciadres = ogrenciadres;
            kayitara.ogrenciil = ogrenciil;
            kayitara.ogrenciilce = ogrenciilce;
            kayitara.ogrencipostakodu = ogrencipostakodu;
            kayitara.firmaadi = firmaadi;
            kayitara.faaliyetalani = firmafaaliyetalani;
            kayitara.firmaadres = firmaadres;
            kayitara.firmail = firmail;
            kayitara.firmailce = firmailce;
            kayitara.firmapostakodu = firmapostakodu;
            kayitara.firmatelno = firmatelno;
            kayitara.firmafax = firmafax;
            kayitara.firmaeposta = firmaeposta;
            kayitara.unvan = unvan;
            kayitara.devletkatki = devletkatki;
            kayitara.baslangictarihi = baslangictarihi;
            kayitara.bitistarihi = bitistarihi;
            kayitara.aile = aile;
            kayitara.genelsaglik = genelsaglik;
            kayitara.yas25 = yas25;
            kayitara.cumartesi = cumartesi;
            await kayitara.save();
            return res.render("ogrenci/ogrencistaj1basvur.ejs",{
                message: "Başvuru Güncellendi",
                renk:"success",
                kullaniciNumara:kullaniciNumara1,
                isim:isim,
                soyisim:soyisim,
                telNo:telNo,
                eposta:eposta,
                disabled:""
            });
        }
        await stajkayit.create({
            kullaniciNumara:kullaniciNumara,
            kullaniciAd:kullaniciAd,
            kullaniciSoyad:kullaniciSoyad,
            kullaniciTelNo:kullaniciTelNo,
            kullaniciMail:kullaniciMail,
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
        return res.render("ogrenci/ogrencistaj1basvur.ejs",{
            message: "Başvuru Kaydedildi",
            renk:"success",
            kullaniciNumara:kullaniciNumara1,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            disabled:""
        });
    }
    catch(err) {
        console.log(err);
    } 
}

const ogrencistaj1basvurubelgesi_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:1
        }
    })
    if(form){
            const basvuru=form.basvuruForm;
            if(basvuru){
                return res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs", {     
                bilgi:basvuru
            });
            }
            return res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs", {      
            });
    }
    try {
        return res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const downloadstaj1basvuru=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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
const ogrencistaj1basvurubelgesi_post = async function(req,res){
    let dosya = req.body.basvuruform;

    console.log(dosya);
    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.basvuruform, err => {
            console.log(err);
        })
    }

    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:1
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:1
            }
        })
        console.log(form);
        if(form){
            form.basvuruForm = dosya;
            await form.save();
            if(degerlendirme){
                degerlendirme.durumID = 2
                await degerlendirme.save();
            }
            console.log("başarılı")
            return res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs",{
                message: "Başvuru Formunuz Başarıyla Gönderildi",
                renk:"success",
                bilgi:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:1,basvuruForm:dosya})
            if(degerlendirme){
                degerlendirme.durumID = 2
                await degerlendirme.save();
            }
            return res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs",{
                message: "Başvuru Formunuz Başarıyla Gönderildi",
                renk:"success",
                bilgi:dosya
            });
        }

    } catch (error) {
        return res.render("ogrenci/ogrencistaj1basvurubelgesi.ejs",{
            message: "Başvuru Formunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}

const ogrencistaj1degerlendirme_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:1
        }
    })
    
    if(form){
        const degerlendirmeFormu=form.degerlendirmeFormu;
        if(degerlendirmeFormu){
            return res.render("ogrenci/ogrencistaj1degerlendirme.ejs", {     
            belge:degerlendirmeFormu
            });
        }
        return res.render("ogrenci/ogrencistaj1degerlendirme.ejs", {      
        });

}
    try {
        res.render("ogrenci/ogrencistaj1degerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1degerlendirme_post=async function(req, res) {
    let dosya = req.body.degerlendirmeFormu;

    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.degerlendirmeFormu, err => {
            console.log(err);
        })
    }
    console.log(dosya)
    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:1
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:1
            }
        })
        console.log(form);
        if(form){
            form.degerlendirmeFormu = dosya;
            await form.save();
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            console.log("başarılı")
            return res.render("ogrenci/ogrencistaj1degerlendirme.ejs",{
                message: "Değerlendirme Formunuz Başarıyla Gönderildi",
                renk:"success",
                belge:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:1,degerlendirmeFormu:dosya})
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrencistaj1degerlendirme.ejs",{
                message: "Değerlendirme Formunuz Başarıyla Gönderildi",
                renk:"success",
                belge:dosya
            });
        }
        
    } catch (error) {
        return res.render("ogrenci/ogrencistaj1degerlendirme.ejs",{
            message: "Değerlendirme Formunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}
const downloadstaj1degerlendirme=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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


const ogrencistaj1rapor_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:1
        }
    })
    if(form){
            const rapor=form.stajRaporu;
            if(rapor){
                return res.render("ogrenci/ogrencistaj1rapor.ejs", {     
                download:rapor
                });
            }
           return res.render("ogrenci/ogrencistaj1rapor.ejs", {      
            }); 
    }
    try {
        return res.render("ogrenci/ogrencistaj1rapor.ejs", {      
        }); 
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj1rapor_post=async function(req, res) {
    let dosya = req.body.stajRaporu;

    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.stajRaporu, err => {
            console.log(err);
        })
    }

    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:1
            }
        })

        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:1
            }
        })
        console.log(form);
        if(form){
            form.stajRaporu = dosya;
            await form.save();
            console.log("başarılı")
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                    if(degerlendirme){
                        degerlendirme.durumID = 10
                        await degerlendirme.save();
                    }
                }
            return res.render("ogrenci/ogrencistaj1rapor.ejs",{
                message: "Raporunuz Başarıyla Gönderildi",
                renk:"success",
                download:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:1,stajRaporu:dosya})
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrencistaj1rapor.ejs",{
                message: "Raporunuz Başarıyla Gönderildi",
                renk:"success"
            });
        }
        
    } catch (error) {
        return res.render("ogrenci/ogrencistaj1rapor.ejs",{
            message: "Raporunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}
const downloadstaj1rapor=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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

const ogrencistaj2basvur_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;
    let disabled="";
    const kayitarama = await stajkayit.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:2
        }
    })
    if(!kayitarama){
        disabled="disabled";
    }
    try {
        res.render("ogrenci/ogrencistaj2basvur.ejs", {    
            kullaniciNumara:kullaniciNumara,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            disabled:disabled
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2basvur_post=async function(req, res) {
    const kullaniciNumara1=req.session.kullaniciNumara;
    const isim=req.session.kullaniciAd;
    const soyisim=req.session.kullaniciSoyad;
    const telNo=req.session.kullaniciTelNo;
    const eposta=req.session.kullaniciMail;

    const stajTipiID = 2;
    const kullaniciNumara = req.body.kullaniciNumara;
    const kayitara = await stajkayit.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:2
        }
    })
    const kullaniciAd = req.body.kullaniciAd;
    const kullaniciSoyad = req.body.kullaniciSoyad;
    const kullaniciTelNo = req.body.kullaniciTelNo; 
    const kullaniciMail= req.body.kullaniciMail;  
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
        if(kayitara){
            kayitara.kullaniciNumara = kullaniciNumara;
            kayitara.kullaniciAd = kullaniciAd;
            kayitara.kullaniciSoyad = kullaniciSoyad;
            kayitara.kullaniciTelNo = kullaniciTelNo;
            kayitara.kullaniciMail = kullaniciMail;
            kayitara.stajTipiID = stajTipiID;
            kayitara.tc = tc;
            kayitara.isgunu = isgunu;
            kayitara.uyruk = uyruk;
            kayitara.ogrenciadres = ogrenciadres;
            kayitara.ogrenciil = ogrenciil;
            kayitara.ogrenciilce = ogrenciilce;
            kayitara.ogrencipostakodu = ogrencipostakodu;
            kayitara.firmaadi = firmaadi;
            kayitara.faaliyetalani = firmafaaliyetalani;
            kayitara.firmaadres = firmaadres;
            kayitara.firmail = firmail;
            kayitara.firmailce = firmailce;
            kayitara.firmapostakodu = firmapostakodu;
            kayitara.firmatelno = firmatelno;
            kayitara.firmafax = firmafax;
            kayitara.firmaeposta = firmaeposta;
            kayitara.unvan = unvan;
            kayitara.devletkatki = devletkatki;
            kayitara.baslangictarihi = baslangictarihi;
            kayitara.bitistarihi = bitistarihi;
            kayitara.aile = aile;
            kayitara.genelsaglik = genelsaglik;
            kayitara.yas25 = yas25;
            kayitara.cumartesi = cumartesi;
            await kayitara.save();
            return res.render("ogrenci/ogrencistaj2basvur.ejs",{
                message: "Başvuru Güncellendi",
                renk:"success",
                kullaniciNumara:kullaniciNumara1,
                isim:isim,
                soyisim:soyisim,
                telNo:telNo,
                eposta:eposta,
                disabled:""
            });
        }
        await stajkayit.create({
            kullaniciNumara:kullaniciNumara,
            kullaniciAd:kullaniciAd,
            kullaniciSoyad:kullaniciSoyad,
            kullaniciTelNo:kullaniciTelNo,
            kullaniciMail:kullaniciMail,
            stajTipiID:stajTipiID,
            isgunu:isgunu,
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
        return res.render("ogrenci/ogrencistaj2basvur.ejs",{
            message: "Başvuru Kaydedildi",
            renk:"success",
            kullaniciNumara:kullaniciNumara1,
            isim:isim,
            soyisim:soyisim,
            telNo:telNo,
            eposta:eposta,
            disabled:""
        });
    }
    catch(err) {
        console.log(err);
    } 
}

const ogrencistaj2basvurubelgesi_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:2
        }
    })
    if(form){
            const basvuru=form.basvuruForm;
            if(basvuru){
                return res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs", {     
                bilgi:basvuru
            });
            }
            return res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs", {      
            });
    }
    try {
        return res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const downloadstaj2basvuru=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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
const ogrencistaj2basvurubelgesi_post = async function(req,res){
    let dosya = req.body.basvuruform;

    console.log(dosya);
    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.basvuruform, err => {
            console.log(err);
        })
    }
    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:2
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:2
            }
        })
        console.log(form);
        if(form){
            form.basvuruForm = dosya;
            await form.save();
            if(degerlendirme){
                degerlendirme.durumID = 2
                await degerlendirme.save();
            }
            console.log("başarılı")
            return res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs",{
                message: "Başvuru Formunuz Başarıyla Gönderildi",
                renk:"success",
                bilgi:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:2,basvuruForm:dosya})
            if(degerlendirme){
                degerlendirme.durumID = 2
                await degerlendirme.save();
            }
            return res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs",{
                message: "Başvuru Formunuz Başarıyla Gönderildi",
                renk:"success",
                bilgi:dosya
            });
        }

    } catch (error) {
        return res.render("ogrenci/ogrencistaj2basvurubelgesi.ejs",{
            message: "Başvuru Formunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }


}


const ogrencistaj2degerlendirme_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:2
        }
    })
    
    if(form){
        const degerlendirmeFormu=form.degerlendirmeFormu;
        if(degerlendirmeFormu){
            return res.render("ogrenci/ogrencistaj2degerlendirme.ejs", {     
            belge:degerlendirmeFormu
            });
        }
        return res.render("ogrenci/ogrencistaj2degerlendirme.ejs", {      
        });

}
    try {
        res.render("ogrenci/ogrencistaj2degerlendirme.ejs", {      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2degerlendirme_post=async function(req, res) {
    let dosya = req.body.degerlendirmeFormu;

    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.degerlendirmeFormu, err => {
            console.log(err);
        })
    }
    console.log(dosya)
    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:2
            }
        })

        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:2
            }
        })
        console.log(form);
        if(form){
            form.degerlendirmeFormu = dosya;
            await form.save();
            console.log("başarılı")
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrencistaj2degerlendirme.ejs",{
                message: "Değerlendirme Formunuz Başarıyla Gönderildi",
                renk:"success",
                belge:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:2,degerlendirmeFormu:dosya})
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrencistaj2degerlendirme.ejs",{
                message: "Değerlendirme Formunuz Başarıyla Gönderildi",
                renk:"success",
                belge:dosya
            });
        }
        
    } catch (error) {
        return res.render("ogrenci/ogrencistaj2degerlendirme.ejs",{
            message: "Değerlendirme Formunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}
const downloadstaj2degerlendirme=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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


const ogrencistaj2rapor_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:2
        }
    })
    if(form){
            const rapor=form.stajRaporu;
            if(rapor){
                return res.render("ogrenci/ogrencistaj2rapor.ejs", {     
                download:rapor
                });
            }
           return res.render("ogrenci/ogrencistaj2rapor.ejs", {      
            }); 
    }
    try {
        return res.render("ogrenci/ogrencistaj2rapor.ejs", {      
        }); 
    }
    catch(err) {
        console.log(err);
    }
}
const ogrencistaj2rapor_post=async function(req, res) {
    let dosya = req.body.stajRaporu;

    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.stajRaporu, err => {
            console.log(err);
        })
    }

    try {
        const kullaniciNumara=req.session.kullaniciNumara;
        const degerlendirme=await stajdegerlendirme.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:2
            }
        })
        const form = await stajbelgeler.findOne({
            where:{
                kullaniciNumara:kullaniciNumara,
                stajTipiID:2
            }
        })
        console.log(form);
        if(form){
            form.stajRaporu = dosya;
            await form.save();
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            console.log("başarılı")
            return res.render("ogrenci/ogrencistaj2rapor.ejs",{
                message: "Raporunuz Başarıyla Gönderildi",
                renk:"success",
                download:dosya
            });
        }else{
            await stajbelgeler.create({kullaniciNumara:kullaniciNumara,stajTipiID:2,stajRaporu:dosya})
            if(form.degerlendirmeFormu!=null && form.stajRaporu!=null){
                if(degerlendirme){
                    degerlendirme.durumID = 10
                    await degerlendirme.save();
                }
            }
            return res.render("ogrenci/ogrencistaj2rapor.ejs",{
                message: "Raporunuz Başarıyla Gönderildi",
                renk:"success",
                download:dosya
            });
        }
        
    } catch (error) {
        return res.render("ogrenci/ogrencistaj2rapor.ejs",{
            message: "Raporunuz Gönderilemedi",
            renk:"danger"
        });
        console.log(error)
    }
}
const downloadstaj2rapor=async function(req, res) {
    const kullaniciNumara=req.session.kullaniciNumara;
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
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

//PROFİL
const profilOgrenci_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
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
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullanici=req.session.kullaniciNumara;
    const staj1pdf = await stajkayit.findOne({
        where:{
            stajTipiID:1,
            kullaniciNumara:kullanici
        }
    }); 
    const kullaniciNumara=staj1pdf.kullaniciNumara;
    const isim=staj1pdf.kullaniciAd;
    const soyisim=staj1pdf.kullaniciSoyad;
    const telNo=staj1pdf.kullaniciTelNo;
    const eposta=staj1pdf.kullaniciMail;
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
        return res.render("ogrenci/pdfstaj1.ejs",{
            kullaniciNumara:kullaniciNumara,
            kullaniciAd:isim,
            kullaniciSoyad:soyisim,
            kullaniciTelNo:telNo,
            kullaniciMail:eposta,
            stajTipiID:1,
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
            devletkatki:devletkatki,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
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
const staj2pdf_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullanici=req.session.kullaniciNumara;
    const staj1pdf = await stajkayit.findOne({
        where:{
            stajTipiID:2,
            kullaniciNumara:kullanici
        }
    }); 
    const kullaniciNumara=staj1pdf.kullaniciNumara;
    const isim=staj1pdf.kullaniciAd;
    const soyisim=staj1pdf.kullaniciSoyad;
    const telNo=staj1pdf.kullaniciTelNo;
    const eposta=staj1pdf.kullaniciMail;
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
        return res.render("ogrenci/pdfstaj2.ejs",{
            kullaniciNumara:kullaniciNumara,
            kullaniciAd:isim,
            kullaniciSoyad:soyisim,
            kullaniciTelNo:telNo,
            kullaniciMail:eposta,
            stajTipiID:1,
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
            devletkatki:devletkatki,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
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
const stajime_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
    const kullanici=req.session.kullaniciNumara;
    const telefon=req.session.kullaniciTelNo;
    const staj1pdf = await stajkayit.findOne({
        where:{
            stajTipiID:3,
            kullaniciNumara:kullanici
        }
    }); 
    const kullaniciNumara=staj1pdf.kullaniciNumara;
    const isim=staj1pdf.kullaniciAd;
    const soyisim=staj1pdf.kullaniciSoyad;
    const telNo=staj1pdf.kullaniciTelNo;
    const eposta=staj1pdf.kullaniciMail;
    const tc = staj1pdf.tc;
    const uyruk = staj1pdf.uyruk;
    const iban = staj1pdf.iban;
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
        return res.render("ogrenci/pdfime.ejs",{
            kullaniciNumara:kullaniciNumara,
            kullaniciAd:isim,
            kullaniciSoyad:soyisim,
            kullaniciTelNo:telNo,
            kullaniciMail:eposta,
            stajTipiID:1,
            tc:tc,
            iban:iban,
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
            devletkatki:devletkatki,
            baslangictarihi:baslangictarihi,
            bitistarihi:bitistarihi,
            isgunu:isgunu,
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

const pdfime_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=4){
        return res.redirect("/ogrenci/erisim");
    }
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
    ogrencihome_get,ogrenciimebasvur_get,ogrenciimebasvurubelgesi_get,ogrenciimedegerlendirme_get,ogrenciimerapor_get,ogrencistaj1basvur_get,ogrencistaj1basvurubelgesi_get,ogrencistaj1degerlendirme_get,ogrencistaj1rapor_get,ogrencistaj2basvur_get,ogrencistaj2basvurubelgesi_get,ogrencistaj2degerlendirme_get,ogrencistaj2rapor_get,profilOgrenci_get,staj1pdf_get,staj2pdf_get,stajime_get,ogrenciimebasvur_post,ogrencistaj1basvur_post,ogrencistaj2basvur_post,pdfime_get,ogrencistaj1basvurubelgesi_post,ogrencistaj1degerlendirme_post,ogrencistaj1rapor_post,ogrencistaj2basvurubelgesi_post,ogrencistaj2degerlendirme_post,ogrencistaj2rapor_post,ogrenciimerapor_post,ogrenciimedegerlendirme_post,ogrenciimebasvurubelgesi_post,downloadstaj1basvuru,downloadstaj1degerlendirme,downloadstaj1rapor,downloadstaj2basvuru,downloadstaj2degerlendirme,downloadstaj2rapor,downloadimebasvuru,downloadimerapor,downloadimedegerlendirme,erisim_get
}
