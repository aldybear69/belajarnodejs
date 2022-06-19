// * comment aja kalo ga mau pakai args dari args.js ketika run app.js
// require("./args"); //artinya sama jg akan menjalankan seluruh script di ./args

// jika pake variable spt dibawah ini maka akan banyak invokasi
// const contacts = require('./contacts');
// jadi bisa jg pake metode object distructuring seperti ini :
const { tulisPertanyaan, simpanContact } = require("./contacts");

// jadi ga perlu invokasi2 lagi kyk contacts.tulisPertanyaan atau contacts.simpanContact
// atau bisa disederhanakan jg pake ES6 dengan metode import syaratnya run type : module atau .MJS
// import { tulisPertanyaan, simpanContact } from './contacts';

const main = async () => {
  const nama = await tulisPertanyaan("Nama kamu : ");
  const umur = await tulisPertanyaan("Umur kamu : ");
  const noHp = await tulisPertanyaan("Nomor hp kamu : ");

  simpanContact(nama, umur, noHp);
};

main();
