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
let encabezado = $(".navbar")
let contenedores = $("th")
let jsonProductos = []


//FUNCIÓN PARA ARMAR EL CATÁLOGO EN EL DOCUMENTO HTML. RECORRO EL JSON DE LOS OBJETOS/PRODUCTOS
// Y CREO EL CÓDIGO HTML Q SE GUARDA EN UNA VARIABLE, QUE LUEGO FORMA UN ARRAY. Y SE CARGA EN EL BODY DEL HTML CUANDO CARGA LA PÁGINA
//EN EL TAG BUTTON LLAMO LA FUNCIÓN AGREGO PRODUCTOS CON PARÁMETRO EL ID DEL PRODUCTO
function armarCatalogo() {
  $.ajax({
    url: "js/vinos.json",
    dataType: "json",
    success: function (response) {
      jsonProductos = response
      jsonProductos.forEach((vino) => {
        producto = `<div class="col-md-4">
                      <div class="card mb-4 shadow-sm" >
                        <img src=${vino.img} alt="" class="card-img-top">
                        <hr/>
                        <div class="card-body">
                          <p class="card-text text-center"><strong>${vino.linea.toUpperCase()}</strong></p>
                          <p class="card-text text-center">${zonaFinca(vino)}</p>
                          <p class="card-text text-center"> ${vino.varietal}</p>
                          <p class="card-text text-center font-weight-bold">$ ${new Intl.NumberFormat("de-DE").format(vino.precio)}</p>
                          <div class="d-flex justify-content-center align-items-center">
                            <button type="button" class="btn btn-sm btn-outline-secondary" id= ${vino.id} onclick="agregoProductos2(${vino.id})">Agregar</button>
                          </div>
                        </div>
                      </div>
                    </div>`
        productos.push(producto)
      })
      catalogo.html(productos)
    }
   }
)}

// function armarCatalogo2() {
//   //debugger
//   jsonVINOS.forEach((vino) => {


//     producto = `<div class="col-md-4">
//     <div class="card mb-4 shadow-sm" >
//       <img src=${vino.img} alt="" class="card-img-top">
//       <hr/>
//       <div class="card-body">
//         <p class="card-text text-center"><strong>${vino.linea.toUpperCase()}</strong></p>
//         <p class="card-text text-center">${zonaFinca(vino)}</p>
//         <p class="card-text text-center"> ${vino.varietal}</p>
//         <p class="card-text text-center font-weight-bold">$ ${new Intl.NumberFormat("de-DE").format(vino.precio)}</p>
//         <div class="d-flex justify-content-center align-items-center">
//            <button type="button" class="btn btn-sm btn-outline-secondary" id= ${vino.id} onclick="agregoProductos2(${vino.id})">Agregar</button>
//         </div>
//       </div>
//     </div>
//   </div>`

//     productos.push(producto)


//   })
//   catalogo.html(productos)

// };

function zonaFinca(item) {
  //debugger
  if (item.zona != undefined) {
    return item.zona
  } else if (item.finca != undefined) {
    return item.finca
  } else {
    return "</br>"
  }

}

// <p class="card-text text-center">${if(vino.zona!=""){vino.zona}elseif(vino.finca!=""){vino.finca}else(){""}}</p>

// function dibujarCards(){ //recordar poner display:none a las card para que funcione el slideDown()
//    let card = $(".card");
//    let scrollTop = document.documentElement.scrollTop;
//     for (var i; i<card.length; i++){
//       let alturaCard= card[i].offsetTop;
//       if(alturaCard<=scrollTop){
//         card[i].slideDown(3000)
//       }

//     }

//  }

$(document).ready(function () {
  carritoInicial()
  armarCatalogo()
  encabezado.show(2000, function () {
     //dibujarCards()
    catalogo.slideDown(3000)
  })

})



function carritoInicial() {
  if (localStorage.carritoCargado != undefined && localStorage.length > 0) {
    carrito = JSON.parse(localStorage.carritoCargado);
    contarItemsCarrito();
  }

}

//AGREGO PRODUCTOS CARRITO
//SE CREA FUNCIÓN QUE AGREGA LOS PRODUCTOS AL CARRITO. SE VAN AGREGANDO LOS OBJETOS A UN ARRAY "CARRITO". 
//FINALMENTE SE LLAMA A LA FUNCIÓN CONTAR ITEMS, PARA QUE SE MUESTREN EL NÚMERO EN EL CARRITO
//Se guarda el carrito en local storage para que si se reinicia la página no se pierda el carrito

function agregoProductos2(id) {
  const index = carrito.findIndex(item => item.id === id);
  if (index > -1) {
    carrito[index].cantidad += 1
  } else {
    const productoAAgregar = jsonProductos.find(item => item.id === id)
    carrito.push(productoAAgregar)
  }
  alert("El producto fue agregado exitosamente")
  contarItemsCarrito()
  localStorage.setItem("carritoCargado", JSON.stringify(carrito))
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


  catalogo.fadeOut(1000, function (){
    tablaProductos.slideDown(2000)

  })
  //tablaProductos.removeClass("d-none")
  
  productosElegidos.html("")
  let linea = ""

  for (let i = 0; i < carrito.length; i++) {
    subtotal = carrito[i].precio * carrito[i].cantidad
    linea =
      ` <tr>
    <td scope="row">${i + 1}</td>
    <td>${carrito[i].linea} - ${carrito[i].varietal} </td>
    <td class="d-flex justify-content-around"> <i onclick=disminuirCantidad(${i})><span role="button" class="fas fa-minus-circle"></span></i>${carrito[i].cantidad}<i onclick=aumentarCantidad(${i})><span role="button" class="fas fa-plus-circle"></span></i></td>
    <td class= "text-center">$ ${new Intl.NumberFormat("de-DE").format(carrito[i].precio)} </td>
    <td class= "text-center">$ ${new Intl.NumberFormat("de-DE").format(subtotal)} </td>
    <td class= "text-center" onclick=eliminarProductoCarrito(${i})> <b  role="button" class="fas fa-times-circle"></b></td> 
  </tr>`;
    productosElegidos.append(linea)

  }

  linea =
    ` <tr>
  <td scope="row"></td>
  <td>TOTAL </td>
  <td></td>
  <td></td>
  <td class= "text-center"><b>$ ${total()}</b></td>
  <td ></td> 
</tr>`

  productosElegidos.append(linea)

}

//CALCULA EL TOTAL DEL CARRITO. ES INVOCADA EN LA FUNCIÓN REVISAR CARRITO
function total() {
  //debugger
  //  varTotal = 0
  // for (j = 0; j < carrito.length; j++) {
  // varTotal += carrito[j].precio * carrito[j].cantidad
  //  }
  //  return varTotal

  // Misma logica con function reduce
  const total = carrito.reduce((acc, cur) => {
    acc += cur.precio * cur.cantidad
    return acc
  }, 0);

  return new Intl.NumberFormat("de-DE").format(total)
}

//FUNCION ELIMINA PRODUCTO DEL CARRITO

function eliminarProductoCarrito(index) {
  removed = carrito.splice(index, 1) //elimina el producto del carrito, la variable carrito queda con los ítems que quedaron
  productosElegidos.html("")        //borra todo el contenido de la tabla
  revisarCarrito()                  //vuelve a cargar la tabla con los productos que quedaron
  contarItemsCarrito()              //actualiza el número de items del carrito
  localStorage.setItem("carritoCargado", JSON.stringify(carrito))


}


//FUNCIÓN SEGUIR COMPRANDO. 
//Vuelve al catálogo (oculta la tabla y muestra el catálogo)

function seguirComprando() {
  tablaProductos.fadeOut(1000)
  catalogo.slideDown(2000)


}

//FUNCION CONFIRMAR COMPRA

function confirmarCompra() {

  if (carrito.length == 0) {
    alert("Ud no ha añadido ningún producto a su carrito")

  }
  else if (confirm(`Ud va a confirmar la compra de ${carrito.length} productos por un importe total de $ ${total()}`)) {
    alert("Muchas gracias por su compra")
    vaciarCarrito()
  }

}

function vaciarCarrito() {
  carrito = []
  contarItemsCarrito()
  tablaProductos.fadeOut(1000)
  catalogo.slideDown(2000)
  localStorage.clear()

}

function eliminarProductosCarrito() {
  if (confirm("¿Desea eliminar todos los productos del carrito?")) {
    vaciarCarrito()
  }
}

function disminuirCantidad (index) {
  if (carrito[index].cantidad ===1){
    eliminarProductoCarrito(index)
  }
  else {
    carrito[index].cantidad = carrito[index].cantidad-1
    revisarCarrito()
    localStorage.setItem("carritoCargado", JSON.stringify(carrito))
  } 
}

function aumentarCantidad (index) {
    carrito[index].cantidad = carrito[index].cantidad+1
    revisarCarrito()
    localStorage.setItem("carritoCargado", JSON.stringify(carrito))
  }

//Animación back to Top


// function volverArriba (posicion){
//   $("html, body").animate({
//     scrollTop: posicion.offset().top},2000)
// }


function volverArriba (){
  $("html, body").animate({
    scrollTop: 0},2000)
}


