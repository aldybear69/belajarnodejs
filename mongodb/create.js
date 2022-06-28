const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
// Database Name
const dbName = "bear";

let mahasiswa;
let db;

// * secara Async cara 1
async function main() {
  try {
    // * connect to the mongodb
    await client.connect();
    console.log("::: Connected successfully to server");

    db = client.db(dbName);
    mahasiswa = db.collection("mahasiswa");

    tambahSatuData("kontol", "kontol@gmail.com");

    // * atau find all data
    const data = mahasiswa.find(); // masih dalam bentuk Cursor

    // * kemudian tampilkan setiap datanya bisa dengan
    await data.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("::: Disconnected successfully!");
  }
}
main().catch((error) => {
  console.log("DB ERROR : " + error);
});

// * menambahkan satu data
const tambahSatuData = (nama, email) => {
  mahasiswa.insertOne(
    {
      nama: nama,
      email: email,
    },
    (error, result) => {
      if (error) {
        return console.log("Gagal menambahkan data.");
      }
      console.log(result);
    }
  );
};

// * menambahkan banyak data
// const tambahBanyakData = () => {
// mahasiswa.insertMany(
//   [
//     {
//       nama: "rino",
//       email: "rino@gmail.com",
//     },
//     {
//       nama: "kiky",
//       email: "kiky@gmail.com",
//     },
//     {
//       nama: "saputri",
//       email: "saputri@gmail.com",
//     },
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log("Gagal menambahkan data.");
//     }
//     console.log(result);
//   }
// );
// }
