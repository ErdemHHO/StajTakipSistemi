const express = require("express");
const router = express.Router();

const komisyonControllers=require("../controllers/komisyon_controllers.js");

router.get("/kullanicitablosu",komisyonControllers.komisyonkullanicitablosu_get);

router.get("/stajtablosu",komisyonControllers.komisyonstajtablosu_get);

router.get("/basvurubelgeleri",komisyonControllers.komisyonbasvurubelge_get);

router.get("/degerlendir",komisyonControllers.komisyondegerlendirme_get);

router.get("/ogrbelirle",komisyonControllers.komisyonstajogrbelirle_get);

router.get("/profil",komisyonControllers.profilKomisyon_get);

router.get("/belgegor",komisyonControllers.komisyonbelgegor_get);


module.exports=router;