const express = require("express");
const router = express.Router();
const isAuth=require("../middlewares/auth");
const ogretmenControllers=require("../controllers/ogretmen_controllers.js");

router.get("/erisim",isAuth,ogretmenControllers.erisim_get);

router.get("/stajtablosu",isAuth,ogretmenControllers.stajogretmentable_get);

router.get("/degerlendirme",isAuth,ogretmenControllers.degerlendirogretmen_get);
router.post("/degerlendirme",isAuth,ogretmenControllers.degerlendirogretmen_post);

router.get("/profilOgretmen",isAuth,ogretmenControllers.profilOgretmen_get);

router.get("/belgegor", isAuth,ogretmenControllers.ogretmenbelgegor_get);
router.post("/belgegor", isAuth,ogretmenControllers.ogretmenbelgegor_post);

router.get("/download-3rapor",isAuth,ogretmenControllers.download3rapor);
router.get("/download-3degerlendirme",isAuth,ogretmenControllers.download3degerlendirme);
router.get("/download-3basvuru",isAuth,ogretmenControllers.download3basvuru);
router.get("/download-2rapor",isAuth,ogretmenControllers.download2rapor);
router.get("/download-2degerlendirme",isAuth,ogretmenControllers.download2degerlendirme);
router.get("/download-2basvuru",isAuth,ogretmenControllers.download2basvuru);
router.get("/download-1rapor",isAuth,ogretmenControllers.download1rapor);
router.get("/download-1degerlendirme",isAuth,ogretmenControllers.download1degerlendirme);
router.get("/download-1basvuru",isAuth,ogretmenControllers.download1basvuru);


module.exports=router;