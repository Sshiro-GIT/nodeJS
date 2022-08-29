class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = "nahuel";
    this.apellido = "otero";
    this.libros = [];
    this.mascotas = [];
  };
  getFullName() {
    return `este es el nombre ${this.nombre} ${this.apellido}`;
  };
  addMascota(mascota) {
    this.mascotas.push(mascota);
  };
  countMascotas() {
    return `tengo ${this.mascotas.length} mascotas`;
  };
  addBook(nombre) {
    this.libros.push({ nombre});
  };
  getBooks() {
    return this.libros.map((libro) => `${libro.nombre} `);
  };
};

const user = new Usuario("nahuel", "otero", [], []);

console.log(user.getFullName());
user.addMascota("perro");
user.addMascota("gato");
console.log(user.mascotas);
console.log(user.countMascotas());
user.addBook("nombre de libro1");
console.log(user.getBooks());