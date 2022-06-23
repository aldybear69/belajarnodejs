const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 3000;

// set app bahwa menggunakan template engine EJS
app.set("view engine", "ejs");
// karena project expressjs ini views folder tidak di root maka ganti lokasi views ejs nya
app.set("views", path.join(__dirname, "views"));
// menggunakan built in Middleware untuk akses file2 statis (image, video, gambar, dll)
app.use(express.static("express/public"));
// Third Party Middleware
app.use(morgan("dev"));

const contohDataMahasiswa = [
  {
    nama: "Danila",
    umur: "20",
    noHP: "081634",
  },
  {
    nama: "Agnes",
    umur: "30",
    noHP: "0813434",
  },
  {
    nama: "Enzy",
    umur: "20",
    noHP: "086114",
  },
];

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.sendFile("./pages/index.html", { root: __dirname }); // menggunakan file pada folder pages
  res.render("index", {
    nama: "B34R",
    title: "Home Page",
    contohDataMahasiswa,
  }); // parameter objek yg akan dikirimkan ke view ejs
});
app.get("/about", (req, res) => {
  // res.send("About Page!");
  // res.sendFile("./pages/about.html", { root: __dirname }); // menggunakan file pada folder pages
  res.render("about", { title: "About Page" });
});
app.get("/contact", (req, res) => {
  // res.send("Contact Page!");
  // res.sendFile("./pages/contact.html", { root: __dirname }); // menggunakan file pada folder pages
  res.render("contact", { title: "Contact Page" });
});

// contoh jika menggunakan parameter
app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br>Category ID : ${req.params.idCat}`
  );
  // test ke alamat ini http://localhost:3000/product/satu/category/5
});

// contoh jika menggunakan query
app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br>Category ID : ${req.query.category}`
  );
  // test ke alamat ini http://localhost:3000/product/satu?category=baju
});

// use digunakan diakhir karena sifatnya akan merespon
// alamat apa saja yg tidak ada menjadi respon yg di definisikan di app.use
// maka hati2 ketika menyimpan method use ini di baris awal sebelum route lainnya
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>ERR 404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
