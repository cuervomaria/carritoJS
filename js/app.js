//Crear productos. Creo una class creadora de objeto, luego un objeto por cada producto
//y finalmente un array con todos los objetos creados
var subtotal

class vino {
    constructor(id, linea, varietal, precio) {
        this.id = id
        this.linea = linea
        this.varietal = varietal
        this.precio = precio
        this.cantidad = 1
        this.img = `img/${linea}-${varietal}.jpg`
        this.subtotal = function (){
          subtotal=this.cantidad * this.precio
          return subtotal
        }
    }
}

let felinoMalbec = new vino (1, "Felino", "Malbec", 1200)
let felinoCabernet = new vino (2, "Felino", "Cabernet", 1000)
let felinoChardonnay = new vino (3, "Felino", "Chardonnay", 980)
let cocodrilo = new vino (4, "Cocodrilo", "Blend", 1500)

let VINOS = [felinoMalbec, felinoCabernet, felinoChardonnay, cocodrilo]

//-------------------------------------------------

//CREO LAS VARIABLES

let catalogo = document.querySelector("#catalogo")
let productos = []
let producto = ""
let carrito = []
let cantidadItems = document.getElementById("cantidadItems")
let checkout = document.getElementById("checkout")
let tablaProductos = document.getElementById("tablaProductos")
let productosElegidos = document.getElementById("productosElegidos")

//FUNCIÓN PARA ARMAR EL CATÁLOGO EN EL DOCUMENTO HTML. RECORRO EL ARRAY DE LOS OBJETOS/PRODUCTOS
// Y CREO EL CÓDIGO HTML Q SE GUARDA EN UNA VARIABLE, QUE LUEGO FORMA UN ARRAY. Y SE CARGA EN EL BODY DEL HTML CUANDO CARGA LA PÁGINA
//EN EL TAG BUTTON LLAMO LA FUNCIÓN AGREGO PRODUCTOS CON PARÁMETRO EL ID DEL PRODUCTO

function armarCatalogo() {
  
    VINOS.forEach((vino)=> {

        producto = `<div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"> ${vino.linea}-${vino.varietal} </text></svg>
      <div class="card-body">
        <p class="card-text text-center">${vino.linea} - ${vino.varietal}</p>
        <p class="card-text text-center font-weight-bold">$ ${vino.precio}</p>
        <div class="d-flex justify-content-center align-items-center">
           <button type="button" class="btn btn-sm btn-outline-secondary" id= ${vino.id} onclick="agregoProductos(${vino.id})">Agregar</button>
        </div>
      </div>
    </div>
  </div>`

        productos.push(producto)


    })
    catalogo.innerHTML = productos

};


document.body.addEventListener("load",armarCatalogo())


//ARMAR CATÁLOGO - FALTA IMÁGEN.

// VINOS.forEach((vino)=> {

//   producto = `<div class="col-md-4">
// <div class="card mb-4 shadow-sm">
// <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"> ${vino.linea}-${vino.varietal} </text></svg>
// <div class="card-body">
//   <p class="card-text text-center">${vino.linea} - ${vino.varietal}</p>
//   <p class="card-text text-center font-weight-bold">$ ${vino.precio}</p>
//   <div class="d-flex justify-content-center align-items-center">
//      <button type="button" class="btn btn-sm btn-outline-secondary" onclick="agregoProductos(${vino.id})">Agregar</button>
//   </div>
// </div>
// </div>
// </div>`

// catalogo.innerHTML += producto


// })

//AGREGO PRODUCTOS CARRITO
//SE CREA FUNCIÓN QUE AGREGA LOS PRODUCTOS AL CARRITO. SE VAN AGREGANDO LOS OBJETOS A UN ARRAY "CARRITO". 
//FINALMENTE SE LLAMA A LA FUNCIÓN CONTAR ITEMS, PARA QUE SE MUESTREN EL NÚMERO EN EL CARRITO



function agregoProductos(id) {
  //debugger
   let qProductosInicial = carrito.length
   let existe = false
   
  
  for (let i = 0; i < qProductosInicial; i++) {
    if (carrito[i].id==id) {
      carrito[i].cantidad +=1
      existe = true
      
      break
      
    }
    
  }


if(existe == false){
  carrito.push(VINOS[id-1])
}

   
 alert("El producto fue agregado exitosamente")
 contarItemsCarrito()
  
}

//CONTAR CANTIDAD DE ITEMS CARRITO.
//Cuenta los ítems del array carrito y luego pone ese número al lado del ícono del carrito.

function contarItemsCarrito() {
  cantidadItems.innerText=carrito.length
  
}


//REVISAR CARRITO
//Al clickear el carrito se ocultan los ítems del catálogo y se muestra una tabla con el resumen de la compra
// Se define el ID de la X como el índice del objeto en el carrito, para que al llamar la función EliminarProducto del carrito elimine el objeto con ese index/ID

checkout.addEventListener("click",revisarCarrito)

function revisarCarrito() {
  catalogo.classList.add("d-none")
  tablaProductos.classList.remove("d-none")
  let linea = ""

  for (let i = 0; i < carrito.length; i++) {
   linea =
   ` <tr>
    <td scope="row">${i+1}</td>
    <td>${carrito[i].linea} - ${carrito[i].varietal} </td>
    <td>${carrito[i].cantidad}</td>
    <td>$ ${carrito[i].precio} </td>
    <td>$ ${carrito[i].subtotal()}</td>
    <td onclick=eliminarProductoCarrito(${i})>x</td> 
  </tr>`;
  productosElegidos.innerHTML += linea

  }

  linea =   
  ` <tr>
  <td scope="row"></td>
  <td>TOTAL </td>
  <td></td>
  <td></td>
  <td>$ ${total()}</td>
  <td ></td> 
</tr>`

productosElegidos.innerHTML += linea 

}

function total(){
  debugger
  let total = 0
  for(j=0; j<carrito.length; j++){
    total += carrito[j].subtotal()
  }
  return total
}

 //FUNCION ELIMINA PRODUCTO DEL CARRITO

 function eliminarProductoCarrito(index){
   removed = carrito.splice(index,1) //elimina el producto del carrito, la variable carrito queda con los ítems que quedaron
   productosElegidos.innerHTML=""    //borra todo el contenido de la tabla
   revisarCarrito()                  //vuelve a cargar la tabla con los productos que quedaron


 }
