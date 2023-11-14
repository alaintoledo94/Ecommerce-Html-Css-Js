class Product {
  constructor(nombre, valor, sku, categoria, img) {
    this.nombre = nombre;
    this.valor = valor;
    this.sku = sku;
    this.categoria = categoria;
    this.total = 0;
    this.img = img;
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

class Compra {
  constructor(nombre, valor, sku, categoria) {
    this.nombre = nombre;
    this.valor = valor;
    this.sku = sku;
    this.categoria = categoria;
  }
}

let prod1 = new Product("Mouse", 15000, 1475, "Perifericos", "./img/1.png");
let prod2 = new Product("Teclado", 18000, 1455, "Perifericos", "./img/2.png");
let prod3 = new Product("Microfono", 20000, 1845, "Perifericos", "./img/3.png");
let prod4 = new Product(
  "Playstation 1",
  100000,
  1825,
  "Videojuegos",
  "./img/4.png"
);
let arrayCompra = [prod1, prod2, prod3, prod4];

const tarjeta = document.getElementById("card-body");

const tarjetaContainer = document.createElement("div");
tarjetaContainer.classList.add("row", "m-1", "justify-content-center");

arrayCompra.forEach((producto) => {
  const productoDiv = document.createElement("div");
  productoDiv.classList.add(
    "card",
    "col-md-2",
    "m-3",
    "p-3",
    "justify-content-center"
  );

  const cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-body",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );

  const imgProd = document.createElement("img");
  imgProd.classList.add("card-img-top", "img-fluid");
  imgProd.src = producto.img;

  const tituloProducto = document.createElement("h5");
  tituloProducto.classList.add("card-title");
  tituloProducto.textContent = producto.nombre;

  const valorProducto = document.createElement("p");
  valorProducto.classList.add("card-text", "m-0", "p-0");
  valorProducto.textContent = `Valor CLP $ ${producto.valor}`;

  const categoriaProducto = document.createElement("p");
  categoriaProducto.classList.add("card-text");
  categoriaProducto.textContent = `Categoría: ${producto.categoria}`;

  const botonCarrito = document.createElement("button");
  botonCarrito.classList.add("btn", "btn-primary", "boton-agregar");
  botonCarrito.textContent = "Agregar al Carrito";

  cardBody.appendChild(imgProd);
  cardBody.appendChild(tituloProducto);
  cardBody.appendChild(valorProducto);
  cardBody.appendChild(categoriaProducto);
  cardBody.appendChild(botonCarrito);
  productoDiv.appendChild(cardBody);

  tarjetaContainer.appendChild(productoDiv);
});

tarjeta.appendChild(tarjetaContainer);

//Agregar Productos al array con boton
const botones = document.querySelectorAll(".boton-agregar");
let arrayCompra2 = [];
obtenerStorage();

botones.forEach((boton, indice) => {
  boton.addEventListener("click", () => {
    const fila2 = boton.closest(".card");
    const nombreProd = fila2.querySelector(".card-title").textContent;
    const valorProd = parseFloat(
      fila2
        .querySelector(".card-text.m-0.p-0")
        .textContent.replace("Valor CLP $ ", "")
    );

    const productoExistente = arrayCompra2.find(
      (producto) => producto.nombreProd === nombreProd
    );

    if (productoExistente) {
      productoExistente.cantidad++;
      productoExistente.valorTotal =
        productoExistente.valorProd * productoExistente.cantidad;
    } else {
      arrayCompra2.push({
        nombreProd,
        valorProd,
        cantidad: 1,
        valorTotal: valorProd,
      });
    }

    rellenarCarro();
    actualizarCarrito();
    SumaValores();
    guardarStorage();
  });
});

//======RELLENAR=CARRO==========================================================================

function rellenarCarro() {
  const listaCompra = document.querySelector(".buy-card");

  const filasProductos = document.querySelectorAll(".item-compra");
  filasProductos.forEach((fila) => {
    fila.remove();
  });

  arrayCompra2.forEach((producto) => {
    const itemCompra = document.createElement("ul");
    itemCompra.classList.add("item-compra");

    const nombreProducto = document.createElement("li");
    nombreProducto.textContent = `${producto.nombreProd}`;
    nombreProducto.classList.add("item-compra");

    const valorProducto = document.createElement("li");
    valorProducto.textContent = `$${producto.valorProd.toFixed(2)}`;
    valorProducto.classList.add("item-compra");

    const cantidadProducto = document.createElement("li");
    cantidadProducto.textContent = `${producto.cantidad}`;
    cantidadProducto.classList.add("item-compra");

    const botonEliminar = document.createElement("a");
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () =>
      eliminarProducto(arrayCompra2.indexOf(producto))
    );

    itemCompra.appendChild(nombreProducto);
    itemCompra.appendChild(valorProducto);
    itemCompra.appendChild(cantidadProducto);
    itemCompra.appendChild(botonEliminar);

    listaCompra.appendChild(itemCompra);
  });
  const botonPagarExistente = document.querySelector(".btn-pagar");

  if (!botonPagarExistente) {
    actualizarCarrito();

    const botonPagar = document.createElement("button");
    botonPagar.classList.add("btn", "btn-primary", "btn-pagar");
    botonPagar.textContent = "Pagar";
    botonPagar.addEventListener("click", botonComprar);

    listaCompra.appendChild(botonPagar);
  }
}

//-------GUARDAR-STORAGE-------------------------------------------------------
function guardarStorage() {
  var arrayCompra2JSON = JSON.stringify(arrayCompra2);
  localStorage.setItem("arrayCompra2", arrayCompra2JSON);
}
//-------OBTENER-STORAGE--------------------------------------------------------
function obtenerStorage() {
  var arrayCompra2JSON = localStorage.getItem("arrayCompra2");
  if (arrayCompra2JSON !== null) {
    var obtenerArraylist = JSON.parse(arrayCompra2JSON);
    arrayCompra2 = obtenerArraylist;
    rellenarCarro();
  }
}

//--------ELIMINAR-PRODUCTO--------------------------------------------------------
function eliminarProducto(indice) {
  console.log("Eliminando producto: " + JSON.stringify(arrayCompra2)); //
  if (indice >= 0 && indice < arrayCompra2.length) {
    const producto = arrayCompra2[indice];

    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      arrayCompra2.splice(indice, 1);
    }

    guardarStorage();
    rellenarCarro();
    SumaValores(arrayCompra2);
  } else {
    alert("No se puede eliminar");
  }
}

const tablaCarrito = document
  .getElementById("tabla_carrito")
  .querySelector("tbody");
tablaCarrito.addEventListener("click", (event) => {
  if (event.target.classList.contains("boton-eliminar")) {
    const filaEliminar = event.target.closest("tr");
    const indiceFila = Array.from(filaEliminar.parentNode.children).indexOf(
      filaEliminar
    );
    if (indiceFila !== -1) {
      eliminarProducto(indiceFila);
      console.log(arrayCompra2);
      filaEliminar.remove();
      rellenarCarro();
    }
  }
});
// SUMAR VALORES DEL ARRAY
function SumaValores() {
  const sum = arrayCompra2.reduce((acumulador, elemento) => {
    return acumulador + elemento.valorProd * elemento.cantidad;
  }, 0);

  const netoCarrito = document.getElementById("neto");
  const ivaCarrito = document.getElementById("iva");
  const totalCarrito = document.getElementById("total");

  const netoValue = isNaN(sum) ? 0 : sum;
  const ivaValue = isNaN(netoValue * 0.19) ? 0 : netoValue * 0.19;
  const totalValue = netoValue + ivaValue;

  netoCarrito.textContent = `Valor Neto $ ${netoValue.toFixed(2)}`;
  ivaCarrito.textContent = `Iva (19%) $ ${ivaValue.toFixed(2)}`;
  totalCarrito.textContent = `Total $ ${totalValue.toFixed(2)}`;

  return totalValue;
}
//-------------Boton--CompraR------------------------------
function botonComprar() {
  let obtenerArraylist = localStorage.getItem("arrayCompra2");
  let obtenerArraylist2 = JSON.parse(obtenerArraylist);

  if (arrayCompra2.length > 0 || obtenerArraylist2.length > 0) {
    alertaComprar(true);
  } else {
    alertaComprar(false);
  }
}

// Función para actualizar los valores en el carrito
function actualizarCarrito() {
  const sumaValores = calcularSuma(arrayCompra2);

  const netoCarrito = document.getElementById("neto");
  const ivaCarrito = document.getElementById("iva");
  const totalCarrito = document.getElementById("total");

  const netoValue = isNaN(sumaValores) ? 0 : sumaValores;
  const ivaValue = isNaN(netoValue * 0.19) ? 0 : netoValue * 0.19;
  const totalValue = netoValue + ivaValue;

  netoCarrito.textContent = `Valor Neto $ ${netoValue.toFixed(2)}`;
  ivaCarrito.textContent = `Iva (19%) $ ${ivaValue.toFixed(2)}`;
  totalCarrito.textContent = `Total $ ${totalValue.toFixed(2)}`;
}

function calcularSuma(array) {
  return array.reduce((acumulador, elemento) => {
    return acumulador + parseFloat(elemento.valorProd);
  }, 0);
}
// ----ALERTAS----
function alertaComprar(respuesta) {
  const cantidadTotal = arrayCompra2.reduce((acumulador, producto) => {
    return acumulador + producto.cantidad;
  }, 0);

  if (respuesta === true) {
    Swal.fire({
      title: `Puedes pasar a pagar`,
      text: `Tienes ${cantidadTotal} productos agregados al carrito`,
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    setTimeout(function () {
      window.location.href = "checkout.html";
    }, 3000);
  }

  if (respuesta === false) {
    Swal.fire({
      title: `No puedes pasar a pagar`,
      text: `Tienes ${cantidadTotal} productos agregados al carrito`,
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  }
}

function alertaComprar2() {
  Swal.fire({
    title: `Pedido pagado correctamente`,
    text: `Enviamos un email con todos los detalles`,
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
}

function mostrarBuyCard() {
  const buyCard = document.querySelector(".buy-card");
  buyCard.style.display = "block";
  const navCard = document.querySelector(".nav-card");
  navCard.style.display = "block";
}

function ocultarBuyCard() {
  const buyCard = document.querySelector(".buy-card");
  buyCard.style.display = "none";
}

const carritoIcono = document.querySelector(".carrito");
carritoIcono.addEventListener("mouseover", mostrarBuyCard);
carritoIcono.addEventListener("mouseout", ocultarBuyCard);

// ==========CHECKOUT==========================================
function boleta() {
  const arrayCompra2 = JSON.parse(localStorage.getItem("arrayCompra2")) || [];

  const nombre = document.getElementById("checkoutNombre").value;
  const apellido = document.getElementById("checkoutApellido").value;
  const rut = document.getElementById("checkoutRut").value;
  const telefono = document.getElementById("checkoutTelefono").value;
  const direccion = document.getElementById("checkoutDireccion").value;
  const btnPagar = document.getElementById("btnPagar");

  btnPagar.classList.add("disabled");

  const boletaDetalle = document.querySelector(".boletaDetalle");
  boletaDetalle.innerHTML = "";
  var contenedorBoleta = document.getElementById("cBoleta");
  contenedorBoleta.classList.remove("d-none");
  contenedorBoleta.classList.add("d-block");

  const tituloElemento = document.createElement("p");
  tituloElemento.classList.add("fw-bolder");
  tituloElemento.textContent = "Detalle de Compra";

  const nombreElemento = document.createElement("p");
  nombreElemento.textContent = `${nombre} ${apellido}, Hemos enviado un email con los detalles de tu pedido
  a la direccion de email ${rut}`;

  boletaDetalle.appendChild(tituloElemento);
  boletaDetalle.appendChild(nombreElemento);

  arrayCompra2.forEach((producto) => {
    const productoElemento = document.createElement("p");

    productoElemento.textContent = `${
      producto.nombreProd
    } $${producto.valorProd.toFixed(2)}, Cant. ${producto.cantidad}`;
    boletaDetalle.appendChild(productoElemento);
  });

  const netoElemento = document.createElement("p");
  netoElemento.textContent = `Valor Neto: $${SumaValores(arrayCompra2).toFixed(
    2
  )}`;
  boletaDetalle.appendChild(netoElemento);

  const ivaElemento = document.createElement("p");
  ivaElemento.textContent = `IVA (19%): $${(
    SumaValores(arrayCompra2) * 0.19
  ).toFixed(2)}`;
  boletaDetalle.appendChild(ivaElemento);

  const totalElemento = document.createElement("p");
  const totalCompra =
    SumaValores(arrayCompra2) + SumaValores(arrayCompra2) * 0.19;
  totalElemento.textContent = `Total: $${totalCompra.toFixed(2)}`;
  boletaDetalle.appendChild(totalElemento);

  const tituloElemento2 = document.createElement("p");
  tituloElemento2.classList.add("fw-bolder");
  tituloElemento2.textContent = "GRACIAS POR TU COMPRA !";
  boletaDetalle.appendChild(tituloElemento2);
}

function SumaValores(arrayCompra2) {
  const sum = arrayCompra2.reduce((acumulador, elemento) => {
    return acumulador + elemento.valorProd * elemento.cantidad;
  }, 0);

  return sum;
}
