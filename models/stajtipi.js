const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const stajtipi=sequelize.define("stajtipi",{
  stajTipiID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      stajTipiAdi: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'stajtipi',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "stajTipiID" },
          ]
        },
    ]
});

module.exports = stajtipi;
