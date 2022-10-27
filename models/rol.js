const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');
const rol=sequelize.define("rol",{
  rolID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rolAdi: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rolID" },
        ]
      },
    ]
});
module.exports=rol;
