const express = require("express");
const router = express.Router();

//controllers
const adminControllers=require("../controllers/admin_controllers");
//middleware
const isAuth=require("../middlewares/auth");



router.get("/erisim",isAuth,adminControllers.erisim_get);
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
router.get("/ogrtmnbelirle",isAuth,adminControllers.yoneticistajogrbelirle_get);
router.post("/ogrtmnbelirle",isAuth,adminControllers.yoneticistajogrbelirle_post);

router.get("/belgegor", isAuth,adminControllers.yoneticibelgegor_get);
router.post("/belgegor", isAuth,adminControllers.yoneticibelgegor_post);

router.get("/download-3rapor",isAuth,adminControllers.download3rapor);
router.get("/download-3degerlendirme",isAuth,adminControllers.download3degerlendirme);
router.get("/download-3basvuru",isAuth,adminControllers.download3basvuru);
router.get("/download-2rapor",isAuth,adminControllers.download2rapor);
router.get("/download-2degerlendirme",isAuth,adminControllers.download2degerlendirme);
router.get("/download-2basvuru",isAuth,adminControllers.download2basvuru);
router.get("/download-1rapor",isAuth,adminControllers.download1rapor);
router.get("/download-1degerlendirme",isAuth,adminControllers.download1degerlendirme);
router.get("/download-1basvuru",isAuth,adminControllers.download1basvuru);



router.get("/basvurudegerlendir",isAuth,adminControllers.yoneticibasvurubelge_get);
router.post("/basvurudegerlendir",isAuth,adminControllers.yoneticibasvurubelge_post);
router.get("/download-basvuruBelge",isAuth,adminControllers.downloadBasvuruBelge);
router.get("/basvuruBelgeOnay",isAuth,adminControllers.OnayBasvuruBelge);
router.get("/basvuruBelgeRet",isAuth,adminControllers.RetBasvuruBelge);

//yönetici stajtable işlemleri
router.get("/stajimetablosu",isAuth,adminControllers.stajtable_get);

//staj ime işlemleri get-post
router.get("/stajdegerlendir",isAuth,adminControllers.stajimeislemleri_get);
router.post("/stajdegerlendir",isAuth,adminControllers.stajimeislemleri_post);


router.get("/profil", isAuth, adminControllers.profil_get);

router.get("/profiliduzenle", isAuth,adminControllers.profilduzenle_get);
router.post("/profiliduzenle", isAuth, adminControllers.profilduzenle_post);




module.exports=router;