const express = require("express");
const router = express.Router();


//controllers
const adminControllers=require("../controllers/admin_controllers");

//staj ime işlemleri get-post
router.get("/stajimeislemleri",adminControllers.stajimeislemleri_get);

//duyuru oluştur sayfası get-post
router.get("/duyuruolustur",adminControllers.duyuruolustur_get);
router.post("/duyuruolustur",adminControllers.duyuruolustur_post);


router.get("/kullaniciislemleri", adminControllers.kullaniciislemleri_get);

// router.post("/kullaniciislemleri", async function(req, res){

//     const kullaniciAd=req.body.kullaniciAd;
//     console.log(req.body.kullaniciAd);
//     const kullaniciSoyad=req.body.kullaniciSoyad;
//     console.log(req.body.kullaniciSoyad);
//     const kullaniciNumara=req.body.kullaniciNumara;
//     console.log(req.body.kullaniciNumara);
//     const kullaniciParola=req.body.kullaniciParola;
//     console.log(req.body.kullaniciParola);
//     const kullaniciTelNo=req.body.kullaniciTelNo;
//     console.log(req.body.kullaniciTelNo);
//     const kullaniciMail=req.body.kullaniciMail;
//     console.log(req.body.kullaniciMail);
//     const kulRol=req.body.kulRol;
//     console.log(req.body.kulRol);
//     const kullaniciFakulte=req.body.kullaniciFakulte;
//     console.log(req.body.kullaniciFakulte);
//     const kullaniciBolum=req.body.kullaniciBolum;
//     console.log(req.body.kullaniciBolum);
//     const kullaniciSinif=req.body.kullaniciSinif;
//     console.log(req.body.kullaniciSinif);
//     try{
//       await db.execute("INSERT INTO kullanici(kullaniciNumara,kullaniciAd,kullaniciSoyad,kullaniciParola,kullaniciMail,kullaniciTelNo,kullaniciFakulte,kullaniciBolum,kullaniciSinif,rolID) VALUES(?,?,?,?,?,?,?,?,?,?)",[kullaniciNumara,kullaniciAd,kullaniciSoyad,kullaniciParola,kullaniciMail,kullaniciTelNo,kullaniciFakulte,kullaniciBolum,kullaniciSinif,kulRol])  
//     }
//     catch(err){
//         console.log(err)
//     }
// })
//


module.exports=router;