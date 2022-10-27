const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const duyuru=sequelize.define("duyuru",{
    duyuruID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duyuruBaslik: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    duyuruAciklama: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    duyuruTuru: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'duyuru',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "duyuruID" },
        ]
      },
      {
        name: "duyuruID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "duyuruID" },
        ]
      },
    ]
});

async function sync(){
  // await duyuru.sync({force: true});
  // const count=await duyuru.count();
}
sync();
module.exports=duyuru;
