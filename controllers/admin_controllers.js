const bcrypt=require("bcrypt");

const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");
const kullanici = require("../models/kullanici.js");
const stajkayit = require("../models/stajkayit.js");
const rol = require("../models/rol.js");
const sorumluluk = require("../models/sorumluluk.js");
const stajtipi = require("../models/stajtipi.js");
const stajbelgeler = require("../models/stajbelgeler.js");
const sunum = require("../models/sunum.js");
const stajdegerlendirme = require("../models/stajdegerlendirme.js");
const stajdurum = require("../models/stajdurum");
const emailService=require("../helpers/send-mail");
const config = require("../config/config.js");


const erisim_get=async function(req, res) {
    try {
        res.render("yonetici/goruntuleme.ejs", { 
        });
    }
    catch(err) {
        console.log(err);
    }
}

//******DUYURU SAYFALARI******/

//yonetici duyuru tablosu
const duyurutablosu_get= async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const duyurular=await duyuru.findAll();
    try {
        res.render("yonetici/duyurutable.ejs", {
            duyurular:duyurular
        });
    }
    catch(err) {
        console.log(err);
    }
}
// yonetici duyuru olustur islemleri
const duyuruolustur_get= async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    try {
        res.render("yonetici/duyuruolustur.ejs", {
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
      res.render("yonetici/duyuruolustur.ejs", {
        message:"Duyuru Eklendi"
        });
    }
    catch(err){
        console.log(err)
    }
}
// yonetici duyuru güncelle islemleri
const duyuruguncelle_get= async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    try {
        res.render("yonetici/duyuruolustur.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const duyuruguncelle_post= async function(req,res){
        const duyurubaslık= req.body.duyuruBaslik;
        const duyuruacıklama= req.body.duyuruAciklama;
        const duyurutur = req.body.duyuruTuru;
    
        try {
            const Duyuru=await duyuru.findOne({
                where:{
                    duyuruBaslik: duyurubaslık
                }
            })
    
            if (Duyuru) {
    
                Duyuru.duyuruBaslik = duyurubaslık;
                Duyuru.duyuruAciklama = duyuruacıklama;
                Duyuru.duyuruTuru = duyurutur;
    
                await Duyuru.save();
                console.log("başarılı..")
                return res.render("yonetici/duyuruguncelle.ejs",{
                    message: "Duyuru Güncellendi"
                });
                
            }else{
                return res.render("yonetici/duyuruguncelle.ejs",{
                    message: "Duyuru Bulunamadı"
                });
            }
            
        } catch (err) {
            console.log(err);
        }
}
    
const duyurusil_get= async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    try {
        res.render("yonetici/duyurusil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const duyurusil_post=async function(req,res){
    const duyuruNumarası = req.body.duyurunumarası;

    console.log(duyuruNumarası);
    try {
        const Duyuru = await duyuru.findByPk(duyuruNumarası);
        if(Duyuru) {
            await Duyuru.destroy({
                where:{
                    duyuruID:duyuruNumarası
                }
            });
            return res.render("yonetici/duyurusil.ejs",{
                message: "Duyuru Silindi"
            });
        }else{
            return res.render("yonetici/duyurusil.ejs",{
                message: " Duyuru Bulunamadı"
            });
        }
    }
    catch(err) {
        console.log(err);
    }

}
//yonetici kullanıci tablo islemleri
const kullanicitablosu_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    try {
        const kullanicilar=await kullanici.findAll();
        res.render("yonetici/kullanicitable.ejs", {
            kullaniciTable: kullanicilar
        });
    }
    catch(err) {
        console.log(err);
    }
}

//yonetici kullanıci ekle islemleri
const kullaniciekle_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const roller=await rol.findAll();
    try {
        return res.render("yonetici/kullaniciekle.ejs", {
            rol:roller
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciekle_post=async function(req, res) {
    const kullaniciAd=req.body.kullaniciAd;
    console.log(kullaniciAd);
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;

    const kullaniciParola=req.body.kullaniciParola;
    const hashedPassword=await bcrypt.hash(kullaniciParola,10);
    const kullaniciTelNo=req.body.kullaniciTelNo;
    const kullaniciMail=req.body.kullaniciMail;
    const rolID=req.body.rolID;
    console.log(rolID);
    //const rolID=req.body.rolID;
    const kullaniciFakulte=req.body.kullaniciFakulte;
    const kullaniciBolum=req.body.kullaniciBolum;
    const kullaniciSinif=req.body.kullaniciSinif;
    const user = await kullanici.findByPk(kullaniciNumara);
    const roller=await rol.findAll();
    const kullaniciMailKontrol = await kullanici.findOne({
        where: {
            kullaniciMail: kullaniciMail
        }
    });
    const kullaniciTelKontrol = await kullanici.findOne({
        where: {
            kullaniciTelNo: kullaniciTelNo
        }
    });
    try {
        if(rolID==3 || rolID==2 || rolID==1){
            if(kullaniciNumara<=999 || kullaniciNumara>9999){
                return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Yönetici,komisyon ve öğretmen numaraları 4 haneli bir sayı olmalıdır.",
                renk:"danger"
                });
            }  
        }
        if(rolID==4){
            if(kullaniciNumara<=99999999 || kullaniciNumara>999999999){
                return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Öğrenci Numarası 11 haneli bir sayı olmalıdır.",
                renk:"danger"
                });
            }  
        }
        if(kullaniciTelNo<=999999999 || kullaniciTelNo>=9999999999){
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Geçerli bir telefon numarası giriniz.",
                renk:"danger"
            });  
        }
        if(kullaniciMailKontrol){
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Mail adresinizle kayıtlı bir kullanıcı var.",
                renk:"danger"
            });  
        }
        if(kullaniciTelKontrol){
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Telefon numaranızla kayıtlı bir kullanıcı var.",
                renk:"danger"
            });  
        }
        if(!user){
            const newUser=await kullanici.create({kullaniciNumara:kullaniciNumara,kullaniciAd:kullaniciAd,kullaniciSoyad:kullaniciSoyad,kullaniciParola:hashedPassword,kullaniciMail:kullaniciMail,kullaniciTelNo:kullaniciTelNo,kullaniciFakulte:kullaniciFakulte,kullaniciBolum:kullaniciBolum,kullaniciSinif:kullaniciSinif,rolID:rolID});
            if(rolID==4){
                await stajdegerlendirme.create({kullaniciNumara:kullaniciNumara,durumID:8,stajTipiID:1});
                await stajdegerlendirme.create({kullaniciNumara:kullaniciNumara,durumID:8,stajTipiID:2});
                await stajdegerlendirme.create({kullaniciNumara:kullaniciNumara,durumID:8,stajTipiID:3});
            }
            emailService.sendMail({
                from:config.email.from,
                to:newUser.kullaniciMail,
                subject:"Hesabınız oluşturuldu.",
                html:'<p> Hesabınız başarılı bir şekilde oluşturuldu.</p> <br> <p> Şifreniz: ' + kullaniciParola + '</p><br> Şifrenizi güncellemek için tıklayın: <a href="http://localhost:3000/sifresifirlama">Parola Sıfırla</a>'
                });
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Kullanıcı Eklendi.",
                renk:"success"
            });    
        }
        return res.render("yonetici/kullaniciekle.ejs", {
            rol:roller,
            message:"Kullanıcı Kaydı Zaten Var",
            renk:"danger"
        });    
    }
    catch(err) {
        console.log(err);
        console.log("hatalı ekleme");
        return res.render("yonetici/kullaniciekle.ejs", {
            rol:roller,
            message:"Hatalı Ekleme",
            renk:"danger"
        });    
        
        
    }
}
const kullanicisil_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    try {
        res.render("yonetici/kullanicisil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullanicisil_post=async function(req,res){
    const kullaniciNumarasi = req.body.kullanicinumarasi;
    console.log(kullaniciNumarasi);
    const stajkayitSil1 = await stajkayit.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:1
        }
    
    });
    const stajkayitSil2 = await stajkayit.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:2
        }
    
    });
    const stajkayitSil3 = await stajkayit.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:3
        }
    
    });
    const sorumlulukSil1 = await sorumluluk.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:1
        }
    
    });
    const sorumlulukSil2 = await sorumluluk.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:2
        }
    
    });
    const sorumlulukSil3 = await sorumluluk.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:3
        }
    
    });
    const belgeSil1 = await stajbelgeler.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:1
        }
    });
    const belgeSil2 = await stajbelgeler.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:2
        }
    });
    const belgeSil3 = await stajbelgeler.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:3
        }
    });
    const sunumSil1 = await sunum.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:1
        }
    });
    const sunumSil2 = await sunum.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:2
        }
    });
    const sunumSil3 = await sunum.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:3
        }
    });
    const stajdegerlendirmeSil1 = await stajdegerlendirme.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:1
        }
    })
    const stajdegerlendirmeSil2 = await stajdegerlendirme.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:2
        }
    })
    const stajdegerlendirmeSil3 = await stajdegerlendirme.findOne({
        where: {
            kullaniciNumara: kullaniciNumarasi,
            stajTipiID:3
        }
    })
    try {
        const Kullanici = await kullanici.findByPk(kullaniciNumarasi);
        if(kullaniciNumarasi==2419){
            return res.render("yonetici/kullanicisil.ejs",{
                renk:"danger",
                message: "Süper Admin Silinemez"
            });
        }
        if(Kullanici) {
            if(stajkayitSil1){
                await stajkayitSil1.destroy();
                console.log("stajkayitSilindi")
            }
            if(sorumlulukSil1){
                await sorumlulukSil1.destroy();
                console.log("sorumlulukSilindi")
            }
            if(belgeSil1){
                await belgeSil1.destroy();
                console.log("belgelerSilindi")
            }
            if(sunumSil1){
                await sunumSil1.destroy();
                console.log("sunumSilindi")
            }
            if(stajkayitSil2){
                await stajkayitSil2.destroy();
                console.log("stajkayitSilindi")
            }
            if(sorumlulukSil2){
                await sorumlulukSil2.destroy();
                console.log("sorumlulukSilindi")
            }
            if(belgeSil2){
                await belgeSil2.destroy();
                console.log("belgelerSilindi")
            }
            if(sunumSil2){
                await sunumSil2.destroy();
                console.log("sunumSilindi")
            }
            if(stajkayitSil3){
                await stajkayitSil3.destroy();
                console.log("stajkayitSilindi")
            }
            if(sorumlulukSil3){
                await sorumlulukSil3.destroy();
                console.log("sorumlulukSilindi")
            }
            if(belgeSil3){
                await belgeSil3.destroy();
                console.log("belgelerSilindi")
            }
            if(sunumSil3){
                await sunumSil3.destroy();
                console.log("sunumSilindi")
            }
            if(stajdegerlendirmeSil1){
                await stajdegerlendirmeSil1.destroy()
                console.log("değerlendirme silindi")
            }
            if(stajdegerlendirmeSil2){
                await stajdegerlendirmeSil2.destroy()
                console.log("değerlendirme silindi")
            }
            if(stajdegerlendirmeSil3){
                await stajdegerlendirmeSil3.destroy()
                console.log("değerlendirme silindi")
            }
            await Kullanici.destroy();
            return res.render("yonetici/kullanicisil.ejs",{
                renk:"success",
                message: "Kullanıcı Silindi"
            });
        }
        else{
            return res.render("yonetici/kullanicisil.ejs",{
                renk:"danger",
                message: " Kullanıcı Bulunamadı"
            });
        }
        // res.redirect("/admin/kullanicisil");
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciguncelle_get=async function(req,res){
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const roller=await rol.findAll();
    try {
        res.render("yonetici/kullaniciguncelle.ejs", {
            roller:roller
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kullaniciguncelle_post=async function(req,res){
    const yoneticiAdi=req.session.kullaniciAd;
    const yoneticiSoyadi=req.session.kullaniciSoyad;
    const roller=await rol.findAll();
    const kullaniciAd=req.body.kullaniciAd;
    console.log(kullaniciAd);
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;
    const kullaniciParola=req.body.kullaniciParola;
    const hashedPassword=await bcrypt.hash(kullaniciParola,10);
    const kullaniciTelNo=req.body.kullaniciTelNo;
    const kullaniciMail=req.body.kullaniciMail;
    const rolID=req.body.rolID;
    // const rolID=req.body.rolID;
    const kullaniciFakulte=req.body.kullaniciFakulte;
    const kullaniciBolum=req.body.kullaniciBolum;
    const kullaniciSinif=req.body.kullaniciSinif;
    const kullanıcı = await kullanici.findOne({
        where: {
            kullaniciNumara: kullaniciNumara
        }
    
    });
    const kullaniciMailKontrol = await kullanici.findOne({
        where: {
            kullaniciMail: kullaniciMail
        }
    });
    const kullaniciTelKontrol = await kullanici.findOne({
        where: {
            kullaniciTelNo: kullaniciTelNo
        }
    });
    try {
        if(!kullanıcı){
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                renk:"danger",
                message: " Kullanıcı Bulunamadı"
            });
        }
        if(kullaniciTelNo<=999999999 || kullaniciTelNo>=9999999999){
            return res.render("yonetici/kullaniciguncelle.ejs", {
                rol:roller,
                message:"Geçerli bir telefon numarası giriniz.",
                renk:"danger"
            });  
        }
        if (kullanıcı) {
            kullanıcı.kullaniciNumara = kullaniciNumara;
            kullanıcı.kullaniciAd = kullaniciAd;
            kullanıcı.kullaniciSoyad = kullaniciSoyad;
            kullanıcı.kullaniciParola = hashedPassword;
            kullanıcı.kullaniciMail = kullaniciMail;
            kullanıcı.kullaniciTelNo = kullaniciTelNo;
            kullanıcı.kullaniciFakulte = kullaniciFakulte;
            kullanıcı.kullaniciBolum = kullaniciBolum;
            kullanıcı.kullaniciSinif = kullaniciSinif;
            kullanıcı.rolID = rolID;
            await kullanıcı.save();
            emailService.sendMail({
                from:config.email.from,
                to:kullanıcı.kullaniciMail,
                subject:"Hesap Bilgileriniz Güncellendi",
                html:'<p> Hesabınız bilgileriniz '+yoneticiAdi+' '+yoneticiSoyadi+' tarafından güncellendi.</p> <br> <p> Numaranız: ' + kullaniciNumara + '</p><br> <p> Şifreniz: ' + kullaniciParola + '<br> <p> Sistemde kayıtlı adınız ve soyadınız: ' + kullaniciAd + ' ' + kullaniciSoyad + '<br> <p> Sistemde Kayıtlı Mail Adresiniz: ' + kullaniciMail + '<p>Sistemde Kayıtlı Telefon Numaranız: ' + kullaniciTelNo + '</p></p><br> Şifrenizi güncellemek için tıklayın: <a href="http://localhost:3000/sifresifirlama">Parola Sıfırla</a>'
                });
            console.log("başarılı")
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                renk:"success",
                message :"Kullanıcı Güncellendi"
            });
        }else{
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                renk:"warning",
                message: " Kullanıcı Bulunamadı"
            });
        }

        
    } catch (err) {
        return res.render("yonetici/kullaniciguncelle.ejs",{
            roller:roller,
            renk:"danger",
            message: "Hatalı Güncelleme"
        });
        console.log(err);
    }
}

const profil_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    let kullaniciNumara=req.session.kullaniciNumara;
    console.log("deneme");
    console.log(kullaniciNumara);
    try {
        res.render("yonetici/profil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const profilduzenle_post=async function(req, res) {
    let kullaniciNumara=req.session.kullaniciNumara;        
    let sifre=req.session.kullaniciParola;
    const email=req.body.email;
    const telNo=req.body.telNo;
    const eskiSifre=req.body.kullanıcıSifre;
    const yeniSifre=req.body.yeniSifre;
    const yeniSifreTekrar=req.body.yeniSifreTekrar;
    try {
        const kullanici = await kullanici.findOne({
            where: {
                kullaniciNumara: kullaniciNumara
            }});
        const match=await bcrypt.compare(sifre, kullanici.kullaniciParola);
        if(eskiSifre==match){
            if(yeniSifre==yeniSifreTekrar){
                kullanici.kullaniciTelNo = telNo;
                kullanici.kullaniciMail = email;
                kullanici.kullaniciParola =await bcrypt.hash( yeniSifre,10);
                await kullanici.save();
                res.render("yonetici/profilduzenle.ejs", {
                    message: "Bilgileriniz Güncellendi!"
                });
            }else{
                res.render("yonetici/profilduzenle.ejs", {
                    message: "Yeni şifreleriniz aynı değil"
                });
            }
        }
        else{
            res.render("yonetici/profilduzenle.ejs", {
                message: "Şifreniz Yanlış!"
            });
        }
    }
    catch(err) {
        console.log(err);
    }
}
const profilduzenle_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    try {
        res.render("yonetici/profilduzenle.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
//yonetici staj-ime bilgi tablosu işlemleri
const stajtable_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const stajkayittable=await stajkayit.findAll();
    try {
        res.render("yonetici/stajtable.ejs", {      
            stajkayittable:stajkayittable      
        });
    }
    catch(err) {
        console.log(err);
    }
}
const yoneticibasvurubelge_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const stajTipi=await stajtipi.findAll();
    let kullaniciNumarasi="---------";
    let none;
    if(typeof renkRet == "undefined"){
        renkRet="";
        messageRet="";
        none="none";
    }
    try {
        res.render("yonetici/stajbasvurudegerlendir.ejs", {
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
const yoneticibasvurubelge_post=async function(req, res) {
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
                return res.render("yonetici/stajbasvurudegerlendir.ejs", {
                stajTipi:stajTipi,
                kullaniciNumarasi:basvuruBelgekullaniciNumarasi,
                basvuruForm:basvuruForm,
            });
            }
            return res.render("yonetici/stajbasvurudegerlendir.ejs", {
                stajTipi:stajTipi,
                kullaniciNumarasi:basvuruBelgekullaniciNumarasi,
                message:"Belge Bulunamadı",
                renk:"danger"
            });
        }
        return res.render("yonetici/stajbasvurudegerlendir.ejs", {
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
    const degerlendirme=await stajdegerlendirme.findOne({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
            stajTipiID:stajTipiSecim
        }
    })

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

            if(degerlendirme){
                degerlendirme.durumID = 1
                await degerlendirme.save();
            }
        return res.redirect("/admin/basvurudegerlendir");
    }
    catch(err) {
        console.log(err);
    }
}
const RetBasvuruBelge=async function(req, res) {
    const degerlendirme=await stajdegerlendirme.findOne({
        where:{
            kullaniciNumara:basvuruBelgekullaniciNumarasi,
            stajTipiID:stajTipiSecim
        }
    })
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

            if(degerlendirme){
                degerlendirme.durumID = 3
                await degerlendirme.save();
            }
        return res.redirect("/admin/basvurudegerlendir");
    }
    catch(err) {
        console.log(err);
    }
}
const yoneticibelgegor_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const stajTipi=await stajtipi.findAll();
    let kullaniciNumarasi="---------";
    try {
        res.render("yonetici/stajbelgeleri.ejs", {
            stajTipi:stajTipi,
            kullaniciNumarasi:kullaniciNumarasi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const yoneticibelgegor_post=async function(req, res) {
    const stajTipi=await stajtipi.findAll();
    const kullaniciNumarasiYonetici=req.body.kullaniciNumarasi;
    global.kullaniciNumarasiYonetici=kullaniciNumarasiYonetici;
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
            kullaniciNumara:kullaniciNumarasiYonetici,
            stajTipiID:stajTipiSecim
        }
    });
    try {
        if(stajbelgelerara){
            const basvuruForm=stajbelgelerara.basvuruForm;
            const degerlendirmeFormu=stajbelgelerara.degerlendirmeFormu;
            const stajRaporu=stajbelgelerara.stajRaporu;
            if(basvuruForm && degerlendirmeFormu && stajRaporu){
                return res.render("yonetici/stajbelgeleri.ejs", {
                    kullaniciNumarasi:kullaniciNumarasiYonetici,
                    stajTipi:stajTipi,  
                    basvuruForm:basvuruForm,
                    degerlendirmeFormu:degerlendirmeFormu,
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(basvuruForm && degerlendirmeFormu){
                return res.render("yonetici/stajbelgeleri.ejs", { 
                    kullaniciNumarasi:kullaniciNumarasiYonetici,  
                    stajTipi:stajTipi,    
                    basvuruForm:basvuruForm,
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
            else if(basvuruForm && stajRaporu){
                return res.render("yonetici/stajbelgeleri.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiYonetici,
                    stajTipi:stajTipi,   
                    basvuruForm:basvuruForm,
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(stajRaporu && degerlendirmeFormu){
                return res.render("yonetici/stajbelgeleri.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiYonetici,
                    stajTipi:stajTipi,   
                    stajRaporu:stajRaporu,
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
            else if(stajRaporu){
                return res.render("yonetici/stajbelgeleri.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiYonetici,
                    stajTipi:stajTipi,   
                    stajRaporu:stajRaporu,
                    secim:secim
            });
            }
            else if(degerlendirmeFormu){
                return res.render("yonetici/stajbelgeleri.ejs", {  
                    kullaniciNumarasi:kullaniciNumarasiYonetici,
                    stajTipi:stajTipi,   
                    degerlendirmeFormu:degerlendirmeFormu,
                    secim:secim
            });
            }
        }
        res.render("yonetici/stajbelgeleri.ejs", {
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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
            kullaniciNumara:kullaniciNumarasiYonetici,
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

const yoneticistajogrbelirle_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const stajTipi=await stajtipi.findAll();
    try {
        res.render("yonetici/stajogretmenbelirle.ejs", {
            stajTipi:stajTipi
        });
    }
    catch(err) {
        console.log(err);
    }
}
const yoneticistajogrbelirle_post=async function(req, res) {
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
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Öğrenci Bulunamadı",
                renk:"danger"
            });
        }
        else if(!ogretmenAra){
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Öğretmen Bulunamadı",
                renk:"danger"
            });
        }
        if(!belgeAra){
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Staj kaydı bulunamadı",
                renk:"danger"
            });
        }
        else if(ogretmenAra.rolID==4){
            return res.render("yonetici/stajogretmenbelirle.ejs", {
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
            return res.render("yonetici/stajogretmenbelirle.ejs", {
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
        return res.render("yonetici/stajogretmenbelirle.ejs", {
            stajTipi:stajTipi,
            message:"Sunum Oluşturuldu",
            renk:"success"
        });
    }}
    catch(err) {
        console.log(err);
    }
}

//yonetici staj ime islemleri
const stajimeislemleri_get=async function(req, res) {
    const rolKontrol=req.session.rolID;
    if(rolKontrol!=1){
        return res.redirect("/admin/erisim");
    }
    const kullaniciNumaraOgretmen=req.session.kullaniciNumara;
    const sunumAra1=await sunum.findAll({
        where:{
            kullaniciNumaraOgretmen:kullaniciNumaraOgretmen,
        }
    });
    const stajTipi=await stajtipi.findAll();
    try {
        return res.render("yonetici/stajdegerlendir.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1
        });
    }
    catch(err) {
        console.log(err);
    }
}
const stajimeislemleri_post=async function(req, res) {
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
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Kullanıcı numarasına ait kayıt bulunamadı !",
                renk:"danger"
            })
        }
        if(sunumAra2=="undefined"){
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Bu kullanıcıdan sorumlu öğretmen siz değilsiniz !",
                renk:"danger"
            })
        }
        if(eksikGun>0 && durum==7){
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik gün var ise staj durum geçti olamaz !",
                renk:"danger"
            })
        }
        if(eksikGun>onaylananGun){
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik gün sayısı onaylanan gün sayısından büyük olamaz !",
                renk:"danger"
            })
        }
        if(eksikGun==0){
            if(durum!=7){
                return res.render("yonetici/stajdegerlendir.ejs", {
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
            return res.render("yonetici/stajdegerlendir.ejs", {
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
        return res.render("yonetici/stajdegerlendir.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1,
            message:"Değerlendirme Başarılı !",
            renk:"success",
        })  
    } 
    catch(err) {
        return res.render("yonetici/stajdegerlendir.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1,
            message:"Hatalı İşlem!",
            renk:"danger",
        })
        console.log(err);
    }
}

module.exports={
    erisim_get,
    stajimeislemleri_get,
    stajimeislemleri_post,
    duyuruolustur_get,
    duyuruolustur_post,
    duyurusil_post,
    duyurusil_get,
    kullanicitablosu_get,
    kullaniciekle_get,
    kullaniciekle_post,
    stajtable_get,
    duyurutablosu_get,
    duyuruguncelle_get,
    duyuruguncelle_post,
    yoneticibelgegor_get,
    yoneticibelgegor_post,
    yoneticibasvurubelge_get,
    yoneticibasvurubelge_post,
    downloadBasvuruBelge,
    OnayBasvuruBelge,
    RetBasvuruBelge,
    profil_get,
    kullaniciguncelle_get,
    kullaniciguncelle_post,
    kullanicisil_get,
    kullanicisil_post,
    profilduzenle_get,
    profilduzenle_post,
    download3basvuru,
    download3degerlendirme,
    download3rapor,
    download2basvuru,
    download2degerlendirme,
    download2rapor,
    download1basvuru,
    download1degerlendirme,
    download1rapor,
    yoneticistajogrbelirle_get,
    yoneticistajogrbelirle_post,
}