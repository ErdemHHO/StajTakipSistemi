const express = require("express");
const router = express.Router();
const isAuth=require("../middlewares/auth");
const ogretmenControllers=require("../controllers/ogretmen_controllers.js");


router.get("/stajtablosu",isAuth,ogretmenControllers.stajogretmentable_get);
router.get("/degerlendirme",isAuth,ogretmenControllers.degerlendirogretmen_get);
router.get("/profilOgretmen",isAuth,ogretmenControllers.profilOgretmen_get);
router.get("/belgeler",isAuth,ogretmenControllers.belgelerogretmen_get);


module.exports=router;