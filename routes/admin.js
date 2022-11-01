const express = require("express");
const router = express.Router();

//controllers
const adminControllers=require("../controllers/admin_controllers");


//------------------DUYURU------------------
//tablo
router.get("/duyurular",adminControllers.duyurutablosu_get);
//oluştur
router.get("/duyuruolustur",adminControllers.duyuruolustur_get);
router.post("/duyuruolustur",adminControllers.duyuruolustur_post);
//guncelle
router.get("/duyuruguncelle", adminControllers.duyuruguncelle_get);
router.post("/duyuruguncelle", adminControllers.duyuruguncelle_post);
//sil
router.get("/duyurusil", adminControllers.duyurusil_get);
router.post("/duyurusil", adminControllers.duyurusil_post);
//------------------DUYURU------------------
//tablo
router.get("/kullanicitablosu", adminControllers.kullanicitablosu_get);
//ekle
router.get("/kullaniciekle", adminControllers.kullaniciekle_get);
router.post("/kullaniciekle", adminControllers.kullaniciekle_post);
//guncelle
router.get("/kullaniciguncelle", adminControllers.kullaniciguncelle_get);
router.post("/kullaniciguncelle", adminControllers.kullaniciguncelle_post);
//sil
router.get("/kullanicisil", adminControllers.kullanicisil_get);
router.post("/kullanicisil", adminControllers.kullanicisil_post);


//------------------STAJ------------------
router.get("/ogrtmnbelirle", adminControllers.stajogretmenbelirle_get);

router.get("/belgegor", adminControllers.stajbelgeleri_get);

router.get("/basvurudegerlendir", adminControllers.stajbasvurudegerlendir_get);

//yönetici stajtable işlemleri
router.get("/stajimetablosu",adminControllers.stajtable_get);

//staj ime işlemleri get-post
router.get("/stajdegerlendir",adminControllers.stajimeislemleri_get);


router.get("/profil", adminControllers.profil_get);




module.exports=router;