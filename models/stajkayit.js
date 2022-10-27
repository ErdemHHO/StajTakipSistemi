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
    stajBaslangicTarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    stajBitisTarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isGunuSayisi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    basvuruForm: {
      type: DataTypes.BLOB,
      allowNull: true
    }
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
module.exports = stajkayit;
