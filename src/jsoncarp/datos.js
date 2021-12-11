/* const datos = require('./datos.json');
console.log(typeof datos); */

//LOCALSTORAGE
//SET => guardar
//GET => obtener

const nombre = 'sheila';
localStorage.setItem('nombreUser', nombre); //guarda en el local, clave y valor

//obtener lo del localstorage y guardar en una constante
const nombreLocalStorage = localStorage.getItem('nombreUser');
console.log(nombreLocalStorage);

//remover quitar, eliminar la clave
localStorage.removeItem('nombreUser');
