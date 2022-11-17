const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajkayit=sequelize.define("stajkayit",{
  stajKayitID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
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
    tc: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    kullaniciAd: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    kullaniciSoyad: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    kullaniciTelNo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    isgunu: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    kullaniciMail: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    iban: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    uyruk: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ogrenciadres: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    ogrenciil: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    ogrenciilce: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    ogrencipostakodu: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    firmaadi: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    faaliyetalani: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    firmaadres: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    firmail: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    firmailce: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    firmapostakodu: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    firmatelno: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    firmafax: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    firmaeposta: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    unvan: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    devletkatki: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    baslangictarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bitistarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    aile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    genelsaglik: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    yas25: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    cumartesi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'stajkayit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stajKayitID" },
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
        name: "kullaniciNumara",
        using: "BTREE",
        fields: [
          { name: "kullaniciNumara" },
        ]
      },
    ]
});
// (async () => {
//   await sequelize.sync({ alter: true });
// })();
module.exports = stajkayit;
