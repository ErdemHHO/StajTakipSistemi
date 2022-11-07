const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajbelgeler=sequelize.define("stajbelgeler",{
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
    degerlendirmeFormu: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stajRaporu: {
      type: DataTypes.STRING,
      allowNull: true
    },
    basvuruForm: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'stajbelgeler',
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
//  (async () => {
//   await sequelize.sync({ alter: true });
// })();
module.exports=stajbelgeler;
