const express = require("express");
const router = express.Router();
const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");

const userControllers=require("../controllers/user_controllers.js");

router.get("/anasayfa",userControllers.ogrencihome);
router.get("/imebasvur",userControllers.ogrenciimebasvur);
router.get("/imebasvurubelgesi",userControllers.ogrenciimebasvurubelgesi);
router.get("/imedegerlendirme",userControllers.ogrenciimedegerlendirme);
router.get("/imerapor",userControllers.ogrenciimerapor);
router.get("/staj1basvur",userControllers.ogrencistaj1basvur);
router.get("/staj1basvurubelgesi",userControllers.ogrencistaj1basvurubelgesi);
router.get("/staj1degerlendirme",userControllers.ogrencistaj1degerlendirme);
router.get("/staj1rapor",userControllers.ogrencistaj1rapor);
router.get("/staj2basvur",userControllers.ogrencistaj2basvur);
router.get("/staj2basvurubelgesi",userControllers.ogrencistaj2basvurubelgesi);
router.get("/staj2degerlendirme",userControllers.ogrencistaj2degerlendirme);
router.get("/staj2rapor",userControllers.ogrencistaj2rapor);
router.get("/profilOgrenci",userControllers.profilOgrenci);


module.exports = router;


