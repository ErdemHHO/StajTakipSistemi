const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajdegerlendirme=sequelize.define("stajdegerlendirme",{
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
    stajKayitID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stajkayit',
        key: 'stajKayitID'
      }
    },
    degerlendirmeID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    degerlendirme: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    onaylananGun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eksikGun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stajDonemi: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stajdegerlendirme',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "degerlendirmeID" },
        ]
      },
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
      {
        name: "stajKayitID",
        using: "BTREE",
        fields: [
          { name: "stajKayitID" },
        ]
      },
    ]
});


// async function sync() {
//   await stajdegerlendirme.sync({ force: true });
//   console.log("staj1form tablosu eklendi");
// }
// sync();
module.exports=stajdegerlendirme;