const express = require("express");
const router = express.Router();
const isAuth=require("../middlewares/auth");
const userControllers=require("../controllers/user_controllers.js");
const fileUpload = require("../helpers/file-upload");

router.get("/anasayfa",isAuth,userControllers.ogrencihome_get);

router.get("/imebasvur",isAuth,userControllers.ogrenciimebasvur_get);
router.post("/imebasvur",isAuth,userControllers.ogrenciimebasvur_post);
router.get("/imebasvurubelgesi",isAuth,userControllers.ogrenciimebasvurubelgesi_get);
router.post("/imebasvurubelgesi", fileUpload.upload.single("basvuruform"),isAuth,userControllers.ogrenciimebasvurubelgesi_post);
router.get("/imedegerlendirme",isAuth,userControllers.ogrenciimedegerlendirme_get);
router.post("/imedegerlendirme",fileUpload.upload.single("degerlendirmeFormu"), isAuth,userControllers.ogrenciimedegerlendirme_post);
router.get("/imerapor",isAuth,userControllers.ogrenciimerapor_get);
router.post("/imerapor",fileUpload.upload.single("stajRaporu"),isAuth,userControllers.ogrenciimerapor_post);

router.get("/staj1basvur",isAuth,userControllers.ogrencistaj1basvur_get);
router.post("/staj1basvur",isAuth,userControllers.ogrencistaj1basvur_post);

router.get("/staj1basvurubelgesi",isAuth,userControllers.ogrencistaj1basvurubelgesi_get);
router.post("/staj1basvurubelgesi", fileUpload.upload.single("basvuruform"), isAuth, userControllers.ogrencistaj1basvurubelgesi_post);

router.get("/staj1degerlendirme",isAuth,userControllers.ogrencistaj1degerlendirme_get);
router.post("/staj1degerlendirme", fileUpload.upload.single("degerlendirmeFormu"), isAuth, userControllers.ogrencistaj1degerlendirme_post);

router.get("/staj1rapor",isAuth,userControllers.ogrencistaj1rapor_get);
router.post("/staj1rapor",fileUpload.upload.single("stajRaporu"),isAuth,userControllers.ogrencistaj1rapor_post);

router.get("/staj2basvur",isAuth,userControllers.ogrencistaj2basvur_get);
router.post("/staj2basvur",isAuth,userControllers.ogrencistaj2basvur_post);

router.get("/staj2basvurubelgesi",isAuth,userControllers.ogrencistaj2basvurubelgesi_get);
router.post("/staj2basvurubelgesi", fileUpload.upload.single("basvuruform"),isAuth,userControllers.ogrencistaj2basvurubelgesi_post);

router.get("/staj2degerlendirme",isAuth,userControllers.ogrencistaj2degerlendirme_get);
router.post("/staj2degerlendirme", fileUpload.upload.single("degerlendirmeFormu"), isAuth,userControllers.ogrencistaj2degerlendirme_post);

router.get("/staj2rapor",isAuth,userControllers.ogrencistaj2rapor_get);
router.post("/staj2rapor",fileUpload.upload.single("stajRaporu"),isAuth,userControllers.ogrencistaj2rapor_post);


router.get("/profilOgrenci",isAuth,userControllers.profilOgrenci_get);
router.get("/pdfstaj1",userControllers.staj1pdf_get);


module.exports = router;


