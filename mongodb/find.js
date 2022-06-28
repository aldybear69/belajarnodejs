const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
// Database Name
const dbName = "bear";

// * secara Async cara 1
async function main() {
  try {
    // * connect to the mongodb
    await client.connect();
    console.log("::: Connected successfully to server");

    const db = client.db(dbName);
    const mahasiswa = db.collection("mahasiswa");

    // * atau find all data
    const data = mahasiswa.find(); // masih dalam bentuk Cursor

    // * kemudian tampilkan setiap datanya bisa dengan
    // * toArray, forEach, for in (asynchronous iteration) atau manual iteration (dengan Next())
    // ! contoh forEach atau data.forEach(doc => console.log(doc));
    await data.forEach(console.log);
    // ! contoh untuk for in async iteration
    // for await (const doc of data) {
    //   console.log(doc);
    // }
    // ! contoh dengan manual iteration
    // while (await data.hasNext()) {
    //   console.log(await data.next());
    // }
    // ! contoh dengan toArray
    // const allValues = await data.toArray();
    // console.log(allValues);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("::: Disconnected successfully!");
  }
}
main().catch((error) => {
  console.log("DB ERROR : " + error);
});

// * secara Async cara 2
// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("::: Connected successfully to server");
//   const db = client.db(dbName);
//   const mahasiswa = db.collection("mahasiswa");

//   // the following code examples can be pasted here...
//   // * cari dengan query
//   const query = { nama: "Hesti" };
//   const siswa = await mahasiswa.findOne(query);
//   console.log(siswa);
//   return "DONE!"; // nilai return ini akan di tangkap pada then()
// }

// main()
//   .then(console.log) // menangkap return dari main() function
//   .catch(console.error)
//   .finally(() => {
//     client.close();
//     console.log("::: Disconnected successfully!");
//   });

// * Cara Syncronous
// client.connect((error, client) => {
//   if (error) {
//     return console.log("::: Failed to connect to db server");
//   }

//   const db = client.db(dbName);
//   const mahasiswa = db.collection("mahasiswa");

//   // * tampilkan semua data mahasiswa
//   const data = mahasiswa.find(); // masih dalam bentuk cursor
//   // dari kursor ubah dulu
//   data.forEach((doc) => console.log(doc)); // atau data.forEach(console.log);
