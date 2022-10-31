const express = require("express");
const router = express.Router();

const ogretmenControllers=require("../controllers/ogretmen_controllers.js");


router.get("/stajtablosu",ogretmenControllers.stajogretmentable_get);
router.get("/degerlendirme",ogretmenControllers.degerlendirogretmen_get);
router.get("/profilOgretmen",ogretmenControllers.profilOgretmen_get);
router.get("/belgeler",ogretmenControllers.belgelerogretmen_get);


module.exports=router;