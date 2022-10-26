const express = require("express");
const router = express.Router();
const db = require("../data/db.js");

const authController=require('../controllers/auth_controllers.js');
router.get('/duyuruolustur',authController.duyuruOlustur);
router.get('/profil',authController.profil);
router.get('/kullaniciislem',authController.kullaniciIslem);
router.get('/login',authController.loginFormunuGoster);
router.post('/login',authController.login)
// router.get('/',authController.AnasayfaGoster);

router.get("/stajimeislemleri", async function(req, res) {
    try {
        const [products, ] = await db.execute("select * from stajkayit");
        const [veri, ] = await db.execute("select * from kullanici");
        console.log(products[0])
        res.render("yonetici/stajImeIslemleri.ejs", {
            stajKayitTable: products,
        });
    }
    catch(err) {
        console.log(err);
    }
});
router.get("/kullaniciislemleri", async function(req, res) {
    try {
        const [products, ] = await db.execute("select * from kullanici");
        const [rol, ] = await db.execute("select * from rol");
        res.render("yonetici/kullanıcıIslemleri.ejs", {
            kullaniciTable: products,
            rolTable:rol
        });
    }
    catch(err) {
        console.log(err);
    }
});
router.post("/kullaniciislemleri", async function(req, res){

    const kullaniciAd=req.body.kullaniciAd;
    console.log(req.body.kullaniciAd);
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciNumara=req.body.kullaniciNumara;
    const kullaniciParola=req.body.kullaniciParola;
    const kullaniciTelNo=req.body.kullaniciTelNo;
    const kullaniciMail=req.body.kullaniciMail;
    const kulRol=req.body.kulRol;
    if(kulRol==1){
    }
    const kullaniciFakulte=req.body.kullaniciFakulte;
    const kullaniciBolum=req.body.kullaniciBolum;
    const kullaniciSinif=req.body.kullaniciSinif;
    try{
      await db.execute("INSERT INTO kullanici(kullaniciNumara,kullaniciAd,kullaniciSoyad,kullaniciParola,kullaniciMail,kullaniciTelNo,kullaniciFakulte,kullaniciBolum,kullaniciSinif,rolID) VALUES(?,?,?,?,?,?,?,?,?,?)",[kullaniciNumara,kullaniciAd,kullaniciSoyad,kullaniciParola,kullaniciMail,kullaniciTelNo,kullaniciFakulte,kullaniciBolum,kullaniciSinif,rolID])  
    }
    catch(err){
        console.log(err)
    }
})
router.post("/duyuruolustur", async function(req, res){
    const duyuruBaslik=req.body.duyuruBaslik;
    console.log(req.body.duyuruBaslik);
    const duyuruAciklama=req.body.duyuruAciklama;
    const duyuruTuru=req.body.duyuruTuru;
    console.log(req.body.duyuruAciklama);
    try{
      await db.execute("INSERT INTO duyuru(duyuruBaslik,duyuruAciklama,duyuruTuru) VALUES(?,?,?)",[duyuruBaslik,duyuruAciklama,duyuruTuru])  
    }
    catch(err){
        console.log(err)
    }
})
router.get("/", async function(req, res) {
    try {
        const [duyurular, ] = await db.execute("select * from duyuru");
        let diziUzunluk=duyurular.length;
        console.log(duyurular[0]);
        res.render("sayfalar/homepage.ejs", {
            duyuru:duyurular,
            diziUzunluk:diziUzunluk
        });
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;


