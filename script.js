let cantidad = parseInt(prompt("Cuantos productos se van a comprar ?"));
let producto ="";
let valor = 0;
let suma = 0;
let total = 0;
let iva = 0.19;
let totalIva=0;

function Operacion(){
    for(let i = 1; i<=cantidad;i++){
         producto = prompt("Ingresa el nombre del producto "+i);
         valor = parseInt(prompt("Ingresa el valor de "+producto));

        console.log(+i+". Producto: "+producto);
        console.log("   Valor "+producto+": $"+valor);
        console.log("   Iva (19%): $"+valor*iva);
        totalIva+= valor+(valor*iva);
        console.log("       Total: $"+(valor+(valor*iva)));

        suma += valor;
        
    
        
    }
    console.log("El valor total de la compra es $"+totalIva);
}

function Verificacion(){
    console.log("Desea agregar mas productos?");
    let opcion = parseInt(prompt("Desea agregar mas productos?\n Tipea 1 -Si o 2 -No"));
    switch(opcion){
        
        case 1:
        cantidad = parseInt(prompt("Cuantos productos agregara?"));    
        Operacion();
        console.log("Gracias por su compra !")   
        break;
    
        case 2:
        console.log("Gracias por su compra !")    
        break;
    }
    }

Operacion();
Verificacion();

