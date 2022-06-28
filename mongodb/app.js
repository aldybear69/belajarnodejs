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

    // * cari dengan QUERY
    const query = { nama: "Desta" };
    const data = await mahasiswa.findOne(query);
    console.log(data);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("::: Disconnected successfully!");
  }
}
main().catch((error) => {
  console.log("DB ERROR : " + error);
});
