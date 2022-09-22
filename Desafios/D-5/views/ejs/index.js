const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const Products = require("./model/Products");

const PORT = 8080;

const app = express();
const products = new Products();

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialsDir: path.resolve(__dirname, "./views/partials"),
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", { mostrarProductos: true, products: products.getAll() });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
