
let nombre = ""
let apellido =""
let direccion=""
let telefono=""
let email=""
const formulario = document.getElementById("formulario")



// Example starter JavaScript for disabling form submissions if there are invalid fields

formulario.addEventListener("submit", function(e){
  e.preventDefault()
  nombre=document.getElementById("nombre").value
  apellido=document.getElementById("apellido").value
  direccion=document.getElementById("direccion").value
  telefono=document.getElementById("telefono").value
  email=document.getElementById("email").value
  resumen ()
  mostrarResumen ()
  return false
})

// function capturarFormulario (e){
  
    
//     e.preventDefault()
//     nombre=document.getElementById("nombre").value
//     apellido=document.getElementById("apellido").value
//     direccion=document.getElementById("direccion").value
//     telefono=document.getElementById("telefono").value
//     email=document.getElementById("email").value

//     resumen ()
//     mostrarResumen ()
    

// }



// function validacion() {
//     debugger
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.querySelectorAll('.needs-validation')
  
//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms)
//       .forEach(function (form) {
//         form.addEventListener('submit', function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault()
//             event.stopPropagation()
//           }
          
          
//           form.classList.add('was-validated')
//         }, false)
//       })
      
//   }

   // FUNCION CUENTA CANTIDAD DE PRODUCTOS

   function cantidadProductos (){
    const QProductos = carrito.reduce((acc,cur) => {
      acc += cur.cantidad
      return acc
      
    },0);
    
    return QProductos
  }

  //FUNCION RESUMEN
  //Muestra un resumen de la compra a realizar
  function resumen(){

      const resumen= ` <div class="container">
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

 

  
//cambiar q de productos (crear función) --ok
//transiciones --ok

//validación
//whatsapp?? -- ver si agrego boton chateame aca o cuando se dispare la compra que se abra directamente
// que se borren datos de formulario cuando confirmas la compra

//branch datosUsuario
//limpiar código -- html innecesario por ejemplo resumen de compra
