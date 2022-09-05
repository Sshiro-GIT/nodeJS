const express = require("express");
const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.name = name;
  }

  async save(informacion) {
    try {
      let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      let ultimoIndice = contenidoParseado.length - 1;
      let ultimoId = contenidoParseado[ultimoIndice].id;
      informacion.id = ultimoId + 1;
      let id = informacion.id;
      contenidoParseado.push(informacion);
      await fs.promises.writeFile(
        `./${this.name}`,
        JSON.stringify(contenidoParseado)
      );
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      let contenidoArray;
      contenidoParseado.forEach((element) => {
        if (element.id === id) {
          contenidoArray = element;
        }
      });
      return contenidoArray;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      return contenidoParseado;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      let nuevoContenido = contenidoParseado.filter(
        (element) => element.id !== id
      );
      await fs.promises.writeFile(
        `./${this.name}`,
        JSON.stringify(nuevoContenido)
      );
      return nuevoContenido;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      await fs.promises.writeFile(`./${this.name}`, JSON.stringify([{}]));
      return console.log("contenido eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

let contenedor = new Contenedor("productos.json");

let informacionNueva = {
  id: "1",
  name: "medias negras",
  price: 300
};

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Inicio");
});
app.get("/login", (req, res) => {
  res.send("Página de Registro");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll().then((res) => res);
  res.send(productos);
});
app.get("/productorandom", async (req, res) => {
  const productos = await contenedor.getAll();
  const random = Math.floor(Math.random() * productos.length);
  res.send(productos[random]);
});

// PAGE NOT FOUND
app.get("/*", (req, res) => {
  const statusApp = 404;
  res.send(
    `<h1 style="color: red">Página no encontrada Status: ${statusApp}</h1>`
  );
});

const server = app.listen(PORT, () => {
  console.log(`Server is up and running in PORT: ${PORT}`);
});
server.on("error", (error) => {
  console.log(error);
});