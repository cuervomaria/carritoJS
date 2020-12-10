//CREO LAS VARIABLES

let catalogo = $("#catalogo")
let productos = []
let producto = ""
let carrito = []
let cantidadItems = $("#cantidadItems")
let checkout = $("#checkout")
let tablaProductos = $("#tablaProductos")
let productosElegidos = $("#productosElegidos")
let varTotal = 0
let subtotal = 0

//FUNCIÓN PARA ARMAR EL CATÁLOGO EN EL DOCUMENTO HTML. RECORRO EL JSON DE LOS OBJETOS/PRODUCTOS
// Y CREO EL CÓDIGO HTML Q SE GUARDA EN UNA VARIABLE, QUE LUEGO FORMA UN ARRAY. Y SE CARGA EN EL BODY DEL HTML CUANDO CARGA LA PÁGINA
//EN EL TAG BUTTON LLAMO LA FUNCIÓN AGREGO PRODUCTOS CON PARÁMETRO EL ID DEL PRODUCTO

function armarCatalogo() {
   //debugger
    jsonVINOS.forEach((vino)=> {
     

        producto = `<div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img src=${vino.img} alt="" class="card-img-top">
      <hr/>
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
    catalogo.html(productos)

};


document.body.addEventListener("load",armarCatalogo())

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
  carrito.push(jsonVINOS[id-1])
}

   
 alert("El producto fue agregado exitosamente")
 contarItemsCarrito()
  
}

//CONTAR CANTIDAD DE ITEMS CARRITO.
//Cuenta los ítems del array carrito y luego pone ese número al lado del ícono del carrito.

function contarItemsCarrito() {
  cantidadItems.text(carrito.length)
}

//REVISAR CARRITO
//Al clickear el carrito se ocultan los ítems del catálogo y se muestra una tabla con el resumen de la compra
//El símbolo elimiar, invoca la función eliminar producto del carrito, el parámetro de entrada es el index de ese producto en el array carrito

checkout.click(revisarCarrito)

function revisarCarrito() {
  
  catalogo.addClass("d-none")
  tablaProductos.removeClass("d-none")
  productosElegidos.html("")
  let linea = ""

  for (let i = 0; i < carrito.length; i++) {
    subtotal = carrito[i].precio * carrito[i].cantidad
   linea =
   ` <tr>
    <td scope="row">${i+1}</td>
    <td>${carrito[i].linea} - ${carrito[i].varietal} </td>
    <td>${carrito[i].cantidad}</td>
    <td>$ ${carrito[i].precio} </td>
    <td>$ ${subtotal} </td>
    <td onclick=eliminarProductoCarrito(${i})>x</td> 
  </tr>`;
  productosElegidos.append(linea)

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

productosElegidos.append(linea)

}

//CALCULA EL TOTAL DEL CARRITO. ES INVOCADA EN LA FUNCIÓN REVISAR CARRITO
function total(){
  //debugger
  varTotal = 0
  for(j=0; j<carrito.length; j++){
    varTotal += carrito[j].precio * carrito[j].cantidad
  }
  return varTotal
}

//FUNCION ELIMINA PRODUCTO DEL CARRITO

function eliminarProductoCarrito(index){
  removed = carrito.splice(index,1) //elimina el producto del carrito, la variable carrito queda con los ítems que quedaron
  productosElegidos.html("")    //borra todo el contenido de la tabla
  revisarCarrito()                  //vuelve a cargar la tabla con los productos que quedaron
  contarItemsCarrito()              //actualiza el número de items del carrito


}


//FUNCIÓN SEGUIR COMPRANDO. 
//Vuelve al catálogo (oculta la tabla y muestra el catálogo)

function seguirComprando (){
  tablaProductos.addClass("d-none")
  catalogo.removeClass("d-none")


}

//FUNCION CONFIRMAR COMPRA

function confirmarCompra() {

 if(carrito.length==0){
   alert("Ud no ha añadido ningún producto a su carrito")
   
 }
 else if(confirm(`Ud va a confirmar la compra de ${carrito.length} productos por un importe total de $ ${varTotal}`)){
  alert("Muchas gracias por su compra")
  carrito = []
  contarItemsCarrito()
  tablaProductos.addClass("d-none")
  catalogo.removeClass("d-none")}

}
