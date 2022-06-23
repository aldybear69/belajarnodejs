/* eslint-disable no-unused-vars */
const express = require("express");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
// ketiga modul di bawah adalah untuk flash message
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
// path dir
const path = require("path");
const { title } = require("process");
const app = express();
const port = 3000;

// set app bahwa menggunakan template engine EJS
app.set("view engine", "ejs");
// karena project expressjs ini views folder tidak di root maka ganti lokasi views ejs nya
app.set("views", path.join(__dirname, "views"));
// menggunakan built in Middleware untuk akses file2 statis (image, video, gambar, dll)
app.use(express.static("contacts_expressjs/public"));
// built in Middleware untuk menangani data method post url encode
app.use(express.urlencoded({ extended: true }));

const contohDataMahasiswa = [
  { nama: "Danilla", noHP: "0813", email: "danilla@gmail.com" },
  { nama: "Enzy", noHP: "0877", email: "enzy@gmail.com" },
  { nama: "Hesti", noHP: "0815", email: "hesti@gmail.com" },
];

// konfigurasi flash msg
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: {
      maxAge: 6000,
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    },
  })
);
app.use(flash());

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.sendFile("./pages/index.html", { root: __dirname }); // menggunakan file pada folder pages
  res.render("index", {
    nama: "B34R",
    title: "Home Page",
    contohDataMahasiswa,
  }); // parameter objek yg akan dikirimkan ke view ejs
});

// halaman about
app.get("/about", (req, res) => {
  // res.send("About Page!");
  // res.sendFile("./pages/about.html", { root: __dirname }); // menggunakan file pada folder pages
  res.render("about", { title: "About Page" });
});

// halaman daftar contact
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "Contact Page",
    contacts,
    msg: req.flash("msg"), // kalo ada flash msg tangkap dari session
  });
});

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", { title: "Add Contact Page" });
});

// proses tambah data contact
// nama validator harus sama persis dengan 'name' di tag html nya body("noHP").isMobilePhone("id-ID")
// 'check' digunakan untuk custom error msg check('email').withMessage('pesan') atau check('email', 'pesannya')
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama kontak sudah digunakan.");
      }
      return true;
    }),
    check("email", "email tidak valid.").isEmail(),
    check("noHP", "nomor hp tidak valid.").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    // cek validator nya
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() }); // cek error dgn json
      res.render("add-contact", {
        title: "Add Contact Page",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // sebelum redirect kita kirimkan flash msg dulu
      req.flash("msg", "Data kontak berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  // jika contact tidak ada maka
  if (!contact) {
    res.status("404");
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    // sebelum redirect kita kirimkan flash msg dulu
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  }
});

// halaman form Edit data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", { title: "Form Ubah Data Contact Page", contact });
});

// proses ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama kontak sudah digunakan.");
      }
      return true;
    }),
    check("email", "email tidak valid.").isEmail(),
    check("noHP", "nomor hp tidak valid.").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    // cek validator nya
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() }); // cek error dgn json
      res.render("edit-contact", {
        title: "Form Ubah Data Contact Page",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // sebelum redirect kita kirimkan flash msg dulu
      req.flash("msg", "Data contact berhasil diubah!");
      res.redirect("/contact");
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", { title: "Detail Contact Page", contact });
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
