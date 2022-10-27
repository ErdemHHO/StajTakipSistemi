const db = require("../data/db.js");
const duyuru = require("../models/duyuru.js");

const anasayfa_get=async function(req, res) {
    try {
        // const [duyurular, ] = await db.execute("select * from duyuru");
        // let diziUzunluk=duyurular.length;
        const duyurular=await duyuru.findAll();
        console.log(duyurular);
        res.render("sayfalar/homepage.ejs", {
            duyurular:duyurular,
            // diziUzunluk:diziUzunluk 
        });
    }
    catch(err) {
        console.log(err);
    }
}


module.exports={
    anasayfa_get
}