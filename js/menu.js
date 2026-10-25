// Menú responsivo: abre y cierra el menú en pantallas pequeñas
const menuBoton = document.getElementById("menuBoton");
const menu = document.getElementById("menuPrincipal");

menuBoton.addEventListener("click", function () {
  const abierto = menu.classList.toggle("abierto");
  menuBoton.setAttribute("aria-expanded", abierto);
});
