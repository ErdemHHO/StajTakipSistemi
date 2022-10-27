const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajdurum=sequelize.define("stajdurum",{
  durumID: {
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
      durum: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      stajKayitID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'stajkayit',
          key: 'stajKayitID'
        }
      }
    }, {
      sequelize,
      tableName: 'stajdurum',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "durumID" },
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
        {
          name: "stajKayitID",
          using: "BTREE",
          fields: [
            { name: "stajKayitID" },
          ]
        },
      ]
  });

module.exports = stajdurum;
