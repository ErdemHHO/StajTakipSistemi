const db = require("../data/db.js");
const stajkayit = require("../models/stajkayit.js");
const sorumluluk = require("../models/sorumluluk.js");
const stajtipi = require("../models/stajtipi.js");
const sunum = require("../models/sunum.js");
const kullanici = require("../models/kullanici.js");
const stajbelgeler = require("../models/stajbelgeler.js");
const stajdegerlendirme = require("../models/stajdegerlendirme.js");
const stajdurum = require("../models/stajdurum");


const emailService=require("../helpers/send-mail");
const config = require("../config/config.js");

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
        const kullaniciTable=await kullanici.findAll({
            where:{
                rolID:4
            }
        });
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
    const stajTipi=await stajtipi.findAll();
    let kullaniciNumarasi="---------";
    let none;
    if(typeof renkRet == "undefined"){
        renkRet="";
        messageRet="";
        none="none";
    }
    try {
        res.render("komisyon/komisyonbasvurubelge.ejs", {
            stajTipi:stajTipi,
            kullaniciNumarasi:kullaniciNumarasi,
            renk:renkRet,
            message:messageRet,
            none:none
        });
        renkRet="";
        messageRet="";
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonbasvurubelge_post=async function(req, res) {
    const basvuruBelgekullaniciNumarasi=req.body.kullaniciNumarasi;
    global.basvuruBelgekullaniciNumarasi=basvuruBelgekullaniciNumarasi;
    const stajTipiSecim=req.body.stajTipiSecim;
    global.stajTipiSecim=stajTipiSecim;

    const stajbelgelerara = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
            stajTipiID:stajTipiSecim
        }
    });
    const stajTipi=await stajtipi.findAll();
    try {
        if(stajbelgelerara){
            const basvuruForm=stajbelgelerara.basvuruForm;
            if(basvuruForm){
                return res.render("komisyon/komisyonbasvurubelge.ejs", {
                stajTipi:stajTipi,
                kullaniciNumarasi:basvuruBelgekullaniciNumarasi,
                basvuruForm:basvuruForm,
            });
            }
            return res.render("komisyon/komisyonbasvurubelge.ejs", {
                stajTipi:stajTipi,
                kullaniciNumarasi:basvuruBelgekullaniciNumarasi,
                message:"Belge Bulunamadı",
                renk:"danger"
            });
        }
        return res.render("komisyon/komisyonbasvurubelge.ejs", {
            stajTipi:stajTipi,
            kullaniciNumarasi:basvuruBelgekullaniciNumarasi,
            message:"Belge Bulunamadı",
            renk:"danger"
        });
    }
    catch(err) {
        console.log(err);
    }
}
const downloadBasvuruBelge=async function(req, res) {
    const form = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
            stajTipiID:stajTipiSecim
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
const OnayBasvuruBelge=async function(req, res) {

    const kullaniciAra = await kullanici.findOne({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
        }
    });
    console.log(kullaniciAra);
    const reddedenAdi=req.session.kullaniciAd;
    const reddedenSoyadi=req.session.kullaniciSoyad;
    const kullaniciMail=kullaniciAra.kullaniciMail;

    let messageRet="Başvuru Onaylandı";
    global.messageRet=messageRet;
    let renkRet="success";
    global.renkRet=renkRet;
    const stajTipi=await stajtipi.findAll();

    try {
        emailService.sendMail({
            from:config.email.from,
            to:kullaniciMail,
            subject:"Staj Başvurunuz",
            html:'<p> Staj Başvurunuz <ins><strong>' +reddedenAdi+' '+reddedenSoyadi+'</ins></strong> Tarafından Onaylandı.</p> <br> <p> Staj bitiminde staj değerlendirme belgenizi ve staj raporunuzu yükleyiniz.</p>'
            });
        return res.redirect("/komisyon/basvurubelgeleri");
    }
    catch(err) {
        console.log(err);
    }
}
const RetBasvuruBelge=async function(req, res) {
    const kullaniciAra = await kullanici.findOne({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
        }
    });
    console.log(kullaniciAra);
    const reddedenAdi=req.session.kullaniciAd;
    const reddedenSoyadi=req.session.kullaniciSoyad;
    const kullaniciMail=kullaniciAra.kullaniciMail;

    let messageRet="Başvuru Reddedildi";
    global.messageRet=messageRet;
    let renkRet="warning";
    global.renkRet=renkRet;
    const stajTipi=await stajtipi.findAll();
    await stajbelgeler.destroy({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
            stajTipiID:stajTipiSecim
        }
    });
    try {
        emailService.sendMail({
            from:config.email.from,
            to:kullaniciMail,
            subject:"Staj Başvurunuz",
            html:'<p style="color: red;""> Staj Başvurunuz Staj Şartlarına Uygun Görülemediğinden <ins><strong>' +reddedenAdi+' '+reddedenSoyadi+'</ins></strong> Tarafından Reddedildi.</p> <br> <p> <ins><strong>' +reddedenAdi+' '+reddedenSoyadi+'</ins></strong> Hocanızla İletişime Geçiniz.</p>'
            });
        return res.redirect("/komisyon/basvurubelgeleri");
    }
    catch(err) {
        console.log(err);
    }
}

const komisyondegerlendirme_get=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    try {
        res.render("komisyon/komisyondegerlendirme.ejs", {
            stajTipi:stajTipi,
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyondegerlendirme_post=async function(req, res) {
    const kullaniciNumara=req.body.kullaniciNumara;
    const stajTipiID=req.body.stajTipiID;
    const durum2=req.body.durum;
    console.log(durum2);
    const eksikGun=req.body.eksikGun;
    const onaylananGun=req.body.onaylananGun;
    const kullaniciNumaraOgretmen=req.session.kullaniciNumara;
    const stajTipi=await stajtipi.findAll();

    const stajdegerlendirmeAra=await stajdegerlendirme.findOne({
        kullaniciNumara:kullaniciNumara,
        stajTipiID:stajTipiID,
    });
    const sunumAra=await sunum.findOne({
        kullaniciNumara:kullaniciNumara,
        stajTipiID:stajTipiID,
        kullaniciNumaraOgretmen:kullaniciNumaraOgretmen
    });
    console.log(stajdegerlendirmeAra);
    try {
        if(stajdegerlendirmeAra){
            return res.render("komisyon/komisyondegerlendirme.ejs", {
                stajTipi:stajTipi,
                message:"Değerlendirme Daha Önceden Yapılmış.",
                message2:"Değerlendirme Güncellendi",
                renk:"warning",
                renk2:"success"
            });
        }
        if(stajdegerlendirmeAra){
            return res.render("komisyon/komisyondegerlendirme.ejs", {
                stajTipi:stajTipi,
                message:"Değerlendirme Daha Önceden Yapılmış.",
                message2:"Değerlendirme Güncellendi",
                renk:"warning",
                renk2:"success"
            });
        }
        if(!sunumAra){
            return res.render("komisyon/komisyondegerlendirme.ejs", {
                stajTipi:stajTipi,
                message:"Bu stajın değerlendirmesi size ait değil",
                renk:"danger",
            });
        }
        return res.render("komisyon/komisyondegerlendirme.ejs", {
            stajTipi:stajTipi,
        });
    }
    catch(err) {
        console.log(err);
    }
}

const komisyonstajogrbelirle_get=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    try {
        res.render("komisyon/komisyonstajogrbelirle.ejs", {
            stajTipi:stajTipi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonstajogrbelirle_post=async function(req, res) {
    const belirleyenAdi=req.session.kullaniciAd;
    const belirleyenSoyadi=req.session.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;
    const stajTipiID=req.body.stajTipiID;
    const sunumTarihi=req.body.sunumTarihi;
    const kullaniciNumaraOgretmen=req.body.kullaniciNumaraOgretmen;

    const belgeAra = await stajbelgeler.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
        }
    });
    const kullaniciAra = await kullanici.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
        }
    });
    const ogretmenAra = await kullanici.findOne({
        where:{
            kullaniciNumara:kullaniciNumaraOgretmen,
        }
    });
    const sunumAra = await sunum.findOne({
        where:{
            kullaniciNumara:kullaniciNumara,
            stajTipiID:stajTipiID
        }
    });
    const stajTipi=await stajtipi.findAll();
    const stajTipiAdi = await stajtipi.findOne({
        where:{
            stajTipiID:stajTipiID
        }
    });
    const stajTipiAdi2=stajTipiAdi.stajTipiAdi;
    try {
        if(!kullaniciAra){
            return res.render("komisyon/komisyonstajogrbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Öğrenci Bulunamadı",
                renk:"danger"
            });
        }
        else if(!ogretmenAra){
            return res.render("komisyon/komisyonstajogrbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Öğretmen Bulunamadı",
                renk:"danger"
            });
        }
        if(!belgeAra){
            return res.render("komisyon/komisyonstajogrbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Staj kaydı bulunamadı",
                renk:"danger"
            });
        }
        else if(ogretmenAra.rolID==4){
            return res.render("komisyon/komisyonstajogrbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Seçilen kişinin rolü öğretmen,komisyon veya yönetici olmalıdır.",
                renk:"warning"
            });
        }
        else if(sunumAra){
            const kullaniciMail=kullaniciAra.kullaniciMail;
            let ogretmenAdi=ogretmenAra.kullaniciAd;
            let ogretmenSoyadi=ogretmenAra.kullaniciSoyad;
            let ogretmen=ogretmenAra.kullaniciNumara;
            let ogrenci=kullaniciAra.kullaniciNumara;
            sunumAra.kullaniciNumara = ogrenci;
            sunumAra.stajTipiID = stajTipiID;
            sunumAra.sunumTarihi = sunumTarihi;
            sunumAra.kullaniciNumaraOgretmen = ogretmen;
            await sunumAra.save();
            emailService.sendMail({
                from:config.email.from,
                to:kullaniciMail,
                subject:"Staj Sunumunuz Değiştirildi",
                html:'<p>' +stajTipiAdi2+ ' Sunum Bilgileriniz <ins><strong>' +belirleyenAdi+' '+belirleyenSoyadi+'</ins></strong> Tarafından Güncellendi.</p> <br> <p> Yeni Sunum Tarihiniz:' +sunumTarihi+ '<br> Sunum Yapacağınız Öğretmen: ' +ogretmenAdi+' '+ogretmenSoyadi+' </p>'
                });
            return res.render("komisyon/komisyonstajogrbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Sunum Tarihi Daha Önce Belirlenmiş. ",
                message2:"Sunum Tarihi Güncellendi",
                renk:"warning",
                renk2:"success"
            });
        }
        else {
            const kullaniciMail=kullaniciAra.kullaniciMail;
            let ogretmen=ogretmenAra.kullaniciNumara;
            let ogrenci=kullaniciAra.kullaniciNumara;
            let ogretmenAdi=ogretmenAra.kullaniciAd;
            let ogretmenSoyadi=ogretmenAra.kullaniciSoyad;
            await sunum.create({kullaniciNumara:ogrenci,stajTipiID:stajTipiID,sunumTarihi:sunumTarihi,kullaniciNumaraOgretmen:ogretmen}); 
            emailService.sendMail({
                from:config.email.from,
                to:kullaniciMail,
                subject:"Staj Sunumunuz Belirlendi",
                html:'<p>' +stajTipiAdi2+' Sunum Bilgileriniz <ins><strong>' +belirleyenAdi+' '+belirleyenSoyadi+'</ins></strong> Tarafından Belirlendi.</p> <br> <p> Sunum Tarihiniz:' +sunumTarihi+ '<br> Sunum Yapacağınız Öğretmen: ' +ogretmenAdi+' '+ogretmenSoyadi+' </p>'
                }); 
        return res.render("komisyon/komisyonstajogrbelirle.ejs", {
            stajTipi:stajTipi,
            message:"Sunum Oluşturuldu",
            renk:"success"
        });
    }}
    catch(err) {
        console.log(err);
    }
}

const profilKomisyon_get=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    try {
        res.render("komisyon/profilKomisyon.ejs", {
            stajTipi:stajTipi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonbelgegor_get=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    let kullaniciNumarasi="---------";
    try {
        res.render("komisyon/komisyonbelgegor.ejs", {
            stajTipi:stajTipi,
            kullaniciNumarasi:kullaniciNumarasi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const komisyonbelgegor_post=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    const kullaniciNumarasiKomisyon=req.body.kullaniciNumarasi;
    global.kullaniciNumarasiKomisyon=kullaniciNumarasiKomisyon;
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
            stajTipiID:stajTipiSecim
        }
    });
    try {
        if(stajbelgelerara){
            const basvuruForm=stajbelgelerara.basvuruForm;
            const degerlendirmeFormu=stajbelgelerara.degerlendirmeFormu;
            const stajRaporu=stajbelgelerara.stajRaporu;
            if(basvuruForm && degerlendirmeFormu && stajRaporu){
                return res.render("komisyon/komisyonbelgegor.ejs", {
                    kullaniciNumarasi:kullaniciNumarasiKomisyon,
                    stajTipi:stajTipi,  
                    basvuruForm:basvuruForm,
                    degerlendirmeFormu:degerlendirmeFormu,
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(basvuruForm && degerlendirmeFormu){
                return res.render("komisyon/komisyonbelgegor.ejs", { 
                    kullaniciNumarasi:kullaniciNumarasiKomisyon,  
                    stajTipi:stajTipi,    
                    basvuruForm:basvuruForm,
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
            else if(basvuruForm && stajRaporu){
                return res.render("komisyon/komisyonbelgegor.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiKomisyon,
                    stajTipi:stajTipi,   
                    basvuruForm:basvuruForm,
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(stajRaporu && degerlendirmeFormu){
                return res.render("komisyon/komisyonbelgegor.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiKomisyon,
                    stajTipi:stajTipi,   
                    stajRaporu:stajRaporu,
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
            else if(stajRaporu){
                return res.render("komisyon/komisyonbelgegor.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiKomisyon,
                    stajTipi:stajTipi,   
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(degerlendirmeFormu){
                return res.render("komisyon/komisyonbelgegor.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiKomisyon,
                    stajTipi:stajTipi,   
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
        }
        res.render("komisyon/komisyonbelgegor.ejs", {
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
            kullaniciNumara:kullaniciNumarasiKomisyon,
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
    komisyonkullanicitablosu_get,
    komisyonstajtablosu_get,
    komisyonbasvurubelge_get,
    komisyonbasvurubelge_post,
    downloadBasvuruBelge,
    OnayBasvuruBelge,
    RetBasvuruBelge,
    komisyondegerlendirme_get,
    komisyondegerlendirme_post,
    komisyonstajogrbelirle_get,
    komisyonstajogrbelirle_post,
    profilKomisyon_get,
    komisyonbelgegor_get,
    komisyonbelgegor_post,
    komisyonsorumluluk_get,
    komisyonsorumluluk_post,
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