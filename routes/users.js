const express = require("express");
const router = express.Router();
const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");
const isAuth=require("../middlewares/auth");
const userControllers=require("../controllers/user_controllers.js");

router.get("/anasayfa",isAuth,userControllers.ogrencihome);
router.get("/imebasvur",isAuth,userControllers.ogrenciimebasvur);
router.get("/imebasvurubelgesi",isAuth,userControllers.ogrenciimebasvurubelgesi);
router.get("/imedegerlendirme",isAuth,userControllers.ogrenciimedegerlendirme);
router.get("/imerapor",isAuth,userControllers.ogrenciimerapor);
router.get("/staj1basvur",isAuth,userControllers.ogrencistaj1basvur);
router.get("/staj1basvurubelgesi",isAuth,userControllers.ogrencistaj1basvurubelgesi);
router.get("/staj1degerlendirme",isAuth,userControllers.ogrencistaj1degerlendirme);
router.get("/staj1rapor",isAuth,userControllers.ogrencistaj1rapor);
router.get("/staj2basvur",isAuth,userControllers.ogrencistaj2basvur);
router.get("/staj2basvurubelgesi",isAuth,userControllers.ogrencistaj2basvurubelgesi);
router.get("/staj2degerlendirme",isAuth,userControllers.ogrencistaj2degerlendirme);
router.get("/staj2rapor",isAuth,userControllers.ogrencistaj2rapor);
router.get("/profilOgrenci",isAuth,userControllers.profilOgrenci);


module.exports = router;


