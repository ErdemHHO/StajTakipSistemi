const express = require("express");
const router = express.Router();
const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");



const userControllers=require("../controllers/user_controllers");
const authControllers=require("../controllers/auth_controllers");

router.post("/login",authControllers.login_post);
router.get("/login",authControllers.login_get);
router.get("/",userControllers.anasayfa_get);


// const authController=require('../controllers/auth_controllers.js');
// //router.get('/duyuruolustur',authController.duyuruOlustur);
// router.get('/profil',authController.profil);
// router.get('/kullaniciislem',authController.kullaniciIslem);
// router.get('/login',authController.loginFormunuGoster);
// router.post('/login',authController.login)

// // router.get('/',authController.AnasayfaGoster);


module.exports = router;


