const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

// Import file db.js
require("./utils/db.js");
const Contact = require("./model/contact.js");

const app = express();
const port = 3000;

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Halaman Home
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Selvi Desti Riyani",
      email: "selvi@gmail.com",
    },
    {
      nama: "Tegar Febrian",
      email: "tegar@gmail.com",
    },
    {
      nama: "Winda",
      email: "winda@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Selvi Desti Riyani",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
  console.log("Ini Halaman home");
});

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

// Halaman Detail Contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
