var DataTypes = require("sequelize").DataTypes;
var _duyuru = require("./duyuru");
var _kullanici = require("./kullanici");
var _rol = require("./rol");
var _sorumluluk = require("./sorumluluk");
var _stajbelgeler = require("./stajbelgeler");
var _stajdegerlendirme = require("./stajdegerlendirme");
var _stajdurum = require("./stajdurum");
var _stajkayit = require("./stajkayit");
var _stajtipi = require("./stajtipi");

function initModels(sequelize) {
  var duyuru = _duyuru(sequelize, DataTypes);
  var kullanici = _kullanici(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var sorumluluk = _sorumluluk(sequelize, DataTypes);
  var stajbelgeler = _stajbelgeler(sequelize, DataTypes);
  var stajdegerlendirme = _stajdegerlendirme(sequelize, DataTypes);
  var stajdurum = _stajdurum(sequelize, DataTypes);
  var stajkayit = _stajkayit(sequelize, DataTypes);
  var stajtipi = _stajtipi(sequelize, DataTypes);

  sorumluluk.belongsTo(kullanici, { as: "kullaniciNumara_kullanici", foreignKey: "kullaniciNumara"});
  kullanici.hasMany(sorumluluk, { as: "sorumluluks", foreignKey: "kullaniciNumara"});
  stajbelgeler.belongsTo(kullanici, { as: "kullaniciNumara_kullanici", foreignKey: "kullaniciNumara"});
  kullanici.hasMany(stajbelgeler, { as: "stajbelgelers", foreignKey: "kullaniciNumara"});
  stajdegerlendirme.belongsTo(kullanici, { as: "kullaniciNumara_kullanici", foreignKey: "kullaniciNumara"});
  kullanici.hasMany(stajdegerlendirme, { as: "stajdegerlendirmes", foreignKey: "kullaniciNumara"});
  stajdurum.belongsTo(kullanici, { as: "kullaniciNumara_kullanici", foreignKey: "kullaniciNumara"});
  kullanici.hasMany(stajdurum, { as: "stajdurums", foreignKey: "kullaniciNumara"});
  stajkayit.belongsTo(kullanici, { as: "kullaniciNumara_kullanici", foreignKey: "kullaniciNumara"});
  kullanici.hasMany(stajkayit, { as: "stajkayits", foreignKey: "kullaniciNumara"});
  kullanici.belongsTo(rol, { as: "rol", foreignKey: "rolID"});
  rol.hasMany(kullanici, { as: "kullanicis", foreignKey: "rolID"});
  stajdegerlendirme.belongsTo(stajkayit, { as: "stajKayit", foreignKey: "stajKayitID"});
  stajkayit.hasMany(stajdegerlendirme, { as: "stajdegerlendirmes", foreignKey: "stajKayitID"});
  stajdurum.belongsTo(stajkayit, { as: "stajKayit", foreignKey: "stajKayitID"});
  stajkayit.hasMany(stajdurum, { as: "stajdurums", foreignKey: "stajKayitID"});
  sorumluluk.belongsTo(stajtipi, { as: "stajTipi", foreignKey: "stajTipiID"});
  stajtipi.hasMany(sorumluluk, { as: "sorumluluks", foreignKey: "stajTipiID"});
  stajbelgeler.belongsTo(stajtipi, { as: "stajTipi", foreignKey: "stajTipiID"});
  stajtipi.hasMany(stajbelgeler, { as: "stajbelgelers", foreignKey: "stajTipiID"});
  stajdegerlendirme.belongsTo(stajtipi, { as: "stajTipi", foreignKey: "stajTipiID"});
  stajtipi.hasMany(stajdegerlendirme, { as: "stajdegerlendirmes", foreignKey: "stajTipiID"});
  stajdurum.belongsTo(stajtipi, { as: "stajTipi", foreignKey: "stajTipiID"});
  stajtipi.hasMany(stajdurum, { as: "stajdurums", foreignKey: "stajTipiID"});
  stajkayit.belongsTo(stajtipi, { as: "stajTipi", foreignKey: "stajTipiID"});
  stajtipi.hasMany(stajkayit, { as: "stajkayits", foreignKey: "stajTipiID"});

  return {
    duyuru,
    kullanici,
    rol,
    sorumluluk,
    stajbelgeler,
    stajdegerlendirme,
    stajdurum,
    stajkayit,
    stajtipi,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
