
let nombre = ""
let apellido =""
let direccion=""
let telefono=""
let email=""
const formulario = document.getElementById("formulario")



// Example starter JavaScript for disabling form submissions if there are invalid fields

formulario.addEventListener("submit", function(e){
  e.preventDefault()
  formulario.classList.add("was-validated")
  nombre=document.getElementById("nombre").value
  apellido=document.getElementById("apellido").value
  direccion=document.getElementById("direccion").value
  telefono=document.getElementById("telefono").value
  email=document.getElementById("email").value
  if(formulario.checkValidity()===false){
    return false
  } else{
    resumen ()
  mostrarResumen ()
  }
    
})


  

  //FUNCION RESUMEN
  //Muestra un resumen de la compra a realizar
  function resumen(){

    const resumen = ` <div class="container">
                <h4>RESUMEN DE SU COMPRA </h4>
                <hr>
                <p>Nombre: ${nombre} ${apellido}</p>
                <p>Dirección: ${direccion}</p>
                <p>Teléfono: ${telefono}</p>
                 <p>Cantidad de productos: ${cantidadProductos()}</p> 
                <p>Total de la compra: $ ${total()}</p>

                <div class="row">
                    <div class="col-12 d-flex justify-content-around">
                    <button type="button" class="btn btn-sm btn-outline-secondary botones" onclick="volverFormulario()">   Volver <i class="fas fa-arrow-left"></i></button>
                    <button type="button" class="btn btn-sm  btn-dark botones" onclick="confirmarCompra()">Confirmar compra <i class="fas fa-check"></i></button>
                    </div>
                    </div>
                 </div>`
    resumenCompra.html(resumen)
  }

  //FUNCIÓN CONFIRMAR COMPRA
  //Muestra un alert indicando que se ha realizado la compra y abre una ventana de whatsapp para comunicarse. Vacía el carrito y vuelve a la página inicial
  
  function confirmarCompra(){
    alert (` Muchas gracias por su compra ${nombre}, en breve le estaremos enviando sus productos a ${direccion}. 
    Además abriremos una pestaña de whatsapp para que nos envíe sus consultas por ese medio`)
    window.open(`https://wa.me/5492615192186?text=Hola%20,%20mi%20nombre%20es%20${nombre}%20${apellido},%20te%20contacto%20por%20el%20pedido%20que%20hice%20por%20la%20web%20de%20${cantidadProductos()}%20productos%20por%20un%20importe%20total%20de%20$%20${total()}`)
    vaciarCarrito()
  }

 
