const express = require("express");
const router = express.Router();

//controllers
const adminControllers=require("../controllers/admin_controllers");


//duyuru oluştur sayfası get-post
router.get("/duyuruolustur",adminControllers.duyuruolustur_get);
router.post("/duyuruolustur",adminControllers.duyuruolustur_post);
//duyuru tablosu sayfası 
router.get("/duyurular",adminControllers.duyurutablosu_get);

router.get("/duyuruguncelle", adminControllers.duyuruguncelle_get);
router.post("/duyuruguncelle", adminControllers.duyuruguncelle_post);

router.get("/duyurusil", adminControllers.duyurusil_get);
//kullanici tablosu get-post
router.get("/kullanicitablosu", adminControllers.kullanicitablosu_get);

//kullanici ekle get-post
router.get("/kullaniciekle", adminControllers.kullaniciekle_get);
router.post("/kullaniciekle", adminControllers.kullaniciekle_post);

router.get("/kullaniciguncelle", adminControllers.kullaniciguncelle_get);

router.get("/kullaniciisil", adminControllers.kullanicisil_get);



router.get("/ogrtmnbelirle", adminControllers.stajogretmenbelirle_get);

router.get("/belgegor", adminControllers.stajbelgeleri_get);

router.get("/basvurudegerlendir", adminControllers.stajbasvurudegerlendir_get);

//yönetici stajtable işlemleri
router.get("/stajimetablosu",adminControllers.stajtable_get);

//staj ime işlemleri get-post
router.get("/stajimeislemleri",adminControllers.stajimeislemleri_get);
router.get("/stajimeislemleri",adminControllers.stajimeislemleri_get);


router.get("/profil", adminControllers.profil_get);




module.exports=router;