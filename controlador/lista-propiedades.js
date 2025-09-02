import {
  obtenerPropiedades,
  insertarPropiedades,
  actualizarPropiedades,
  eliminarPropiedad,
} from "../modelos/propiedades.js";

// Objetos del DOM
const listado = document.querySelector("#listado");
const alerta = document.querySelector("#alerta");

// Formulario
const formulario = document.querySelector("#formulario");
const formularioModal = new bootstrap.Modal(
  document.querySelector("#formularioModal")
);
const btnNuevo = document.querySelector("#btnNuevo");

// Inputs
const inputid = document.querySelector("#id");
const inputTipo = document.querySelector("#tipo");
const inputDireccion = document.querySelector("#direccion");
const inputPiso = document.querySelector("#piso");
const inputDepartamento = document.querySelector("#departamento");
const inputCodpos = document.querySelector("#codpos");
const inputLocalidad = document.querySelector("#localidad");
const inputProvincia = document.querySelector("#provincia");
const inputFoto = document.querySelector("#foto");
const inputObservaciones = document.querySelector("#observaciones");
const inputPropietario_id = document.querySelector("#propietario_id");
const inputInquilino_id = document.querySelector("#inquilino_id");

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// Variables
let opcion = "";
let id;
let mensajeAlerta = "";
let propiedades = [];
let propiedad = {};

// Variables de control de usuario
let usuario = "";
let logueado = false;

/**
 * Control de usuario
 */
const controlUsuario = () => {
  if (sessionStorage.getItem("usuario")) {
    usuario = sessionStorage.getItem("usuario");
    logueado = true;
  }
  if (logueado) {
    btnNuevo.style.display = "inline";
  } else {
    btnNuevo.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  controlUsuario();
  mostrarPropiedades();
});

async function mostrarPropiedades() {
  propiedades = await obtenerPropiedades();
  listado.innerHTML = ""; // Borramos el listado

  propiedades.map((propiedad) => {
    listado.innerHTML += `
          <div class="col">
            <div class="card" style="width: 18rem">
              <img src="./assets/propiedades/${
                propiedad.foto
              }" class="card-img-top" alt="${propiedad.nombre}" />
              <div class="card-body">
                <h5 class="card-title">
                  <span name="spantipo">${propiedad.tipo}</span>
                  <span name="spandireccion">${
                    propiedad.direccion
                  }</span> - <span name="spantpiso">${propiedad.piso}</span>
                  <span name="spandepartamento">${
                    propiedad.departamento
                  }</span> - <span name="spancodpos">${propiedad.codpos}</span>
                  <span name="spanlocalidad">${
                    propiedad.localidad
                  }</span> - <span name="spanprovincia">${
      propiedad.provincia
    }</span>
                  <span name="spanid">${
                    propiedad.propietario_id
                  }</span> - <span name="spantipo">${
      propiedad.inquilino_id
    }</span>
                </h5>
                <p class="card-text">
                  ${propiedad.observaciones} 
                </p>
                <input  type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcular()" />
              </div>
              <div class="card-footer ${
                logueado ? "d-flex" : "d-none"
              } justify-content-center">
                <button class="btn-editar btn btn-primary">Editar</button>
                <button class="btn-borrar btn btn-danger">Borrar</button>
                <input type="hidden" class="id-propiedad" value="${
                  propiedad.id
                }" />
              </div>
            </div>
          </div>    
    `;
  });
}

/**
 * Ejecuta el evento click del botón Nuevo
 */
btnNuevo.addEventListener("click", () => {
  // Limpiamos los inputs
  inputid.value = null;
  inputTipo.value = null;
  inputDireccion.value = null;
  inputPiso.value = null;
  inputDepartamento.value = null;
  inputCodpos.value = null;
  inputLocalidad.value = null;
  inputProvincia.value = null;
  inputFoto.value = null;
  inputObservaciones.value = null;
  inputPropietario_id.value = null;
  inputInquilino_id.value = null;

  frmImagen.src = "./assts/img/nodisponible.png";

  // Mostramos el formulario Modal
  formularioModal.show();

  opcion = "insertar";
});

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene la acción por defecto
  const datos = new FormData(formulario); // Guardamos los datos del formulario

  switch (opcion) {
    case "insertar":
      insertarPropieades(datos); // Ejecutamos el método insertarPropieades del modelo
      mensajeAlerta = "Datos guardados";
      break;
    case "actualizar":
      actualizarPropieades(datos, id);
      mensajeAlerta = "Datos actualizados";
      break;
  }
  insertarAlerta(mensajeAlerta, "success");
  mostrarPropieades(); // Mostramos los artículos
});

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de mensaje
 */
const insertarAlerta = (mensaje, tipo) => {
  const envoltorio = document.createElement("div");
  envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
      <div>${mensaje}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
  alerta.append(envoltorio);
};

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento el elemento que contiene el objeto
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el manejador del evento
 */
const on = (elemento, evento, selector, manejador) => {
  elemento.addEventListener(evento, (e) => {
    // Agregamos el método para escuchar el evento
    if (e.target.closest(selector)) {
      // Si el objetivo del manejador es el selector
      manejador(e); // Ejecutamos el método del manejador
    }
  });
};

/**
 * Función para el botón Editar
 */
on(document, "click", ".btn-editar", (e) => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón

  id = cardFooter.querySelector(".id-propiedad").value; // Guardamos el id del artículo

  propiedad = propiedades.find((item) => item.id == id); // Buscamos el artículo con ese id

  // Asignamos los valores a los input del formulario
  inputid.value = propiedad.id;
  inputTipo.value = propiedad.tipo;
  inputDireccion.value = propiedad.direccion;
  inputPiso.value = propiedad.piso;
  inputDepartamento.value = propiedad.departamento;
  inputCodpos.value = propiedad.codpos;
  inputLocalidad.value = propiedad.localidad;
  inputProvincia.value = propiedad.provincia;
  inputFoto.value = propiedad.foto;
  inputObservaciones.value = propiedad.observaciones;
  inputPropietario_id.value = propietario_id;
  inputInquilino_id.value = inquilino_id;

  frmImagen.src = `./assets/img/${propiedad.imagen}`;

  // Mostramos el formulario
  formularioModal.show();

  opcion = "actualizar";
});

/**
 * Función para el botón borrar
 */
on(document, "click", ".btn-borrar", (e) => {
  const cardFooter = e.target.parentNode;
  id = cardFooter.querySelector(".id-propiedad").value;

  propiedad = propiedades.find((item) => item.id == id);

  let aceptar = confirm(`¿Realmente desea eliminar a ${propiedad.nombre}?`);
  if (aceptar) {
    eliminarPropiedad(id);
    insertarAlerta(`${propiedad.nombre} eliminado!`, "danger");
    mostrarPropiedades();
  }
});
