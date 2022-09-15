const express = require("express");
const { products } = require("../../data/data");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(products);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === +id);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: `Producto con id: ${id} no existe`,
    });
  }
  return res.json({ success: true, result: product });
});
router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (!title || !price || !thumbnail) {
    return res
      .status(400)
      .json({ succes: false, error: "Formato de cuerpo incorrecto" });
  }
  const newProduct = {
    id: products.length + 1,
    title,
    price: +price,
    image,
  };
  products.push(newProduct);
  return res.json(newProduct);
});

router.put("/:id", (req, res) => {
  const {
    params: { id },
    body: { title, price, thumbnail },
  } = req;
  if (!title || !price || !thumbnail) {
    return res
      .status(400)
      .json({ success: false, error: "Formato de cuerpo incorrecto" });
  }
  const productIndex = products.findIndex((product) => product.id === +id);
  if (productIndex < 0)
    return res.status(404).json({
      success: false,
      error: `Producto con id: ${id} no existe`,
    });
  const newProduct = {
    ...products[productIndex],
    id: [productIndex],
    title,
    price: +price,
    thumbnail,
  };
  products[productIndex] = newProduct;
  return res.json({ success: true, result: newProduct });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === +id);
  if (productIndex < 0)
    return res.status(404).json({
      success: false,
      error: `Producto con id: ${id} no existe`,
    });
  products.splice(productIndex, 1);
  return res.json({ success: true, result: "producto eliminado" });
});

module.exports = router;
