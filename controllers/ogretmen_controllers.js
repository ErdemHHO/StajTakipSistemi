const db = require("../data/db.js");

const stajkayit = require("../models/stajkayit.js");
const stajtipi = require("../models/stajtipi.js");
const stajbelgeler = require("../models/stajbelgeler.js");
const sunum = require("../models/sunum.js");
const kullanici = require("../models/kullanici.js");
const stajdegerlendirme = require("../models/stajdegerlendirme.js");
const stajdurum = require("../models/stajdurum");

const emailService=require("../helpers/send-mail");
const config = require("../config/config.js");


const erisim_get=async function(req, res) {
    try {
        res.render("ogretmen/goruntuleme.ejs", { 
        });
    }
    catch(err) {
        console.log(err);
    }
}

const stajogretmentable_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=3){
        return res.redirect("/ogretmen/erisim");
    }
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
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=3){
        return res.redirect("/ogretmen/erisim");
    }
    const kullaniciNumaraOgretmen=req.session.kullaniciNumara;
    const sunumAra1=await sunum.findAll({
        where:{
            kullaniciNumaraOgretmen:kullaniciNumaraOgretmen,
        }
    });
    const stajTipi=await stajtipi.findAll();
    try {
        return res.render("ogretmen/degerlendirogretmen.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1
        });
    }
    catch(err) {
        console.log(err);
    }
}
const degerlendirogretmen_post=async function(req, res) {
    //Burası sayfanın getinde kullanılanlar !!!
    const kullaniciNumaraOgretmen=req.session.kullaniciNumara;
    const stajTipi=await stajtipi.findAll();
    const sunumAra1=await sunum.findAll({
        where:{
            kullaniciNumaraOgretmen:kullaniciNumaraOgretmen,
        }
    });

    const kullaniciNumarasi=req.body.kullaniciNumara;
    const stajTipiID=req.body.stajTipiID;
    const durum=req.body.durum;
    const onaylananGun=req.body.onaylananGun;
    const eksikGun=req.body.eksikGun;
    const kullaniciNumara2=kullaniciNumarasi;
    console.log("dsfdsfsdfdsfsdfsdf "+kullaniciNumara2);
    const kullaniciKontrol=await kullanici.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
        }
    });
    const kullaniciAdiOgretmen=await kullanici.findOne({
        where:{
            kullaniciNumara:kullaniciNumaraOgretmen,
        }
    });
    const ogrAdi=kullaniciAdiOgretmen.kullaniciAd;
    const ogrSoyadi=kullaniciAdiOgretmen.kullaniciSoyad;
    const mail=kullaniciKontrol.kullaniciMail;
    const stajTipiAdi=await stajtipi.findOne({
        where:{
            stajTipiID:stajTipiID,
        }
    });
    const durumAdi=await stajdurum.findOne({
        where:{
            durumID:durum,
        }
    });
    const durumAdi2=durumAdi.durum;
    const stajTuru=stajTipiAdi.stajTipiAdi;
    const sunumAra2=await sunum.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:stajTipiID,
            kullaniciNumaraOgretmen:kullaniciNumaraOgretmen,
        }
    });
    const degerlendirmeAra=await stajdegerlendirme.findOne({
        where:{
            kullaniciNumara:kullaniciNumarasi,
            stajTipiID:stajTipiID,
        }
    });

    try {
        if(kullaniciKontrol=="undefined"){
            return res.render("ogretmen/degerlendirogretmen.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Kullanıcı numarasına ait kayıt bulunamadı !",
                renk:"danger"
            })
        }
        if(sunumAra2=="undefined"){
            return res.render("ogretmen/degerlendirogretmen.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Bu kullanıcıdan sorumlu öğretmen siz değilsiniz !",
                renk:"danger"
            })
        }
        if(eksikGun>0 && durum==7){
            return res.render("ogretmen/degerlendirogretmen.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik gün var ise staj durum geçti olamaz !",
                renk:"danger"
            })
        }
        if(eksikGun>onaylananGun){
            return res.render("ogretmen/degerlendirogretmen.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik gün sayısı onaylanan gün sayısından büyük olamaz !",
                renk:"danger"
            })
        }
        if(eksikGun==0){
            if(durum!=7){
                return res.render("ogretmen/degerlendirogretmen.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik yok ise staj durumu; kaldı veya eksik gün var olamaz !",
                renk:"danger"
            })
            }  
        }
        if(degerlendirmeAra){
            console.log("girdi degerlendirmeAra");
            degerlendirmeAra.kullaniciNumara = kullaniciNumara2;
            degerlendirmeAra.stajTipiID = stajTipiID;
            degerlendirmeAra.durumID = durum;
            degerlendirmeAra.onaylananGun = onaylananGun;
            degerlendirmeAra.eksikGun = eksikGun;
            await degerlendirmeAra.save();
            emailService.sendMail({
                from:config.email.from,
                to:mail,
                subject:"Staj Değerlendirmeniz Güncellendi",
                html:'<p>' +stajTuru+ ' Değerlendirmeniz <ins><strong>' +ogrAdi+' '+ogrSoyadi+'</ins></strong> Tarafından Güncellendi.</p> <br> <p> Staj Durumunuz: ' +durumAdi2+ '<br> Onaylanan Gün Sayınız: ' +onaylananGun+' <br> Eksik Gün Sayınız: '+eksikGun+'</p>'
                }); 
            return res.render("ogretmen/degerlendirogretmen.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Bu kullanıcının daha önceden değerlendirmesi yapılmış !",
                renk:"warning",
                message2:"Değerlendirme Güncellendi",
                renk2:"success"
            })
        }
        await stajdegerlendirme.create({
            kullaniciNumara:kullaniciNumara2,
            stajTipiID:stajTipiID,
            durumID:durum,
            onaylananGun:onaylananGun,
            eksikGun:eksikGun
            });
        emailService.sendMail({
            from:config.email.from,
            to:mail,
            subject:"Staj Değerlendirmeniz Yapıldı",
            html:'<p>' +stajTuru+ ' Değerlendirmeniz <ins><strong>' +ogrAdi+' '+ogrSoyadi+'</ins></strong> Tarafından Yapıldı.</p> <br> <p> Staj Durumunuz: ' +durumAdi2+ '<br> Onaylanan Gün Sayınız: ' +onaylananGun+' <br> Eksik Gün Sayınız: '+eksikGun+'</p>'
            }); 
        return res.render("ogretmen/degerlendirogretmen.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1,
            message:"Değerlendirme Başarılı !",
            renk:"success",
        })  
    } 
    catch(err) {
        return res.render("ogretmen/degerlendirogretmen.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1,
            message:"Hatalı İşlem!",
            renk:"danger",
        })
        console.log(err);
    }
}


const profilOgretmen_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=3){
        return res.redirect("/ogretmen/erisim");
    }
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
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=3){
        return res.redirect("/ogretmen/erisim");
    }
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
    degerlendirogretmen_post,
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
    erisim_get
}