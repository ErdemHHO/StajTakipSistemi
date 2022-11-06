const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');
// const sorumluluk=sequelize.define("sorumluluk",{});
  const sorumluluk=sequelize.define("sorumluluk",{
    kullaniciNumara: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'kullanici',
        key: 'kullaniciNumara'
      }
    },
    stajTipiID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stajtipi',
        key: 'stajTipiID'
      }
    },
    sorumluMu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sorumluluk',
    timestamps: false,
    indexes: [
      {
        name: "stajTipiID",
        using: "BTREE",
        fields: [
          { name: "stajTipiID" },
        ]
      },
      {
        name: "kullaniciNumara",
        using: "BTREE",
        fields: [
          { name: "kullaniciNumara" },
        ]
      },
    ]
  });
// async function sync(){
//   await sorumluluk.sync({force:true});
//   console.log("sorumluluk tablosu eklendi");
// } 
// sync();
module.exports=sorumluluk;