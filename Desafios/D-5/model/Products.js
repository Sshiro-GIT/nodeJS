const products = [
  {
    id: 1,
    title: "Marroc",
    price: 1000,
    thumbnail:
      "https://res.cloudinary.com/ayelenleclerc/image/upload/v1657515919/Suarez/Productos/felfort/felfort_marroc_ss5pqn.jpg",
  },
  {
    id: 2,
    title: "Kooky bon",
    price: 1250,
    thumbnail:
      "https://res.cloudinary.com/ayelenleclerc/image/upload/v1657515918/Suarez/Productos/felfort/felfort_kooky_bon_xgra7l.jpg",
  },
  {
    id: 3,
    title: "Cericet",
    price: 1850,
    thumbnail:
      "https://res.cloudinary.com/ayelenleclerc/image/upload/v1657515918/Suarez/Productos/felfort/felfort_cericet_khddgt.jpg",
  },
  {
    title: "Dos corazones -Agregado",
    price: "1450",
    thumbnail:
      "https://res.cloudinary.com/ayelenleclerc/image/upload/v1657515918/Suarez/Productos/felfort/felfort_dos_corazones_tlp3ne.jpg",
    id: 4,
  },
];

class Products {
  static lastProductId = products[products.length - 1].id;
  constructor() {
    this.list = products;
  }

  getAll() {
    return this.list;
  }
  getById(productId) {
    return this.list.find((product) => product.id === +productId);
  }

  save(product) {
    const { title, price, thumbnail } = product;
    if (!title || !price || !thumbnail) {
      return { error: "nombre,precio  e imagen son campos obligatorios" };
    }
    Products.lastProductId++;
    const newProduct = {
      id: Products.lastProductId,
      title,
      price,
      thumbnail,
    };
    products.push(newProduct);
    return newProduct;
  }
  updateById(productId, product) {
    const productIndex = this.list.findIndex(
      (product) => product.id === +productId
    );
    if (productIndex < 0) return null;

    const { title, price, thumbnail } = product;
    const updatedProduct = {
      id: this.list[productIndex].id,
      title,
      price,
      thumbnail,
    };
    this.list[productIndex] = updatedProduct;
    return updatedProduct;
  }

  deleteById(productId) {
    const productIndex = this.list.indexOf(
      (producto) => producto.id === +productId
    );
    if (productIndex < 0) return null;
    return this.list.splice(productIndex, 1);
  }
}

module.exports = Products;
