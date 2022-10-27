const express = require("express");
const router = express.Router();
const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");

const authController=require('../controllers/auth_controllers.js');
//router.get('/duyuruolustur',authController.duyuruOlustur);
router.get('/profil',authController.profil);
router.get('/kullaniciislem',authController.kullaniciIslem);
router.get('/login',authController.loginFormunuGoster);
router.post('/login',authController.login)

// router.get('/',authController.AnasayfaGoster);

router.get("/", async function(req, res) {
    try {
        // const [duyurular, ] = await db.execute("select * from duyuru");
        // let diziUzunluk=duyurular.length;
        const duyurular=await duyuru.findAll();
        console.log(duyurular);
        res.render("sayfalar/homepage.ejs", {
            duyurular:duyurular,
            // diziUzunluk:diziUzunluk 
        });
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;


