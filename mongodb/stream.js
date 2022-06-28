const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url =
//   "mongodb://localhost:27018,localhost:27019,localhost:27020/?replicaSet=MyReplicaSet";
const url = "mongodb://localhost:27018/?replicaSet=rs0";
const client = new MongoClient(url);
// Database Name
const dbName = "bear";

let changeStream;

// * secara Async cara 1
async function main() {
  try {
    // * connect to the mongodb
    await client.connect();
    console.log("::: Connected successfully to server");

    const db = client.db(dbName);
    const mahasiswa = db.collection("mahasiswa");

    // ! stream hanya bs di replica set mongodb
    changeStream = mahasiswa.watch();
    // set up a listener when change events are emitted
    changeStream.on("change", (data) => {
      // process any change event
      console.log("received a change to the collection: \t", data);

      // switch (data.operationType) {
      //   case "insert":
      //     console.log("Ada INSERT data!");
      //     break;
      //   case "delete":
      //     console.log("Ada DELETE data!");
      //     break;
      //   case "update":
      //     console.log("Ada UPDATE data!");
      //     break;
      //   case "rename":
      //     console.log("Ada RENAME data!");
      //     break;
      //   case "drop":
      //     console.log("Ada DROP data!");
      //     break;
      //   case "replace":
      //     console.log("Ada REPLACE data!");
      //     break;
      //   case "dropDatabase":
      //     console.log("Ada DROP-DATABASE data!");
      //     break;
      //   case "invalidate":
      //     console.log("Ada INVALIDATE data!");
      //     break;
      //   default:
      //     console.log("NO OPTION FOUND");
      //     break;
      // }
    });

    await mahasiswa.insertOne({
      nama: "Angie",
      email: "angie@gmail.com",
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await changeStream.close();
    // console.log("closed the change stream");
    // await client.close();
    // console.log("::: Disconnected successfully!");
  }
}
main().catch((error) => {
  console.log("DB ERROR : " + error);
});
