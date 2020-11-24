class vino {
    constructor(id, linea, varietal, precio) {
        this.id = id
        this.linea = linea
        this.varietal = varietal
        this.precio = precio
        this.img = `img/${linea}-${varietal}.jpg`
    }
}

let felinoMalbec = new vino (1, "Felino", "Malbec", 1200)
let felinoCabernet = new vino (2, "Felino", "Cabernet", 1000)
let felinoChardonnay = new vino (3, "Felino", "Chardonnay", 980)
let cocodrilo = new vino (4, "Cocodrilo", "Blend", 1500)

let VINOS = [felinoMalbec, felinoCabernet, felinoChardonnay, cocodrilo]

//-------------------------------------------------//

let catalogo = document.querySelector("#catalogo")
let productos = []
let producto = ""
let carrito = []
let cantidadItems = document.getElementById("cantidadItems")
let checkout = document.getElementById("checkout")
let tablaProductos = document.getElementById("tablaProductos")
let productosElegidos = document.getElementById("productosElegidos")


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


function agregoProductos(id) {
 carrito.push(VINOS[id-1])
 alert("El producto fue agregado exitosamente")
 contarItemsCarrito()
  
}

//CONTAR CANTIDAD DE ITEMS CARRITO

function contarItemsCarrito() {
  cantidadItems.innerText=carrito.length
  
}

cantidadItems.innerText = carrito.length

//REVISAR CARRITO

checkout.addEventListener("click",revisarCarrito)

function revisarCarrito() {
  catalogo.classList.add("d-none")
  tablaProductos.classList.remove("d-none")

  for (let i = 0; i < carrito.length; i++) {
   let linea =
   ` <tr>
    <td scope="row">${i+1}</td>
    <td>${carrito[i].linea} - ${carrito[i].varietal} </td>
    <td>1</td>
    <td>${carrito[i].precio} </td>
    <td> ${carrito[i].precio}</td>
    <td>X</td>
  </tr>`;

  productosElegidos.innerHTML += linea


    
  }



  }


  

