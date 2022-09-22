const { Products } = require("../model/Products");

const products = new Products();

const getAllController = (req, res) => {
  const { price, busqueda } = req.query;
  let respuestaProductos = products.getAll();
  if (Object.keys(req.query).length) {
    if (price) {
      if (isNaN(+price)) {
        return res.status(400).send("precio Maximo must be a valid number");
      }
      respuestaProductos = respuestaProductos.filter(
        (product) => product.price <= +price
      );
    }
    if (busqueda) {
      respuestaProductos = respuestaProductos.filter(
        (product) =>
          product.nombre.toLowerCase().startsWith(busqueda.toLowerCase()) ||
          product.apellido.toLowerCase().startsWith(busqueda.toLowerCase())
      );
    }
  }
  return res.json(respuestaProductos);
};

const getByIdController = (req, res) => {
  const { productId } = req.params;
  const product = products.getById(productId);
  if (product.error) return res.status(404).send(product.error);
  return res.json(product);
};

const saveController = (req, res) => {
  const newProduct = products.save(req.body);
  if (newProduct.error) return res.status(400).send(newProduct.error);
  return res.json(newProduct);
};

const updateByIdController = (req, res) => {
  const {
    params: { productId },
  } = req;
  const productUpdated = products.updateById(req.body, productId);
  if (productUpdated.error) return res.status(404).send(productUpdated.error);
  return res.json(productUpdated);
};

const deleteByIdController = (req, res) => {
  const { productId } = req.params;
  const productDeleted = products.deleteById(productId);
  if (productDeleted.error) return res.status(404).send(productDeleted.error);
  return res.json(productDeleted);
};

module.exports = {
  getAllController,
  getByIdController,
  saveController,
  updateByIdController,
  deleteByIdController,
};
