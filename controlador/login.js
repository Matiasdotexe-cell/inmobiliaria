const url = './api/login.php';

// Variables del DOM
const frmLogin = document.querySelector('#form-login');
const divLogin = document.querySelector('#div-login');
const divLogout = document.querySelector('#div-logout');
const textoLogueado = document.querySelector('#texto-logueado');
const btnLogout = document.querySelector('#btn-logout');
const inputUsuario = document.querySelector('#usuario');
const inputPassword = document.querySelector('#password');

// Variables
let usuario = '';
let logueado = false;

/**
 * Inicio del documento
 */
document.addEventListener('DOMContentLoaded', () => {

});

/**
 * Obtiene los datos del formulario
 */
frmLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(frmLogin);
    login(datos);
});

/**
 * Envía los datos del formulario
 * y se loguea
 */
const login = (datos) => {
    fetch(url, {
       method: 'POST',
       body: datos 
    })
    .then(res => res.json())
    .then((data => {
        console.log(data);
        if(data[0].usuario) {
            usuario = data[0].usuario;
            logueado = true;
            sessionStorage.setItem('usuario', usuario);
            verificar();
        }
        inputUsuario.value = '';
        inputPassword.value = '';
    }));
}

/**
 * Verifica si un usuario está logueado
 */
const verificar = () => {
    if(sessionStorage.getItem('usuario')) {
        usuario = sessionStorage.getItem('usuario');
        textoLogueado.innerHTML = `Bienvenido ${usuario}`;
        logueado = true;
    }
    if(logueado) {
        divLogin.classList.remove('d-block');
        divLogin.classList.add('d-none');
        divLogout.classList.remove('d-none');
        divLogout.classList.add('d-block');
    } else {
        divLogin.classList.remove('d-none');
        divLogin.classList.add('d-block');
        divLogout.classList.remove('d-block');
        divLogout.classList.add('d-none');
    }
}

/**
 * Cierra la sesión
 */
const logout = () => {
    logueado = false;
    textoLogueado.innerHTML = '';
    sessionStorage.removeItem('usuario');
    verificar();
}

/**
 * Ejecuta el clic del botón Logout
 */
btnLogout.addEventListener('click', () => {
    logout();
})