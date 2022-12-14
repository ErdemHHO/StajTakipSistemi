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
// yonetici duyuru g??ncelle islemleri
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
        const duyurubasl??k= req.body.duyuruBaslik;
        const duyuruac??klama= req.body.duyuruAciklama;
        const duyurutur = req.body.duyuruTuru;
    
        try {
            const Duyuru=await duyuru.findOne({
                where:{
                    duyuruBaslik: duyurubasl??k
                }
            })
    
            if (Duyuru) {
    
                Duyuru.duyuruBaslik = duyurubasl??k;
                Duyuru.duyuruAciklama = duyuruac??klama;
                Duyuru.duyuruTuru = duyurutur;
    
                await Duyuru.save();
                console.log("ba??ar??l??..")
                return res.render("yonetici/duyuruguncelle.ejs",{
                    message: "Duyuru G??ncellendi"
                });
                
            }else{
                return res.render("yonetici/duyuruguncelle.ejs",{
                    message: "Duyuru Bulunamad??"
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
    const duyuruNumaras?? = req.body.duyurunumaras??;

    console.log(duyuruNumaras??);
    try {
        const Duyuru = await duyuru.findByPk(duyuruNumaras??);
        if(Duyuru) {
            await Duyuru.destroy({
                where:{
                    duyuruID:duyuruNumaras??
                }
            });
            return res.render("yonetici/duyurusil.ejs",{
                message: "Duyuru Silindi"
            });
        }else{
            return res.render("yonetici/duyurusil.ejs",{
                message: " Duyuru Bulunamad??"
            });
        }
    }
    catch(err) {
        console.log(err);
    }

}
//yonetici kullan??ci tablo islemleri
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

//yonetici kullan??ci ekle islemleri
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
                message:"Y??netici,komisyon ve ????retmen numaralar?? 4 haneli bir say?? olmal??d??r.",
                renk:"danger"
                });
            }  
        }
        if(rolID==4){
            if(kullaniciNumara<=99999999 || kullaniciNumara>999999999){
                return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"????renci Numaras?? 11 haneli bir say?? olmal??d??r.",
                renk:"danger"
                });
            }  
        }
        if(kullaniciTelNo<=999999999 || kullaniciTelNo>=9999999999){
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Ge??erli bir telefon numaras?? giriniz.",
                renk:"danger"
            });  
        }
        if(kullaniciMailKontrol){
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Mail adresinizle kay??tl?? bir kullan??c?? var.",
                renk:"danger"
            });  
        }
        if(kullaniciTelKontrol){
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Telefon numaran??zla kay??tl?? bir kullan??c?? var.",
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
                subject:"Hesab??n??z olu??turuldu.",
                html:'<p> Hesab??n??z ba??ar??l?? bir ??ekilde olu??turuldu.</p> <br> <p> ??ifreniz: ' + kullaniciParola + '</p><br> ??ifrenizi g??ncellemek i??in t??klay??n: <a href="http://localhost:3000/sifresifirlama">Parola S??f??rla</a>'
                });
            return res.render("yonetici/kullaniciekle.ejs", {
                rol:roller,
                message:"Kullan??c?? Eklendi.",
                renk:"success"
            });    
        }
        return res.render("yonetici/kullaniciekle.ejs", {
            rol:roller,
            message:"Kullan??c?? Kayd?? Zaten Var",
            renk:"danger"
        });    
    }
    catch(err) {
        console.log(err);
        console.log("hatal?? ekleme");
        return res.render("yonetici/kullaniciekle.ejs", {
            rol:roller,
            message:"Hatal?? Ekleme",
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
                message: "S??per Admin Silinemez"
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
                console.log("de??erlendirme silindi")
            }
            if(stajdegerlendirmeSil2){
                await stajdegerlendirmeSil2.destroy()
                console.log("de??erlendirme silindi")
            }
            if(stajdegerlendirmeSil3){
                await stajdegerlendirmeSil3.destroy()
                console.log("de??erlendirme silindi")
            }
            await Kullanici.destroy();
            return res.render("yonetici/kullanicisil.ejs",{
                renk:"success",
                message: "Kullan??c?? Silindi"
            });
        }
        else{
            return res.render("yonetici/kullanicisil.ejs",{
                renk:"danger",
                message: " Kullan??c?? Bulunamad??"
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
    const kullan??c?? = await kullanici.findOne({
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
        if(!kullan??c??){
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                renk:"danger",
                message: " Kullan??c?? Bulunamad??"
            });
        }
        if(kullaniciTelNo<=999999999 || kullaniciTelNo>=9999999999){
            return res.render("yonetici/kullaniciguncelle.ejs", {
                rol:roller,
                message:"Ge??erli bir telefon numaras?? giriniz.",
                renk:"danger"
            });  
        }
        if (kullan??c??) {
            kullan??c??.kullaniciNumara = kullaniciNumara;
            kullan??c??.kullaniciAd = kullaniciAd;
            kullan??c??.kullaniciSoyad = kullaniciSoyad;
            kullan??c??.kullaniciParola = hashedPassword;
            kullan??c??.kullaniciMail = kullaniciMail;
            kullan??c??.kullaniciTelNo = kullaniciTelNo;
            kullan??c??.kullaniciFakulte = kullaniciFakulte;
            kullan??c??.kullaniciBolum = kullaniciBolum;
            kullan??c??.kullaniciSinif = kullaniciSinif;
            kullan??c??.rolID = rolID;
            await kullan??c??.save();
            emailService.sendMail({
                from:config.email.from,
                to:kullan??c??.kullaniciMail,
                subject:"Hesap Bilgileriniz G??ncellendi",
                html:'<p> Hesab??n??z bilgileriniz '+yoneticiAdi+' '+yoneticiSoyadi+' taraf??ndan g??ncellendi.</p> <br> <p> Numaran??z: ' + kullaniciNumara + '</p><br> <p> ??ifreniz: ' + kullaniciParola + '<br> <p> Sistemde kay??tl?? ad??n??z ve soyad??n??z: ' + kullaniciAd + ' ' + kullaniciSoyad + '<br> <p> Sistemde Kay??tl?? Mail Adresiniz: ' + kullaniciMail + '<p>Sistemde Kay??tl?? Telefon Numaran??z: ' + kullaniciTelNo + '</p></p><br> ??ifrenizi g??ncellemek i??in t??klay??n: <a href="http://localhost:3000/sifresifirlama">Parola S??f??rla</a>'
                });
            console.log("ba??ar??l??")
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                renk:"success",
                message :"Kullan??c?? G??ncellendi"
            });
        }else{
            return res.render("yonetici/kullaniciguncelle.ejs",{
                roller:roller,
                renk:"warning",
                message: " Kullan??c?? Bulunamad??"
            });
        }

        
    } catch (err) {
        return res.render("yonetici/kullaniciguncelle.ejs",{
            roller:roller,
            renk:"danger",
            message: "Hatal?? G??ncelleme"
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
    const eskiSifre=req.body.kullan??c??Sifre;
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
                    message: "Bilgileriniz G??ncellendi!"
                });
            }else{
                res.render("yonetici/profilduzenle.ejs", {
                    message: "Yeni ??ifreleriniz ayn?? de??il"
                });
            }
        }
        else{
            res.render("yonetici/profilduzenle.ejs", {
                message: "??ifreniz Yanl????!"
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
//yonetici staj-ime bilgi tablosu i??lemleri
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
                message:"Belge Bulunamad??",
                renk:"danger"
            });
        }
        return res.render("yonetici/stajbasvurudegerlendir.ejs", {
            stajTipi:stajTipi,
            kullaniciNumarasi:basvuruBelgekullaniciNumarasi,
            message:"Belge Bulunamad??",
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

    let messageRet="Ba??vuru Onayland??";
    global.messageRet=messageRet;
    let renkRet="success";
    global.renkRet=renkRet;
    const stajTipi=await stajtipi.findAll();

    try {
        emailService.sendMail({
            from:config.email.from,
            to:kullaniciMail,
            subject:"Staj Ba??vurunuz",
            html:'<p> Staj Ba??vurunuz <ins><strong>' +reddedenAdi+' '+reddedenSoyadi+'</ins></strong> Taraf??ndan Onayland??.</p> <br> <p> Staj bitiminde staj de??erlendirme belgenizi ve staj raporunuzu y??kleyiniz.</p>'
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

    let messageRet="Ba??vuru Reddedildi";
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
            subject:"Staj Ba??vurunuz",
            html:'<p style="color: red;""> Staj Ba??vurunuz Staj ??artlar??na Uygun G??r??lemedi??inden <ins><strong>' +reddedenAdi+' '+reddedenSoyadi+'</ins></strong> Taraf??ndan Reddedildi.</p> <br> <p> <ins><strong>' +reddedenAdi+' '+reddedenSoyadi+'</ins></strong> Hocan??zla ??leti??ime Ge??iniz.</p>'
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
            message:"Kullan??c?? staj bilgisi bulunamad??.",
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
                message:"????renci Bulunamad??",
                renk:"danger"
            });
        }
        else if(!ogretmenAra){
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"????retmen Bulunamad??",
                renk:"danger"
            });
        }
        if(!belgeAra){
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Staj kayd?? bulunamad??",
                renk:"danger"
            });
        }
        else if(ogretmenAra.rolID==4){
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Se??ilen ki??inin rol?? ????retmen,komisyon veya y??netici olmal??d??r.",
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
                subject:"Staj Sunumunuz De??i??tirildi",
                html:'<p>' +stajTipiAdi2+ ' Sunum Bilgileriniz <ins><strong>' +belirleyenAdi+' '+belirleyenSoyadi+'</ins></strong> Taraf??ndan G??ncellendi.</p> <br> <p> Yeni Sunum Tarihiniz:' +sunumTarihi+ '<br> Sunum Yapaca????n??z ????retmen: ' +ogretmenAdi+' '+ogretmenSoyadi+' </p>'
                });
            return res.render("yonetici/stajogretmenbelirle.ejs", {
                stajTipi:stajTipi,
                message:"Sunum Tarihi Daha ??nce Belirlenmi??. ",
                message2:"Sunum Tarihi G??ncellendi",
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
                html:'<p>' +stajTipiAdi2+' Sunum Bilgileriniz <ins><strong>' +belirleyenAdi+' '+belirleyenSoyadi+'</ins></strong> Taraf??ndan Belirlendi.</p> <br> <p> Sunum Tarihiniz:' +sunumTarihi+ '<br> Sunum Yapaca????n??z ????retmen: ' +ogretmenAdi+' '+ogretmenSoyadi+' </p>'
                }); 
        return res.render("yonetici/stajogretmenbelirle.ejs", {
            stajTipi:stajTipi,
            message:"Sunum Olu??turuldu",
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
    //Buras?? sayfan??n getinde kullan??lanlar !!!
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
                message:"Kullan??c?? numaras??na ait kay??t bulunamad?? !",
                renk:"danger"
            })
        }
        if(sunumAra2=="undefined"){
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Bu kullan??c??dan sorumlu ????retmen siz de??ilsiniz !",
                renk:"danger"
            })
        }
        if(eksikGun>0 && durum==7){
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik g??n var ise staj durum ge??ti olamaz !",
                renk:"danger"
            })
        }
        if(eksikGun>onaylananGun){
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik g??n say??s?? onaylanan g??n say??s??ndan b??y??k olamaz !",
                renk:"danger"
            })
        }
        if(eksikGun==0){
            if(durum!=7){
                return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Eksik yok ise staj durumu; kald?? veya eksik g??n var olamaz !",
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
                subject:"Staj De??erlendirmeniz G??ncellendi",
                html:'<p>' +stajTuru+ ' De??erlendirmeniz <ins><strong>' +ogrAdi+' '+ogrSoyadi+'</ins></strong> Taraf??ndan G??ncellendi.</p> <br> <p> Staj Durumunuz: ' +durumAdi2+ '<br> Onaylanan G??n Say??n??z: ' +onaylananGun+' <br> Eksik G??n Say??n??z: '+eksikGun+'</p>'
                }); 
            return res.render("yonetici/stajdegerlendir.ejs", {
                stajTipi:stajTipi,
                sunum:sunumAra1,
                message:"Bu kullan??c??n??n daha ??nceden de??erlendirmesi yap??lm???? !",
                renk:"warning",
                message2:"De??erlendirme G??ncellendi",
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
            subject:"Staj De??erlendirmeniz Yap??ld??",
            html:'<p>' +stajTuru+ ' De??erlendirmeniz <ins><strong>' +ogrAdi+' '+ogrSoyadi+'</ins></strong> Taraf??ndan Yap??ld??.</p> <br> <p> Staj Durumunuz: ' +durumAdi2+ '<br> Onaylanan G??n Say??n??z: ' +onaylananGun+' <br> Eksik G??n Say??n??z: '+eksikGun+'</p>'
            }); 
        return res.render("yonetici/stajdegerlendir.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1,
            message:"De??erlendirme Ba??ar??l?? !",
            renk:"success",
        })  
    } 
    catch(err) {
        return res.render("yonetici/stajdegerlendir.ejs", {
            stajTipi:stajTipi,
            sunum:sunumAra1,
            message:"Hatal?? ????lem!",
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