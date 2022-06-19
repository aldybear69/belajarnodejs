/* eslint-disable no-unused-vars */
// contoh node module
const fs = require("fs");
const readline = require("readline");

// contoh ES module
// import { createInterface } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Membuat folder data utk menyimpan contact jika belum ada
const dirPath = "contacts/data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//Membuat file contacts.json data utk menyimpan contact jika belum ada
const dataPath = "contacts/data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// const tulisPertanyaan1 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('Name : ', (nama) => {
//             resolve(nama);
//         });
//     });
// }

// const tulisPertanyaan2 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('Umur : ', (umur) => {
//             resolve(umur);
//         });
//     });
// }

// const tulisPertanyaan3 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('noHp : ', (noHp) => {
//             resolve(noHp);
//         });
//     });
// }

// cara di atas bisa dipersingkat dengan absraksi dengan cara dibawah ini
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (jawaban) => {
      resolve(jawaban);
    });
  });
};

const simpanContact = (nama, umur, noHp) => {
  // const contact = { nama: nama, umur: umur, noHp: noHp };
  // bisa disederhanakan dengan ES6 karena nama key dan value sama;
  const contact = { nama, umur, noHp };
  // Membaca isi suatu file (synchronous)
  const isiFile = fs.readFileSync("contacts/data/contacts.json", "utf-8");
  // ubah menjadi json dulu
  const contacts = JSON.parse(isiFile);
  // karena json sifatnya mirip list, maka bisa dilakukan push data
  contacts.push(contact);
  // Menuliskan string ke dalam suatu file (synchronous)
  fs.writeFileSync("contacts/data/contacts.json", JSON.stringify(contacts));
  console.log(
    `Terimakasih "${nama}", umur kamu : "${umur}" tahun, no HP : ${noHp} .`
  );
  rl.close();
};

// jika fungsi diatas ingin dipanggil digunakan di kelas file lain
// jangan lupa export dulu dan require / import di kelas file yyg ingin memanggilnya,
// bisa pake commonjs atau es6 modelnya

// commonJS | digunakan jika ingin key nya dengan nama beda
// module.exports = {
//   tulisPertanyaan: tulisPertanyaan,
//   simpanContact: simpanContact,
// };

// ES6 | jika nama key dan value sama maka bisa di sederhanakan sekali tulis saja
module.exports = { tulisPertanyaan, simpanContact };

// codingan dibawah ini kurang bagus karena akan menjorok kedalam terus semakin banyak pertanyaan
// jadi hrs di ubang menggunakan async await, syartnya gunakan Promise js
// rl.question('Name : ', (nama) => {
//     rl.question('Umur : ', (umur) => {
//         rl.question('Umur : ', (noHp) => {
//             console.log(`Terimakasih "${nama}", no HP : ${noHp} dan umur kamu : "${umur}" tahun`);

//             const contact = { nama: nama, umur: umur };
//             // Membaca isi suatu file (synchronous)
//             const isiFile = fs.readFileSync('data/contacts.json', "utf-8");
//             const contacts = JSON.parse(isiFile);
//             contacts.push(contact);
//             // Menuliskan string ke dalam suatu file (synchronous)
//             fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

//             rl.close();
//         });
//     });
// });
