const express = require("express");
const router = express.Router();
const isAuth=require("../middlewares/auth");
const komisyonControllers=require("../controllers/komisyon_controllers.js");

router.get("/kullanicitablosu",isAuth,komisyonControllers.komisyonkullanicitablosu_get);

router.get("/stajtablosu",isAuth,komisyonControllers.komisyonstajtablosu_get);

router.get("/basvurubelgeleri",isAuth,komisyonControllers.komisyonbasvurubelge_get);

router.get("/degerlendir",isAuth,komisyonControllers.komisyondegerlendirme_get);

router.get("/ogrbelirle",isAuth,komisyonControllers.komisyonstajogrbelirle_get);

router.get("/profil",isAuth,komisyonControllers.profilKomisyon_get);

router.get("/belgegor",isAuth,komisyonControllers.komisyonbelgegor_get);


module.exports=router;