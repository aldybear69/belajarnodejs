// const contacts = require('./contacts');

// bisa jg pake metode object distructuring seperti ini :
const { tulisPertanyaan, simpanContact } = require('./contacts');

// jadi ga perlu invokasi2 lagi kyk contacts.tulisPertanyaan atau contacts.simpanContact
// atau bisa disederhanakan jg pake ES6 dengan metode import syaratnya run type : module atau .MJS
// import { tulisPertanyaan, simpanContact } from './contacts';


const main = async () => {
    const nama = await tulisPertanyaan("Masukkan nama kamu : ");
    const umur = await tulisPertanyaan("Masukkan umur kamu : ");
    const noHp = await tulisPertanyaan("Masukkan nomor hp kamu : ");

    console.log(`Terimakasih "${nama}", umur kamu : "${umur}" tahun, no HP : ${noHp} .`);

    simpanContact(nama, umur, noHp);
}

main();