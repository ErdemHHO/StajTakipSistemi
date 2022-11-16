const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajdegerlendirme=sequelize.define("stajdegerlendirme",{
  degerlendirmeID: {
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
    durumID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stajdurum',
        key: 'durumID'
      }
    },
    onaylananGun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eksikGun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
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
        name: "durumID",
        using: "BTREE",
        fields: [
          { name: "durumID" },
        ]
      },
    ]
});



module.exports=stajdegerlendirme;