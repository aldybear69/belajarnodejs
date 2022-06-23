/* eslint-disable no-unused-vars */
// contoh node module
const fs = require("fs");

//Membuat folder data utk menyimpan contact jika belum ada
const dirPath = "contacts_expressjs/data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//Membuat file contacts.json data utk menyimpan contact jika belum ada
const dataPath = "contacts_expressjs/data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data contacts.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync(
    "contacts_expressjs/data/contacts.json",
    "utf-8"
  );
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menuliskan / menimpa file contacts.json dengan data baru
const saveContacts = (contacts) => {
  fs.writeFileSync(
    "contacts_expressjs/data/contacts.json",
    JSON.stringify(contacts)
  );
};

// menambah data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

// cek duplikasi nama kontak pendaftaran
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

// mengubah data contacts
const updateContacts = (contactBaru) => {
  const contacts = loadContact();
  // hilangkan kontak lama yang namanya oldNama
  const filteredContacts = contacts.filter(
    (contact) => contact.nama !== contactBaru.oldNama
  );
  // console.log(filteredContacts, contactBaru);
  // hapus elemen / properti dengan nama oldNama kemudian baru push ke daftar contacts
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
};
