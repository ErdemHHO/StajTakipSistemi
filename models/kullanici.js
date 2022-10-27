const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const kullanici=sequelize.define("kullanici",{
  kullaniciNumara: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  kullaniciAd: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  kullaniciSoyad: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  kullaniciParola: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  kullaniciMail: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  kullaniciTelNo: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: "kullaniciTelNo_UNIQUE"
  },
  kullaniciFakulte: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  kullaniciBolum: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  kullaniciSinif: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  rolID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rol',
      key: 'rolID'
    }
  }
}, {
  sequelize,
  tableName: 'kullanici',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "kullaniciNumara" },
      ]
    },
    {
      name: "kullaniciTelNo_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "kullaniciTelNo" },
      ]
    },
    {
      name: "rolID",
      using: "BTREE",
      fields: [
        { name: "rolID" },
      ]
    },
  ]
});
async function sync(){
  // await duyuru.sync({force: true});
  // const count=await duyuru.count();
}
sync();
module.exports=kullanici;