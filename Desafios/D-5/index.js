const path = require("path");
const rutasApi = require("");
const express = require("express");
const { Products } = require("./models");
const { urlencoded } = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const products = new Products();

app.set("views", "./views");
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public")));

// Rutas
app.use("/api", rutasApi);

app.get("/productos", (req, res) => {
  res.render("index", { personas: products.listarTodos() });
});

app.post("/personas", (req, res) => {
  products.save(req.body);
  res.redirect("/personas");
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(error.message);
});
