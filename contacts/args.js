// * cara mengambil args dari command line
// * console.log(process.argv);
// karena dlm index 0 dan 1 adalah alamat node dan alamat file ini maka di mulai dari index 2 dst
// const args = process.argv[2];
// if (args == 'add') {
// } else if (args == 'list') {
// } else {
// }
// * ada npm package yg memudahkan untuk mengelola argumen yaitu : Yargs
// * npm i yargs (docs => https://yargs.js.org/)
// const { command, describe, demandOption } = require("yargs");

const yargs = require("yargs");
const { simpanContact } = require("./contacts");
// console.log(yargs.argv);
// * lalu coba run ` node contacts_app/args.js --nama="Danilla" `

// lihat docs yarg utk lebih lengkapnya
// contoh di bawah ini adalah dengan parameter satuan
// yargs.command(
//   "add",
//   "menambahkan kontak baru",
//   () => {},
//   (argv) => {
//     console.log(argv.nama);
//   }
// );

// contoh di bawah ini adalah dengan parameter banyak
yargs
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        // option nya lihat di docs
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      umur: {
        // option nya lihat di docs
        describe: "Usia saat ini",
        demandOption: true,
        type: "number",
      },
      noHP: {
        // option nya lihat di docs
        describe: "Nomor HP",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      const contact = {
        nama: argv.nama,
        umur: argv.umur,
        noHP: argv.noHP,
      };
      console.log(contact);

      simpanContact(argv.nama, argv.umur, argv.noHp);
    },
  })
  .demandCommand();
// .demandCommand() agar ketika cmd di jalankan tanpa parameter maka muncul peringatan harus pake parameter

yargs.parse();
// * jalankan dulu pake perintah ini :
// * node contacts/args.js add --nama="Kojima"
// * node contacts/args.js add --nama="Kojima" --umur=20 --noHP=0815771
