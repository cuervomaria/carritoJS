//CREO LAS VARIABLES

let tablaProductos = $("#tablaProductos")  
let formularioDatosUsuario = $("#datosUsuario")
let resumenCompra = $("#resumenCompra")
let logo = $("#logo")

//--------- TRANSICIONES -----------------------------

//FUNCIÓN MOSTRAR PRODUCTOS ELEGIDOS
//Al hacer click en el changuito se ocultan los ítems del catálogo y se muestra una tabla con el resumen de la compra. Si se está en una página más adelante (formulario/resumen) también se oculta y se muestra el resumen

function mostrarProductosElegidos(){
    catalogo.fadeOut(1000, function () {
        formularioDatosUsuario.fadeOut(1000, function(){
            resumenCompra.fadeOut(1000, function(){
                tablaProductos.slideDown(2000)
            })
        })              
    })    
  }

//FUNCIÓN SEGUIR COMPRANDO. 
//Vuelve al catálogo (oculta la tabla y muestra el catálogo)

function seguirComprando() {
    tablaProductos.fadeOut(1000, function(){
        catalogo.slideDown(2000)
    })
  }

// FUNCION INICIAR COMPRA - Va al formulario
// Oculta el resumen del carrito y muestra el formulario para ingresar los datos del cliente. Si el carrito está vacío muestra un alert

function iniciarCompra (){
    if (carrito.length == 0) {
      alert("Ud no ha añadido ningún producto a su carrito")
    }
        else {tablaProductos.fadeOut (1000, function (){
      formularioDatosUsuario.slideDown(2000)
        })}
  }


// FUNCION VOLVER
// Oculta el formulario y vuelve al carrito

function volverCarrito (){
    formularioDatosUsuario.fadeOut (1000, function (){
      tablaProductos.slideDown(2000)
    })
  }

  //FUNCIÓN MOSTRAR RESUMEN
  //Oculta el formulario y muestra el resumen de compra y de los datos ingresados en el formulario
  function mostrarResumen (){
    formularioDatosUsuario.fadeOut (1000, function (){
      resumenCompra.slideDown(2000)
    })
  }

  //FUNCIÓN VOLVER AL FORMULARIO
  //Oculta el resumen y muestra el formulario

  function volverFormulario (){
    resumenCompra.fadeOut (1000, function (){
      formularioDatosUsuario.slideDown(2000)
    })
  }

  //FUNCIÓN VOLVER ARRIBA CON EFECTO SCROLL
  function volverArriba() {
    $("html, body").animate({
      scrollTop: 0
    }, 2000)
  }

  //FUNCIION VOLVER ARRIBA
  
  logo.click (function (){
    tablaProductos.fadeOut(1000, function(){
        formularioDatosUsuario.fadeOut(1000, function(){
            resumenCompra.fadeOut(1000, function(){
                catalogo.slideDown(2000)
            })
        })
    })
          

  })
  
