const knex = require("knex");

class Products {
  constructor(tableName, dbConfig) {
    (this.table = tableName), (this.knex = knex(dbConfig));
    this.knex.schema
    .hasTable(this.table)
    .then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable(this.table, (table) => {
          table.increments("id").notNullable().primary();
          table.string("title", 100).notNullable();
          table.string("thumbnail").notNullable();
          table.float("price").notNullable();
        });
      }
    })
    .catch((err) => console.log("error", err));
}
async getAll() {
  try {
    const products = await this.knex
      .from(this.table)
      .select("id", "title", "price");
    console.table(products);
    return products;
    } catch (error) {
      console.log(error);
    } finally {
  }
}
async getById(id) {
  try {
    const product = await this.knex
      .from(this.table)
      .select("id", "title", "price", "thumbnail")
      .where({ id: id });
    console.table(product);
  } catch (error) {
    console.log("error al obtener producto", error);
  } finally {
  }
}
async save(product) {
  const { title, price, thumbnail } = product;
  if (!title || !price || !thumbnail) {
    return null;
  }
  const newProduct = {
    title,
    price,
    thumbnail,
  };
  try {
    await this.knex(this.table).insert(newProduct);
  } catch (error) {
    console.log(error);
  } finally {
  }
  return {
    message: "Producto creado con exito",
    product: newProduct,
  };
}
async update(id, product) {
  const { title, price, thumbnail} = product;
  try {
    await this.knex.from(this.table)
    .where({ id: id })
    .update({
      title: title,
      price: price,
      thumbnail: thumbnail,
    });
  } catch (error) {
    console.log("error en la actualizacion", error);
  } finally {
  }
  return { message: "Producto acualizado" };
}
async deleteById(id) {
  try {
    await this.knex.from(this.table).where({ id }).del();
  } catch (error) {
    console.log(error);
  } finally {
  }
  return { message: "Producto borrado" };
}
}

module.exports = Products;
