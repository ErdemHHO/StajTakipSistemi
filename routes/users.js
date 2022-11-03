const express = require("express");
const router = express.Router();
const isAuth=require("../middlewares/auth");
const userControllers=require("../controllers/user_controllers.js");

router.get("/anasayfa",isAuth,userControllers.ogrencihome_get);

router.get("/imebasvur",isAuth,userControllers.ogrenciimebasvur_get);
router.post("/imebasvur",isAuth,userControllers.ogrenciimebasvur_post);
router.get("/imebasvurubelgesi",isAuth,userControllers.ogrenciimebasvurubelgesi_get);
router.get("/imedegerlendirme",isAuth,userControllers.ogrenciimedegerlendirme_get);
router.get("/imerapor",isAuth,userControllers.ogrenciimerapor_get);

router.get("/staj1basvur",isAuth,userControllers.ogrencistaj1basvur_get);
router.post("/staj1basvur",isAuth,userControllers.ogrencistaj1basvur_post);
router.get("/staj1basvurubelgesi",isAuth,userControllers.ogrencistaj1basvurubelgesi_get);
router.get("/staj1degerlendirme",isAuth,userControllers.ogrencistaj1degerlendirme_get);
router.get("/staj1rapor",isAuth,userControllers.ogrencistaj1rapor_get);

router.get("/staj2basvur",isAuth,userControllers.ogrencistaj2basvur_get);
router.post("/staj2basvur",isAuth,userControllers.ogrencistaj2basvur_post);
router.get("/staj2basvurubelgesi",isAuth,userControllers.ogrencistaj2basvurubelgesi_get);
router.get("/staj2degerlendirme",isAuth,userControllers.ogrencistaj2degerlendirme_get);
router.get("/staj2rapor",isAuth,userControllers.ogrencistaj2rapor_get);

router.get("/profilOgrenci",isAuth,userControllers.profilOgrenci_get);
router.get("/pdfstaj1",userControllers.staj1pdf_get);


module.exports = router;


