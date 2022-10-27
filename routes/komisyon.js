const express = require("express");
const router = express.Router();


router.get("/stajimeislemleri",komisyon_controllers.komisyonsayfasi_get);

module.exports=router;