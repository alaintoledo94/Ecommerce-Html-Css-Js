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

class Compra {
  constructor(nombre,valor,sku,categoria){
    this.nombre = nombre;
    this.valor = valor;
    this.sku = sku;
    this.categoria = categoria;
  }
}





let prod1 = new Product("Mouse", 15000, 1475, "Perifericos");
let prod2 = new Product("Teclado", 18000, 1455, "Perifericos");
let prod3 = new Product("Microfono", 20000, 1845, "Perifericos");
let prod4 = new Product("Playstation 1", 100000, 1825, "Videojuegos");
let arrayCompra = [prod1, prod2, prod3, prod4];


//RELLENAR PRODUCTOS DISPONIBLES AL DOM
const tabla = document.getElementById("tabla_productos")
const tbody = tabla.querySelector("tbody")

arrayCompra.forEach((array)=>{
  const fila = document.createElement("tr");

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = array.nombre;

  const celdaValor = document.createElement("td");
  celdaValor.textContent = array.valor;

  const botonCarrito = document.createElement("button");
  botonCarrito.classList.add("boton-agregar");
  botonCarrito.textContent = "Agregar al Carrito"
  botonCarrito.setAttribute("name","Eliminar")

  tbody.appendChild(fila);
  fila.appendChild(celdaNombre);
  fila.appendChild(celdaValor);
  fila.appendChild(botonCarrito);
  
});
//=========================================================================



//Agregar Productos al array con boton
const botones = document.querySelectorAll(".boton-agregar");
let arrayCompra2 = [];
obtenerStorage();

botones.forEach((boton,indice)=>{
    boton.addEventListener("click", ()=>{
      const fila2 = boton.closest("tr");
      const celdas = fila2.getElementsByTagName("td");
      const nombreProd = celdas[0].textContent;
      const valorProd = celdas[1].textContent;

      arrayCompra2.push({nombreProd,valorProd})

    
      rellenarCarro();
     
    } )
});



//======RELLENAR=CARRO==========================================================================

function rellenarCarro(){
  const tabla2 = document.getElementById("tabla_carrito")
  const tbody2 = tabla2.querySelector("tbody")

  tbody2.innerHTML = '';

  arrayCompra2.forEach((array2)=>{

    const fila2= document.createElement("tr");
    const celdaNombre2 = document.createElement("td");
    celdaNombre2.textContent = array2.nombreProd;
    const celdaValor2 = document.createElement("td");
    celdaValor2.textContent = array2.valorProd;
    const botonCarrito2 = document.createElement("button");
    botonCarrito2.classList.add("boton-eliminar");
    botonCarrito2.textContent = "Eliminar Producto"
    botonCarrito2.setAttribute("name","Eliminar")

    tbody2.appendChild(fila2);
    fila2.appendChild(celdaNombre2);
    fila2.appendChild(celdaValor2);
    fila2.appendChild(botonCarrito2)
    
    SumaValores(arrayCompra2);
    guardarStorage();

  })

}

//-------GUARDAR-STORAGE-------------------------------------------------------
function guardarStorage(){

var arrayCompra2JSON = JSON.stringify(arrayCompra2)
localStorage.setItem('arrayCompra2', arrayCompra2JSON);
}
//-------OBTENER-STORAGE--------------------------------------------------------
function obtenerStorage(){
var arrayCompra2JSON = localStorage.getItem('arrayCompra2');
if (arrayCompra2JSON !== null) {
  var obtenerArraylist = JSON.parse(arrayCompra2JSON);
  console.log(obtenerArraylist);

  arrayCompra2 = obtenerArraylist;

  const tabla2 = document.getElementById("tabla_carrito")
  const tbody2 = tabla2.querySelector("tbody")

  tbody2.innerHTML = '';

  obtenerArraylist.forEach((array2)=>{

    const fila2= document.createElement("tr");
    const celdaNombre2 = document.createElement("td");
    celdaNombre2.textContent = array2.nombreProd;
    const celdaValor2 = document.createElement("td");
    celdaValor2.textContent = array2.valorProd;
    const botonCarrito2 = document.createElement("button");
    botonCarrito2.classList.add("boton-eliminar");
    botonCarrito2.textContent = "Eliminar Producto"
    botonCarrito2.setAttribute("name","Eliminar")

    tbody2.appendChild(fila2);
    fila2.appendChild(celdaNombre2);
    fila2.appendChild(celdaValor2);
    fila2.appendChild(botonCarrito2)
    
    SumaValores(obtenerArraylist);
  

  })



}else{
  
}
}
//--------ELIMINAR-PRODUCTO--------------------------------------------------------
function eliminarProducto(indice) {
  console.log("Eliminando producto: " + JSON.stringify(arrayCompra2)); // 
  if (indice >= 0 && indice < arrayCompra2.length) {
    arrayCompra2.splice(indice, 1);
    guardarStorage();
    rellenarCarro();
    SumaValores(arrayCompra2);
  } else {
    alert("No se puede eliminar");
  }
}


const tablaCarrito = document.getElementById("tabla_carrito").querySelector("tbody");
tablaCarrito.addEventListener("click", (event) => {
  if (event.target.classList.contains("boton-eliminar")) {
  
    const filaEliminar = event.target.closest("tr");
    const indiceFila = Array.from(filaEliminar.parentNode.children).indexOf(filaEliminar);
    if (indiceFila !== -1) {
      eliminarProducto(indiceFila);
      console.log(arrayCompra2);
      filaEliminar.remove();
      rellenarCarro();
    }
  }
});
// SUMAR VALORES DEL ARRAY
function SumaValores(array){
  const sum = array.reduce(function(acumulador, elemento) {
     return acumulador + parseInt(elemento.valorProd); 
  }, 0);
  
  
  const netoCarrito = document.getElementById("neto");
  const ivaCarrito = document.getElementById("iva");
  const totalCarrito = document.getElementById("total");
  netoCarrito.textContent = `Valor Neto $ ${sum}`
  ivaCarrito.textContent = `Iva (19%) $ ${sum*0.19}`
  totalCarrito.textContent = `Total $ ${(sum*0.19)+sum}`
  
  return sum;
  
}
//-------------Boton--CompraR------------------------------
function botonComprar(){
let obtenerArraylist = localStorage.getItem('arrayCompra2');
let obtenerArraylist2 = JSON.parse(obtenerArraylist);

  if (arrayCompra2.length>0 || obtenerArraylist2.length>0) {
    alert("Puedes pasar a comprar")
    window.location.href = 'checkout.html';
  }else{
    alert("Debes tener productos agregados para comprar")
  }
}




