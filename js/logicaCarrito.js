//CREO LAS VARIABLES
let checkout = $("#checkout")   
let productosElegidos = $("#productosElegidos") 
let subtotal = 0   





//AGREGO PRODUCTOS CARRITO
//SE CREA FUNCIÓN QUE AGREGA LOS PRODUCTOS AL CARRITO. SE VAN AGREGANDO LOS OBJETOS A UN ARRAY "CARRITO". 
//FINALMENTE SE LLAMA A LA FUNCIÓN CONTAR ITEMS, PARA QUE SE MUESTREN EL NÚMERO EN EL CARRITO
//Se guarda el carrito en local storage para que si se reinicia la página no se pierda el carrito

function agregoProductos2(id) {
 debugger
  const index = carrito.findIndex(item => item.id === id);
  if (index > -1) {
    carrito[index].cantidad += 1
  } else {
    productoAAgregar = jsonProductos.find(item => item.id === id)
    carrito.push(productoAAgregar)
  }
  alert("El producto fue agregado exitosamente")
  contarItemsCarrito()
  localStorage.setItem("carritoCargado", JSON.stringify(carrito))
}


//REVISAR CARRITO
//Al clickear el carrito se ocultan los ítems del catálogo y se muestra una tabla con el resumen de la compra mediante la fc mostrarProductosElegidos.
//El símbolo eliminar, invoca la función eliminar producto del carrito, el parámetro de entrada es el index de ese producto en el array carrito
//Los símbolos + y - al lado de la cantidad invocan las funciones aumentar y disminuir cantidad respectivamente
//Finalmente se agrega una línea con los totales

checkout.click(revisarCarrito)

function revisarCarrito() {
  mostrarProductosElegidos()
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
  <td><b>TOTAL</b> </td>
  <td class="text-center"><b>${cantidadProductos()}</b></td>
  <td></td>
  <td class= "text-center"><b>$ ${total()}</b></td>
  <td ></td> 
</tr>`

  productosElegidos.append(linea)

}

//CALCULA EL TOTAL DEL CARRITO. ES INVOCADA EN LA FUNCIÓN REVISAR CARRITO
function total() {
  const total = carrito.reduce((acc, cur) => {
    acc += cur.precio * cur.cantidad
    return acc
  }, 0);

  return new Intl.NumberFormat("de-DE").format(total)
}

 // FUNCION CUENTA CANTIDAD DE PRODUCTOS

 function cantidadProductos (){
  const QProductos = carrito.reduce((acc,cur) => {
    acc += cur.cantidad
    return acc
  
  },0);
    return QProductos
}

//FUNCION ELIMINA PRODUCTO DEL CARRITO

function eliminarProductoCarrito(index) {
  const removed = carrito.splice(index, 1) //elimina el producto del carrito, la variable carrito queda con los ítems que quedaron
  productosElegidos.html("")        //borra todo el contenido de la tabla
  revisarCarrito()                  //vuelve a cargar la tabla con los productos que quedaron
  contarItemsCarrito()              //actualiza el número de items del carrito
  localStorage.setItem("carritoCargado", JSON.stringify(carrito))
}

//FUNCIÓN DISMINUIR CANTIDAD 
//Se fija si hay una sola unidad elimina el producto. Sino disminuye la cantidad en una unidad.

function disminuirCantidad(index) {
  if (carrito[index].cantidad === 1) {
    eliminarProductoCarrito(index)
  }
  else {
    carrito[index].cantidad = carrito[index].cantidad - 1
    revisarCarrito()
    localStorage.setItem("carritoCargado", JSON.stringify(carrito))
  }
}

//FUNCIÓN AUMENTAR CANTIDAD 
//Aumenta la cantidad en una unidad.
function aumentarCantidad(index) {
  carrito[index].cantidad = carrito[index].cantidad + 1
  revisarCarrito()
  localStorage.setItem("carritoCargado", JSON.stringify(carrito))
}


//FUNCIÓN ELIMINAR PRODUCTOS CARRITO
//Consulta si está seguro de eliminar todos los productos del carrito. Si le da ok, invaoca la función vaciar carrito
function eliminarProductosCarrito() {
  if (confirm("¿Desea eliminar todos los productos del carrito?")) {
    vaciarCarrito()
  }
}


//FUNCIÓN VACIAR CARRITO
//Se separa porque puede ser invocada en el resumen del carrito o al confirmar la compra.
// Elimina todos los productos del carrito, actualiza el valor del changuito, resetea el formulario y oculta lo que esté visible en ese momento, borra el localstorage y muestra el catálogo. 

function vaciarCarrito() {
  carrito = []
  contarItemsCarrito()
  formulario.reset()
  formulario.classList.remove("was-validated") 
  tablaProductos.fadeOut(1000)
  resumenCompra.fadeOut(1000)
  catalogo.slideDown(2000)
  localStorage.clear()
}



