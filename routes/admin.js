const express = require("express");
const router = express.Router();

//controllers
const adminControllers=require("../controllers/admin_controllers");
//middleware
const isAuth=require("../middlewares/auth");
//------------------DUYURU------------------
//tablo
router.get("/duyurular",isAuth,adminControllers.duyurutablosu_get);
//oluştur
router.get("/duyuruolustur",isAuth,adminControllers.duyuruolustur_get);
router.post("/duyuruolustur",isAuth,adminControllers.duyuruolustur_post);
//guncelle
router.get("/duyuruguncelle",isAuth,adminControllers.duyuruguncelle_get);
router.post("/duyuruguncelle",isAuth, adminControllers.duyuruguncelle_post);
//sil
router.get("/duyurusil",isAuth,adminControllers.duyurusil_get);
router.post("/duyurusil", isAuth,adminControllers.duyurusil_post);
//------------------DUYURU------------------
//tablo
router.get("/kullanicitablosu", isAuth,adminControllers.kullanicitablosu_get);
//ekle
router.post("/kullaniciekle",isAuth,adminControllers.kullaniciekle_post);
router.get("/kullaniciekle", isAuth,adminControllers.kullaniciekle_get);

//guncelle
router.get("/kullaniciguncelle",isAuth,adminControllers.kullaniciguncelle_get);
router.post("/kullaniciguncelle",isAuth, adminControllers.kullaniciguncelle_post);
//sil
router.get("/kullanicisil", isAuth,adminControllers.kullanicisil_get);
router.post("/kullanicisil",isAuth, adminControllers.kullanicisil_post);


//------------------STAJ------------------
router.get("/ogrtmnbelirle",isAuth,adminControllers.stajogretmenbelirle_get);

router.get("/belgegor", isAuth,adminControllers.stajbelgeleri_get);

router.get("/basvurudegerlendir",isAuth,adminControllers.stajbasvurudegerlendir_get);

//yönetici stajtable işlemleri
router.get("/stajimetablosu",isAuth,adminControllers.stajtable_get);

//staj ime işlemleri get-post
router.get("/stajdegerlendir",isAuth,adminControllers.stajimeislemleri_get);


router.get("/profil", isAuth, adminControllers.profil_get);

router.get("/profiliduzenle", isAuth,adminControllers.profilduzenle_get);
router.post("/profiliduzenle", isAuth, adminControllers.profilduzenle_post);




module.exports=router;