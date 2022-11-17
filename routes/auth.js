const express = require("express");
const router = express.Router();

const authControllers=require("../controllers/auth_controllers.js");



router.get("/loading",authControllers.loading_get);

//cikis
router.get("/cikis",authControllers.logout_get);

//Sifre Sifirlama
router.get("/sifresifirlama",authControllers.sifreSifirlama_get);
router.post("/sifresifirlama",authControllers.sifreSifirlama_post);

//giris
router.get("/giris",authControllers.login_get);
router.post("/giris",authControllers.login_post);

//anasayfa
router.get("/",authControllers.anasayfa_get);


module.exports=router;