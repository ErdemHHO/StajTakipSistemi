const express = require("express");
const router = express.Router();

const authControllers=require("../controllers/auth_controllers.js");




//cikis
router.get("/cikis",authControllers.logout_get);

//giris
router.get("/giris",authControllers.login_get);
router.post("/giris",authControllers.login_post);

//anasayfa
router.get("/",authControllers.anasayfa_get);


module.exports=router;