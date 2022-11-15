const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const sunum=sequelize.define("sunum",{
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
    sunumTarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    kullaniciNumaraOgretmen: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
  }, {
    sequelize,
    tableName: 'sunum',
    timestamps: false,
    indexes: [
      {
        name: "kullaniciNumara",
        using: "BTREE",
        fields: [
          { name: "kullaniciNumara" },
        ]
      },
      {
        name: "stajTipiID",
        using: "BTREE",
        fields: [
          { name: "stajTipiID" },
        ]
      },
    ]
});



// async function sync() {
//     await sunum.sync({ alter: true });
//     console.log("staj1form tablosu eklendi");
//   }
//   sync();


module.exports=sunum;