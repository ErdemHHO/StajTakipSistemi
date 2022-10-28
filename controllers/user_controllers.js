const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");

const anasayfa_get=async function(req, res) {
    try {
        const duyurular=await duyuru.findAll();
        console.log(duyurular);
        res.render("home-login/homepage.ejs", {
            duyurular:duyurular,
        });
    }
    catch(err) {
        console.log(err);
    }
}


module.exports={
    anasayfa_get
}