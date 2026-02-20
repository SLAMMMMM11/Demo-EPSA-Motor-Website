document.addEventListener("DOMContentLoaded", () => {
  const modelDB = {
    "4t-plus-gsl": {
      name: "4T Plus GSL",
      image: "../assets/media/images/4T PLUS GSL.png",
      description: "Motocar de pasajeros 4 tiempos orientado a operación urbana intensiva con enfoque en estabilidad y continuidad de trabajo.",
      facts: ["Capacidad: 3 pasajeros", "Carga útil: 350 kg", "Frenos: Tambor delantero y trasero", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Motor: 198.88 cc", "Potencia: 10.19 HP", "Torque: 17.10 Nm", "Velocidad máx.: 65 km/h", "Combustible: Gasolina"],
    },
    "4t-plus-glp": {
      name: "4T Plus GLP",
      image: "../assets/media/images/4T PLUS GLP.png",
      description: "Versión enfocada en ahorro operativo con GLP para trayectos frecuentes de pasajeros.",
      facts: ["Capacidad: 3 pasajeros", "Carga útil: 340 kg", "Frenos: Tambor delantero y trasero", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Motor: 198.88 cc", "Potencia: 9.32 HP", "Torque: 16.00 Nm", "Combustible: GLP", "Uso recomendado: Ciudad"],
    },
    "4t-plus-gnv": {
      name: "4T Plus GNV",
      image: "../assets/media/images/4T PLUS GNV.png",
      description: "Configuración de bajo costo por kilómetro, ideal para operación diaria de alto kilometraje.",
      facts: ["Capacidad: 3 pasajeros", "Carga útil: 330 kg", "Frenos: Tambor delantero y trasero", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Motor: 198.88 cc", "Potencia: 8.78 HP", "Torque: 14.50 Nm", "Tanques: 30 L + 4.5 kg", "Combustible: GNV / Gasolina"],
    },
    "2t-ug-gsl": {
      name: "2T UG GSL",
      image: "../assets/media/images/2T UG GSL.png",
      description: "Modelo 2 tiempos con respuesta ágil para rutas urbanas y zonas con pendientes.",
      facts: ["Capacidad: 3 pasajeros", "Carga útil: 320 kg", "Frenos: Tambor delantero y trasero", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 4,000 km"],
      specs: ["Motor: 145.45 cc", "Potencia: 8.44 HP", "Torque: 17.00 Nm", "Combustible: Gasolina", "Uso: Pasajeros urbanos"],
    },
    "2t-ug-glp": {
      name: "2T UG GLP",
      image: "../assets/media/images/2T UG GLP.png",
      description: "Versión 2T con sistema GLP para reducir costos en operación continua.",
      facts: ["Capacidad: 3 pasajeros", "Carga útil: 320 kg", "Frenos: Tambor delantero y trasero", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 4,000 km"],
      specs: ["Motor: 145.45 cc", "Potencia: 8.58 HP", "Torque: 15.00 Nm", "Velocidad máx.: 60 km/h", "Combustible: GLP"],
    },
    "maxima-glp": {
      name: "Maxima GLP",
      image: "../assets/media/images/MAXIMA GLP.png",
      description: "Modelo de carga y uso mixto con estructura robusta para reparto exigente.",
      facts: ["Capacidad: 2 pasajeros", "Carga útil: 500 kg", "Frenos: Tambor reforzado", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Motor: 236.2 cc", "Potencia: 11.06 HP", "Torque: 17.55 Nm", "Velocidad máx.: 62 km/h", "Combustible: GLP"],
    },
    "maxima-z-lpg": {
      name: "Maxima Z LPG",
      image: "../assets/media/images/Maxima-Z-LPG-Yellow-FRONT-7x8-righ2.png",
      description: "Plataforma de carga para rutas largas y operación de trabajo constante.",
      facts: ["Capacidad: 2 pasajeros", "Carga útil: 550 kg", "Frenos: Tambor reforzado", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Motor: 236.2 cc DTS-i", "Potencia: 8.25 kW", "Torque: 17.55 Nm", "Tanque: 20.6 L", "Combustible: LPG"],
    },
    "titanio-250": {
      name: "Titanio 250",
      image: "../assets/media/images/TORITO-TITANIO-250-700X590.png",
      description: "Modelo de mayor capacidad para trabajo intensivo con excelente estabilidad y torque.",
      facts: ["Capacidad: 2 pasajeros", "Carga útil: 600 kg", "Frenos: Tambor reforzado", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Motor: 236.2 cc", "Potencia: 9.86 HP", "Torque: 18.00 Nm", "Velocidad máx.: 62 km/h", "Combustible: Gasolina"],
    },
    "crom-ug-gsl": {
      name: "CROM UG GSL",
      image: "../assets/media/images/torito_crom_ug_gsl.webp",
      description: "Modelo para pasajeros con enfoque en confort, diseño de cabina y rendimiento urbano.",
      facts: ["Capacidad: 3 pasajeros", "Carga útil: 340 kg", "Frenos: Tambor delantero y trasero", "Garantía: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"],
      specs: ["Cilindraje: 200 cc (referencial)", "Torque: 17.00 Nm", "Uso: Pasajeros urbanos", "Combustible: Gasolina", "Tracción: Posterior"],
    },
  };

  const params = new URLSearchParams(window.location.search);
  const slugFromQuery = params.get("modelo");
  const slugFromData = document.body?.dataset?.model || "";
  const slug = slugFromData || slugFromQuery || "4t-plus-gsl";
  const model = modelDB[slug] || modelDB["4t-plus-gsl"];

  const nameEl = document.getElementById("detailName");
  const imgEl = document.getElementById("detailImage");
  const descEl = document.getElementById("detailDescription");
  const factsEl = document.getElementById("detailFacts");
  const specsEl = document.getElementById("detailSpecs");
  const quoteEl = document.getElementById("detailQuoteLink");

  if (!nameEl || !imgEl || !descEl || !factsEl || !specsEl || !quoteEl) return;

  nameEl.textContent = model.name;
  imgEl.src = model.image;
  imgEl.alt = model.name;
  descEl.textContent = model.description;
  quoteEl.href = `cotiza.html?modelo=${encodeURIComponent(model.name)}`;

  document.title = `${model.name} | EPSA Motor`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", `Ficha del ${model.name} en EPSA Motor: especificaciones, capacidad, combustible y datos para cotizar.`);
  }

  factsEl.innerHTML = model.facts.map((fact) => `<span class="model-detail-chip">${escapeHtml(fact)}</span>`).join("");
  specsEl.innerHTML = model.specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("");
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
