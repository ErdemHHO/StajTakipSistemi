const mysql = require("mysql2");
const config = require("../config/config.js");

// const Sequelize=require("sequelize");
// const sequelize=new Sequelize(config.db.database,config.db.user,config.db.password,{
//     dialect:"mysql",
//     host:config.db.host
// })
// async function connect(){
//     try{
//     await sequelize.authenticate();
//     console.log("msqlserver bağlantısı başarılı")
//     }
//     catch(err){
//         console.log("bağlantı hatası",err);
//     }
// }
// connect();
// module.exports=sequelize; 
// let connection = mysql.createConnection(config.db);

connection.connect(function(err) {
    if(err) {
        console.log(err);
    }

    console.log("mysql bağlantısı yapıldı");
});

module.exports = connection.promise();