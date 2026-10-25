// =====================================================
//  RESERVA: calcula el total y muestra la confirmación
//  CAMBIA AQUÍ el costo del transporte (Unidad 10).
// =====================================================
const COSTO_TRANSPORTE = 500;   // RD$ por persona

// ----- De aquí para abajo no necesitas cambiar nada -----
// Busca en la página los elementos por su id
const form = document.getElementById("formReserva");
const excursion = document.getElementById("excursion");
const personas = document.getElementById("personas");
const verPersonas = document.getElementById("personasValor");
const fecha = document.getElementById("fecha");
const textoTotal = document.getElementById("total");
const mensaje = document.getElementById("mensaje");

// Si falta algún elemento, avisa en la consola (F12) en vez de fallar
if (!form || !excursion || !personas || !verPersonas || !fecha || !textoTotal || !mensaje) {
  console.warn("Reserva: falta algún campo o su id no coincide. Revisa: formReserva, excursion, personas, personasValor, fecha, total y mensaje.");
} else {
  // La fecha mínima es mañana
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  fecha.min = manana.toISOString().split("T")[0];

  // Calcula el total: precio x personas (+ transporte)
  function calcularTotal() {
    const precio = Number(excursion.value) || 0;
    const cantidad = Number(personas.value);
    let total = precio * cantidad;
    if (form.transporte && form.transporte.value === "si") {
      total = total + COSTO_TRANSPORTE * cantidad;
    }
    textoTotal.textContent = "RD$ " + total.toLocaleString("es-DO", { minimumFractionDigits: 2 });
    return total;
  }

  // Cada vez que se mueve el deslizador, muestra la cantidad
  personas.addEventListener("input", function () {
    verPersonas.textContent = personas.value;
    calcularTotal();
  });

  // Cada vez que cambia algo del formulario, recalcula
  form.addEventListener("change", calcularTotal);

  // Al enviar (el navegador ya revisó los campos obligatorios)
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();               // no recargar la página
    const total = calcularTotal();
    const nombreExcursion = excursion.options[excursion.selectedIndex].text.split(" (")[0];
    mensaje.hidden = false;
    mensaje.innerHTML = "<strong>¡Gracias, " + form.nombre.value.trim() + "!</strong><br>" +
      "Recibimos tu reserva para <strong>" + nombreExcursion + "</strong> el " + fecha.value +
      " para " + personas.value + " persona(s). Total estimado: <strong>RD$ " +
      total.toLocaleString("es-DO", { minimumFractionDigits: 2 }) + "</strong>.";
    form.reset();
    verPersonas.textContent = personas.value;
    calcularTotal();
  });

  // Al limpiar, el total vuelve a calcularse
  form.addEventListener("reset", function () {
    setTimeout(function () {
      verPersonas.textContent = personas.value;
      calcularTotal();
    }, 0);
  });

  calcularTotal();
}
