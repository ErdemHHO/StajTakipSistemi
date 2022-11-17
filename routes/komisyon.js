const express = require("express");
const router = express.Router();
const isAuth=require("../middlewares/auth");
const komisyonControllers=require("../controllers/komisyon_controllers.js");

router.get("/erisim",isAuth,komisyonControllers.erisim_get);

router.get("/kullanicitablosu",isAuth,komisyonControllers.komisyonkullanicitablosu_get);

router.get("/stajtablosu",isAuth,komisyonControllers.komisyonstajtablosu_get);

router.get("/sorumluluk",isAuth,komisyonControllers.komisyonsorumluluk_get);
router.post("/sorumluluk",isAuth,komisyonControllers.komisyonsorumluluk_post);

router.get("/basvurubelgeleri",isAuth,komisyonControllers.komisyonbasvurubelge_get);
router.post("/basvurubelgeleri",isAuth,komisyonControllers.komisyonbasvurubelge_post);
router.get("/download-basvuruBelge",isAuth,komisyonControllers.downloadBasvuruBelge);
router.get("/basvuruBelgeOnay",isAuth,komisyonControllers.OnayBasvuruBelge);
router.get("/basvuruBelgeRet",isAuth,komisyonControllers.RetBasvuruBelge);

router.get("/degerlendir",isAuth,komisyonControllers.komisyondegerlendirme_get);
router.post("/degerlendir",isAuth,komisyonControllers.komisyondegerlendirme_post);

router.get("/ogrbelirle",isAuth,komisyonControllers.komisyonstajogrbelirle_get);
router.post("/ogrbelirle",isAuth,komisyonControllers.komisyonstajogrbelirle_post);

router.get("/profil",isAuth,komisyonControllers.profilKomisyon_get);

router.get("/belgegor",isAuth,komisyonControllers.komisyonbelgegor_get);
router.post("/belgegor",isAuth,komisyonControllers.komisyonbelgegor_post);

router.get("/download-3rapor",isAuth,komisyonControllers.download3rapor);
router.get("/download-3degerlendirme",isAuth,komisyonControllers.download3degerlendirme);
router.get("/download-3basvuru",isAuth,komisyonControllers.download3basvuru);
router.get("/download-2rapor",isAuth,komisyonControllers.download2rapor);
router.get("/download-2degerlendirme",isAuth,komisyonControllers.download2degerlendirme);
router.get("/download-2basvuru",isAuth,komisyonControllers.download2basvuru);
router.get("/download-1rapor",isAuth,komisyonControllers.download1rapor);
router.get("/download-1degerlendirme",isAuth,komisyonControllers.download1degerlendirme);
router.get("/download-1basvuru",isAuth,komisyonControllers.download1basvuru);


module.exports=router;