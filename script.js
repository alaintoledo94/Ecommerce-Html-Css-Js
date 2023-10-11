class Product {
  constructor(nombre, valor, sku, categoria) {
    this.nombre = nombre;
    this.valor = valor;
    this.sku = sku;
    this.categoria = categoria;
    this.total = 0;
  }

  MostrarNombre(nombre, posicion) {
    this.nombre = nombre;
    console.log(`Producto ${posicion} Nombre : ${this.nombre}`);
  }
  MostrarValor(valor, posicion) {
    this.valor = valor;
    console.log(`Producto ${posicion} Valor : ${this.valor}`);
  }
  CalcularIva(valor) {
    this.valor = valor;
    console.log(`Iva (19%) $ ${this.valor * 0.19}`);
  }
  CalcularTotal(valor) {
    this.valor = valor;
    let sumaValor = this.valor + this.valor * 0.19;
    console.log("Total Producto:" + sumaValor);
    this.valor = sumaValor;
  }
  CalculatTotalCompra(valor) {
    this.total += valor;
    console.log(`Total Compra $ ${this.total + this.total * 0.19}`);
  }

  MostrarValorTotal() {
    console.log(`El valor total es $ ${this.total + this.total * 0.19}`);
  }
}

let prod1 = new Product("Mouse", 15000, 1475, "Perifericos");
let prod2 = new Product("Teclado", 18000, 1455, "Perifericos");
let prod3 = new Product("Microfono", 20000, 1845, "Perifericos");
let prod4 = new Product("Playstation 1", 100000, 1825, "Videojuegos");
let arrayCompra = [prod1, prod2, prod3, prod4];

function mostrarCarro() {
  let suma = 0;
  let iva = 0;
  let total = 0;
  console.log("==PRODUCTOS AGREGADOS AL CARRITO==");
  for (const prodF of arrayCompra) {
    console.log(
      "ID " + arrayCompra.indexOf(prodF) + " | " + prodF.nombre,
      "$ " + prodF.valor
    );
  }

  suma = parseInt(
    arrayCompra.reduce((acumulador, e) => acumulador + e.valor, 0)
  );

  iva = suma * 0.19;
  total = suma + iva;

  console.log("Iva (19%) $ " + iva);
  console.log("Total Compra $ " + total);
  console.log(" ");

  console.log("== Selecciona una opcion ===");
  console.log("1- Agregar Producto");
  console.log("2- Eliminar Producto");
  console.log("3- Terminar Compra");
  resp = parseInt(prompt("Ingresa respuesta"));
  if (resp == 1) {
    console.log("Agregando producto ...");
    Comprobar();
  } else if (resp == 2) {
    Eliminar();
  } else if (resp == 3) {
    console.log("Gracias por su compra");
  } else {
    console.log("Ingresa una opcion valida");
  }
}

mostrarCarro();

function Comprobar() {
  let nombre = prompt("Nombre del producto:");
  let valor = parseInt(prompt("Valor del producto:"));
  let sku = prompt("Sku del producto:");
  let categoria = prompt("Categoria");
  console.log("Producto agregado correctamente.");
  console.log(" ");
  arrayCompra.push(new Product(nombre, valor, sku, categoria));
  mostrarCarro();
}

function Eliminar() {
  console.log("Eliminando producto ...");
  let indiceEliminar = parseInt(
    prompt("Ingresa la id del producto a eliminar: ")
  );
  if (indiceEliminar >= 0 && indiceEliminar < arrayCompra.length) {
    arrayCompra.splice(indiceEliminar, 1);
    console.log("Producto eliminado correctamente.");
    console.log(" ");
    mostrarCarro();
  }
}
