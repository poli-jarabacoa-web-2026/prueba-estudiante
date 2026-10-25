// =====================================================
//  CLIMA EN VIVO (API de Open-Meteo, no necesita clave)
//  CAMBIA AQUÍ la ubicación de tu comunidad (Unidad 11).
//  Busca las coordenadas en openstreetmap.org:
//  clic derecho sobre el lugar > "Mostrar dirección".
// =====================================================
const LATITUD = 19.12;     // Jarabacoa
const LONGITUD = -70.64;

// ----- De aquí para abajo no necesitas cambiar nada -----
const URL_CLIMA = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=" + LATITUD + "&longitude=" + LONGITUD +
  "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
  "&timezone=America%2FSanto_Domingo";

// Traduce el código del clima (estándar WMO) a palabras
function describirClima(codigo) {
  if (codigo === 0) return "Despejado";
  if (codigo <= 3) return "Parcialmente nublado";
  if (codigo === 45 || codigo === 48) return "Neblina";
  if (codigo >= 51 && codigo <= 67) return "Lluvia";
  if (codigo >= 80 && codigo <= 82) return "Aguaceros";
  if (codigo >= 95) return "Tormenta eléctrica";
  return "Variable";
}

async function cargarClima() {
  const caja = document.getElementById("clima");
  if (!caja) return;                    // esta página no tiene la sección del clima
  const inicio = performance.now();     // para medir el tiempo de respuesta

  try {
    const respuesta = await fetch(URL_CLIMA);
    if (!respuesta.ok) {
      throw new Error("El servidor respondió con el código " + respuesta.status);
    }
    const datos = await respuesta.json();
    const actual = datos.current;

    caja.innerHTML = `
      <div class="clima-dato"><span>Temperatura</span><strong>${actual.temperature_2m} °C</strong></div>
      <div class="clima-dato"><span>Cielo</span><strong>${describirClima(actual.weather_code)}</strong></div>
      <div class="clima-dato"><span>Humedad</span><strong>${actual.relative_humidity_2m} %</strong></div>
      <div class="clima-dato"><span>Viento</span><strong>${actual.wind_speed_10m} km/h</strong></div>`;
    console.log("Clima cargado en " + Math.round(performance.now() - inicio) + " ms");
  } catch (error) {
    caja.innerHTML = "<p>No pudimos cargar el clima en este momento. Intenta más tarde.</p>";
    console.error("Error al cargar el clima:", error.message);
  }
}

cargarClima();
