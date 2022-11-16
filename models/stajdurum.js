const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajdurum=sequelize.define("stajdurum",{
      durumID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      durum: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
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
        }
      ]
  });



// async function sync() {
//   await stajdegerlendirme.sync({ alter: true });
//   console.log("staj1form tablosu eklendi");
// }
// sync();

module.exports = stajdurum;
