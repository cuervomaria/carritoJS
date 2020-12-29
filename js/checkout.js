
let nombre = ""
let apellido =""
let direccion=""
let telefono=""
let email=""
let resumenCompra = document.getElementById("resumenCompra")


// Example starter JavaScript for disabling form submissions if there are invalid fields

function capturarFormulario (e){
    
    e.preventDefault()
    nombre=document.getElementById("nombre").value
    apellido=document.getElementById("apellido").value
    direccion=document.getElementById("direccion").value
    telefono=document.getElementById("telefono").value
    email=document.getElementById("email").value

}

function validacion() {
    debugger
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          
          
          form.classList.add('was-validated')
        }, false)
      })
      
  }

  function resumen(){

      const resumen= ` <div class="container">
                <h4>RESUMEN DE SU COMPRA </h4>
                <hr>
                <p>Nombre: ${nombre} ${apellido}</p>
                <p>Dirección: ${direccion}</p>
                <p>Teléfono: ${telefono}</p>
                 <p>Cantidad de productos: 4</p> 
                <p>Total de la compra: ${total()}</p>

                <div class="row">
                    <div class="col-12 d-flex justify-content-around">
                    <button type="button" class="btn btn-sm btn-outline-secondary botones" onclick="">   Volver <i class="fas fa-arrow-left"></i></button>
                    <button type="button" class="btn btn-sm  btn-dark botones" onclick="">Confirmar compra <i class="fas fa-check"></i></button>
                    
                    </div>
                    </div>


    </div>`

    resumenCompra.innerHTML = resumen



  }

  
//cambiar q de productos (crear función)
//validación
//transiciones
//whatsapp??
//branch datosUsuario
//limpiar código
