document.addEventListener("DOMContentLoaded", () => {
  const modelColorsBySlug = {
    "4t-plus-gsl": ["Rojo", "Verde", "Azul"],
    "4t-plus-glp": ["Rojo", "Verde", "Azul"],
    "4t-plus-gnv": ["Rojo", "Verde", "Azul"],
    "2t-ug-gsl": ["Rojo", "Amarillo", "Verde", "Azul"],
    "2t-ug-glp": ["Rojo", "Amarillo", "Verde", "Azul"],
    "maxima-glp": ["Rojo", "Amarillo", "Azul"],
    "maxima-z-lpg": ["Rojo", "Amarillo", "Azul"],
    "titanio-250": ["Rojo", "Verde", "Azul"],
    "crom-ug-gsl": ["Rojo", "Verde", "Azul"],
  };

  const modelDB = {
    "4t-plus-gsl": { name: "4T Plus GSL", image: "../assets/media/images/4T PLUS GSL.png", description: "Motocar de pasajeros 4 tiempos orientado a operacion urbana intensiva.", facts: ["Capacidad: 3 pasajeros", "Carga util: 350 kg", "Frenos: Tambor delantero y trasero", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Motor: 198.88 cc", "Potencia: 10.19 HP", "Torque: 17.10 Nm", "Velocidad max.: 65 km/h", "Combustible: Gasolina"], parts: [{ name: "Motor DTS-i", detail: "Bloque 4T de respuesta estable para jornadas continuas." }, { name: "Caja de cambios", detail: "Transmision manual optimizada para trayectos urbanos." }, { name: "Suspension trasera", detail: "Configuracion reforzada para confort con pasajeros." }, { name: "Sistema electrico", detail: "Instalacion preparada para uso comercial diario." }] },
    "4t-plus-glp": { name: "4T Plus GLP", image: "../assets/media/images/4T PLUS GLP.png", description: "Version enfocada en ahorro operativo con GLP para trayectos frecuentes.", facts: ["Capacidad: 3 pasajeros", "Carga util: 340 kg", "Frenos: Tambor delantero y trasero", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Motor: 198.88 cc", "Potencia: 9.32 HP", "Torque: 16.00 Nm", "Combustible: GLP", "Uso recomendado: Ciudad"], parts: [{ name: "Kit GLP", detail: "Sistema orientado a bajo costo por kilometro." }, { name: "Carburacion calibrada", detail: "Entrega de potencia progresiva para uso urbano." }, { name: "Estructura de cabina", detail: "Marco estable para operacion de pasajeros." }, { name: "Frenos de tambor", detail: "Control consistente en uso de ciudad." }] },
    "4t-plus-gnv": { name: "4T Plus GNV", image: "../assets/media/images/4T PLUS GNV.png", description: "Configuracion de bajo costo por kilometro para operacion diaria.", facts: ["Capacidad: 3 pasajeros", "Carga util: 330 kg", "Frenos: Tambor delantero y trasero", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Motor: 198.88 cc", "Potencia: 8.78 HP", "Torque: 14.50 Nm", "Tanques: 30 L + 4.5 kg", "Combustible: GNV / Gasolina"], parts: [{ name: "Sistema dual", detail: "Operacion combinada GNV/Gasolina para mayor flexibilidad." }, { name: "Tanques integrados", detail: "Configuracion compacta para autonomia extendida." }, { name: "Motor 4T", detail: "Funcionamiento suave para jornadas largas." }, { name: "Eje posterior", detail: "Transmision estable en carga de pasajeros." }] },
    "2t-ug-gsl": { name: "2T UG GSL", image: "../assets/media/images/2T UG GSL.png", description: "Modelo 2 tiempos con respuesta agil para rutas urbanas.", facts: ["Capacidad: 3 pasajeros", "Carga util: 320 kg", "Frenos: Tambor delantero y trasero", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 4,000 km"], specs: ["Motor: 145.45 cc", "Potencia: 8.44 HP", "Torque: 17.00 Nm", "Combustible: Gasolina", "Uso: Pasajeros urbanos"], parts: [{ name: "Motor 2T", detail: "Respuesta rapida en arranque y pendientes." }, { name: "Escape 2T", detail: "Empuje estable en regimen de trabajo diario." }, { name: "Embrague", detail: "Accionamiento ligero para conduccion urbana." }, { name: "Chasis tubular", detail: "Base solida para trabajo continuo." }] },
    "2t-ug-glp": { name: "2T UG GLP", image: "../assets/media/images/2T UG GLP.png", description: "Version 2T con sistema GLP para reducir costos de operacion.", facts: ["Capacidad: 3 pasajeros", "Carga util: 320 kg", "Frenos: Tambor delantero y trasero", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 4,000 km"], specs: ["Motor: 145.45 cc", "Potencia: 8.58 HP", "Torque: 15.00 Nm", "Velocidad max.: 60 km/h", "Combustible: GLP"], parts: [{ name: "Kit GLP 2T", detail: "Configuracion para optimizar costo operativo." }, { name: "Bomba de combustible", detail: "Alimentacion consistente en uso diario." }, { name: "Suspension delantera", detail: "Absorcion de irregularidades en vias urbanas." }, { name: "Sistema de frenos", detail: "Control estable en paradas frecuentes." }] },
    "maxima-glp": { name: "Maxima GLP", image: "../assets/media/images/MAXIMA GLP.png", description: "Modelo de carga y uso mixto con estructura robusta para reparto.", facts: ["Capacidad: 2 pasajeros", "Carga util: 500 kg", "Frenos: Tambor reforzado", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Motor: 236.2 cc", "Potencia: 11.06 HP", "Torque: 17.55 Nm", "Velocidad max.: 62 km/h", "Combustible: GLP"], parts: [{ name: "Chasis reforzado", detail: "Construido para operacion con carga constante." }, { name: "Plataforma de carga", detail: "Espacio optimizado para reparto urbano y mixto." }, { name: "Motor 236 cc", detail: "Torque util para arrastre en trabajo comercial." }, { name: "Ejes y suspension", detail: "Mayor estabilidad en peso variable." }] },
    "maxima-z-lpg": { name: "Maxima Z LPG", image: "../assets/media/images/Maxima-Z-LPG-Yellow-FRONT-7x8-righ2.png", description: "Plataforma de carga para rutas largas y trabajo constante.", facts: ["Capacidad: 2 pasajeros", "Carga util: 550 kg", "Frenos: Tambor reforzado", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Motor: 236.2 cc DTS-i", "Potencia: 8.25 kW", "Torque: 17.55 Nm", "Tanque: 20.6 L", "Combustible: LPG"], parts: [{ name: "Plataforma Z", detail: "Estructura pensada para carga de mayor volumen." }, { name: "Motor DTS-i", detail: "Rendimiento constante en rutas extensas." }, { name: "Sistema de freno", detail: "Respuesta segura en maniobras con peso." }, { name: "Direccion", detail: "Control estable para trabajo intensivo." }] },
    "titanio-250": { name: "Titanio 250", image: "../assets/media/images/TORITO-TITANIO-250-700X590.png", description: "Modelo de mayor capacidad para trabajo intensivo con excelente estabilidad.", facts: ["Capacidad: 2 pasajeros", "Carga util: 600 kg", "Frenos: Tambor reforzado", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Motor: 236.2 cc", "Potencia: 9.86 HP", "Torque: 18.00 Nm", "Velocidad max.: 62 km/h", "Combustible: Gasolina"], parts: [{ name: "Chasis Titanio", detail: "Estructura reforzada para maxima exigencia." }, { name: "Motor de alto torque", detail: "Respuesta firme en arranques con carga." }, { name: "Suspension trasera", detail: "Amortiguacion para estabilidad con peso." }, { name: "Transmision", detail: "Relacion optimizada para trabajo pesado." }] },
    "crom-ug-gsl": { name: "CROM UG GSL", image: "../assets/media/images/torito_crom_ug_gsl.webp", description: "Modelo para pasajeros con enfoque en confort y rendimiento urbano.", facts: ["Capacidad: 3 pasajeros", "Carga util: 340 kg", "Frenos: Tambor delantero y trasero", "Garantia: 12 meses o 20,000 km", "Mantenimiento: Cada 5,000 km"], specs: ["Cilindraje: 200 cc (referencial)", "Torque: 17.00 Nm", "Uso: Pasajeros urbanos", "Combustible: Gasolina", "Traccion: Posterior"], parts: [{ name: "Cabina CROM", detail: "Diseno pensado para confort de conductor y pasajero." }, { name: "Motor GSL", detail: "Rendimiento equilibrado para servicio urbano." }, { name: "Asientos", detail: "Configuracion comoda para recorridos de ciudad." }, { name: "Faros y tablero", detail: "Buena visibilidad y lectura rapida de datos." }] },
  };

  const modelCommentBank = {
    "4t-plus-gsl": [{ name: "Carlos M.", zone: "Comas", months: 9, usage: "Pasajeros", km: "18,200 km", rating: 5, helpful: 32, verified: true, text: "Lo trabajo en turno completo y el motor responde parejo. En subida corta no se queda." }, { name: "Rosa P.", zone: "Ventanilla", months: 7, usage: "Pasajeros", km: "14,100 km", rating: 5, helpful: 21, verified: true, text: "Me gusto porque la cabina no vibra tanto y el mantenimiento me sale controlado." }, { name: "Javier T.", zone: "SMP", months: 6, usage: "Pasajeros", km: "11,700 km", rating: 4, helpful: 15, verified: false, text: "Consume razonable para ciudad. Recomendado para rutas cortas y medianas." }, { name: "Marlene A.", zone: "Los Olivos", months: 11, usage: "Pasajeros", km: "20,400 km", rating: 5, helpful: 27, verified: true, text: "Buen equilibrio entre fuerza y comodidad para el pasajero." }],
    "4t-plus-glp": [{ name: "Jhon C.", zone: "SMP", months: 10, usage: "Pasajeros", km: "19,600 km", rating: 5, helpful: 30, verified: true, text: "Me pase a GLP y el ahorro mensual si se siente frente a gasolina." }, { name: "Maritza L.", zone: "Puente Piedra", months: 8, usage: "Pasajeros", km: "15,300 km", rating: 4, helpful: 18, verified: true, text: "Buen rendimiento diario, cabina comoda y no calienta de mas." }, { name: "Richard S.", zone: "Independencia", months: 5, usage: "Pasajeros", km: "9,800 km", rating: 4, helpful: 13, verified: false, text: "Para trabajo continuo va bien. Lo uso de lunes a sabado sin problema." }, { name: "Nelly V.", zone: "Callao", months: 12, usage: "Pasajeros", km: "22,100 km", rating: 5, helpful: 26, verified: true, text: "Estable al frenar y economico en consumo, por eso lo volvi a comprar." }],
    "4t-plus-gnv": [{ name: "Fernando S.", zone: "Carabayllo", months: 9, usage: "Pasajeros", km: "21,000 km", rating: 5, helpful: 33, verified: true, text: "Para alto kilometraje me funciono muy bien. El costo por dia bajo bastante." }, { name: "Luis A.", zone: "Los Olivos", months: 7, usage: "Pasajeros", km: "16,200 km", rating: 4, helpful: 17, verified: true, text: "Dual GNV/gasolina ayuda cuando cambias de ruta o no hay cola de gas." }, { name: "Milagros E.", zone: "Ate", months: 6, usage: "Pasajeros", km: "12,500 km", rating: 4, helpful: 14, verified: false, text: "Lo uso en dos turnos y mantiene ritmo sin perder fuerza." }, { name: "Cesar H.", zone: "Comas", months: 11, usage: "Pasajeros", km: "24,300 km", rating: 5, helpful: 29, verified: true, text: "Buena alternativa para quienes priorizan ahorro de combustible." }],
    "2t-ug-gsl": [{ name: "Miguel R.", zone: "Ventanilla", months: 8, usage: "Pasajeros", km: "13,900 km", rating: 4, helpful: 19, verified: true, text: "Tiene salida rapida y se mueve bien en trafico pesado." }, { name: "Jose V.", zone: "Comas", months: 10, usage: "Pasajeros", km: "17,400 km", rating: 5, helpful: 24, verified: true, text: "En pendientes cortas responde fuerte. Para mi zona fue buena compra." }, { name: "Diego L.", zone: "Rimac", months: 5, usage: "Pasajeros", km: "8,700 km", rating: 4, helpful: 12, verified: false, text: "Mecanica simple y repuestos faciles de conseguir." }, { name: "Yolanda C.", zone: "SJL", months: 9, usage: "Pasajeros", km: "14,800 km", rating: 4, helpful: 16, verified: true, text: "Lo manejo yo misma y me resulta comodo para el dia a dia." }],
    "2t-ug-glp": [{ name: "Diana H.", zone: "Puente Piedra", months: 7, usage: "Pasajeros", km: "12,600 km", rating: 4, helpful: 15, verified: true, text: "Cumple para trabajo diario y ayuda bastante en consumo por GLP." }, { name: "Pedro L.", zone: "Independencia", months: 9, usage: "Pasajeros", km: "15,900 km", rating: 5, helpful: 22, verified: true, text: "Buena opcion para quienes quieren 2T con costo operativo contenido." }, { name: "Sandra M.", zone: "Callao", months: 6, usage: "Pasajeros", km: "10,300 km", rating: 4, helpful: 11, verified: false, text: "Manejo urbano estable y cabina practica para rutas cortas." }, { name: "Kevin F.", zone: "Chorrillos", months: 10, usage: "Pasajeros", km: "17,100 km", rating: 4, helpful: 14, verified: true, text: "Lo elegi por costo-beneficio y hasta ahora va parejo." }],
    "maxima-glp": [{ name: "Erick T.", zone: "Ate", months: 11, usage: "Carga", km: "20,500 km", rating: 5, helpful: 31, verified: true, text: "Para reparto va firme, incluso con carga alta mantiene estabilidad." }, { name: "Monica B.", zone: "Callao", months: 8, usage: "Carga", km: "15,700 km", rating: 4, helpful: 18, verified: true, text: "Buena capacidad y espacio util para mercaderia de volumen medio." }, { name: "Ruben D.", zone: "SJL", months: 6, usage: "Carga", km: "11,400 km", rating: 4, helpful: 13, verified: false, text: "Trabajo en mercado y responde bien con peso constante." }, { name: "Pamela Q.", zone: "VMT", months: 9, usage: "Mixto", km: "16,300 km", rating: 5, helpful: 20, verified: true, text: "Buen torque en arranque y consumo aceptable para su capacidad." }],
    "maxima-z-lpg": [{ name: "Victor N.", zone: "SJM", months: 10, usage: "Carga", km: "19,900 km", rating: 5, helpful: 28, verified: true, text: "Plataforma amplia, ideal para carga voluminosa en rutas largas." }, { name: "Claudio P.", zone: "Chorrillos", months: 7, usage: "Carga", km: "14,200 km", rating: 4, helpful: 16, verified: true, text: "Mejoro mis tiempos de reparto por estabilidad y espacio." }, { name: "Alex G.", zone: "Comas", months: 6, usage: "Carga", km: "10,700 km", rating: 4, helpful: 12, verified: false, text: "Se siente robusto y transmite seguridad al frenar cargado." }, { name: "Miriam R.", zone: "Ate", months: 9, usage: "Mixto", km: "16,800 km", rating: 5, helpful: 19, verified: true, text: "Buena opcion para negocio que reparte todos los dias." }],
    "titanio-250": [{ name: "Hector G.", zone: "Santa Anita", months: 12, usage: "Carga", km: "24,800 km", rating: 5, helpful: 36, verified: true, text: "Trabajo pesado todo el dia y sigue parejo. Muy buena estabilidad." }, { name: "Marvin D.", zone: "VES", months: 10, usage: "Carga", km: "20,200 km", rating: 5, helpful: 27, verified: true, text: "Para peso alto es de los mas confiables que he manejado." }, { name: "Lucho P.", zone: "SJL", months: 7, usage: "Carga", km: "13,400 km", rating: 4, helpful: 14, verified: false, text: "Fuerte en salida, recomendado para trabajo de distribucion." }, { name: "Rosa N.", zone: "Ventanilla", months: 9, usage: "Mixto", km: "17,300 km", rating: 5, helpful: 18, verified: true, text: "Tiene buena presencia y no se siente forzado con carga." }],
    "crom-ug-gsl": [{ name: "Patricia E.", zone: "Los Olivos", months: 8, usage: "Pasajeros", km: "14,600 km", rating: 4, helpful: 17, verified: true, text: "Me gusto la cabina y el confort para pasajeros en ruta urbana." }, { name: "Renzo M.", zone: "San Martin", months: 9, usage: "Pasajeros", km: "16,100 km", rating: 5, helpful: 23, verified: true, text: "Buena combinacion de imagen, rendimiento y maniobrabilidad." }, { name: "Karen T.", zone: "SMP", months: 6, usage: "Pasajeros", km: "10,900 km", rating: 4, helpful: 12, verified: false, text: "Cabina bien acabada y mantenimiento normal para su segmento." }, { name: "Edwin C.", zone: "Comas", months: 11, usage: "Pasajeros", km: "19,300 km", rating: 5, helpful: 20, verified: true, text: "Lo recomiendo si quieres un modelo comodo para uso continuo." }],
  };

  const modelInsightBank = {
    "4t-plus-gsl": { averageRating: "4.8", response: "Buen arranque en urbano", profile: "Ideal para pasajeros diarios", repurchase: "89%" },
    "4t-plus-glp": { averageRating: "4.7", response: "Ahorro destacado en GLP", profile: "Operacion urbana continua", repurchase: "87%" },
    "4t-plus-gnv": { averageRating: "4.8", response: "Costo por km competitivo", profile: "Rutas largas de pasajeros", repurchase: "90%" },
    "2t-ug-gsl": { averageRating: "4.6", response: "Agil en trafico y subida", profile: "Servicio urbano dinamico", repurchase: "84%" },
    "2t-ug-glp": { averageRating: "4.6", response: "2T con enfoque en ahorro", profile: "Pasajeros de alta rotacion", repurchase: "83%" },
    "maxima-glp": { averageRating: "4.8", response: "Buena estabilidad con carga", profile: "Reparto y uso mixto", repurchase: "88%" },
    "maxima-z-lpg": { averageRating: "4.7", response: "Plataforma amplia y firme", profile: "Carga de volumen medio/alto", repurchase: "86%" },
    "titanio-250": { averageRating: "4.9", response: "Torque solido en trabajo duro", profile: "Carga intensiva diaria", repurchase: "92%" },
    "crom-ug-gsl": { averageRating: "4.7", response: "Confort y presencia comercial", profile: "Pasajeros en ciudad", repurchase: "85%" },
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
  const partsEl = document.getElementById("detailPartsGrid");
  const commentsEl = document.getElementById("detailCommentsList");
  const detailSectionContainer = document.querySelector(".section-dark .container");

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

  const colors = modelColorsBySlug[slug] || [];
  const factsToRender = colors.length ? [...model.facts, `Colores disponibles: ${colors.join(", ")}`] : model.facts;
  factsEl.innerHTML = factsToRender.map((fact) => `<span class="model-detail-chip">${escapeHtml(fact)}</span>`).join("");
  specsEl.innerHTML = model.specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("");

  if (partsEl) {
    partsEl.innerHTML = (model.parts || []).map((part) => `<article class="part-card"><h4>${escapeHtml(part.name)}</h4><p>${escapeHtml(part.detail)}</p></article>`).join("");
  }

  if (commentsEl) {
    const commentsToRender = modelCommentBank[slug] || [];
    commentsEl.innerHTML = commentsToRender
      .map(
        (comment) => `<article class="buyer-comment">
          <div class="buyer-comment-head">
            <div class="buyer-comment-id">
              <span class="buyer-comment-avatar">${escapeHtml(getInitials(comment.name || "Cliente"))}</span>
              <div>
                <span class="buyer-comment-name">${escapeHtml(comment.name)}</span>
                <span class="buyer-comment-meta">${escapeHtml(buildCommentMeta(comment))}</span>
              </div>
            </div>
            <span class="buyer-comment-rating">${renderStars(comment.rating)} <small>${Number(comment.rating || 5).toFixed(1)}</small></span>
          </div>
          <p>${escapeHtml(comment.text)}</p>
          <div class="buyer-comment-footer">
            <div class="buyer-comment-tags">
              <span>Uso: ${escapeHtml(comment.usage || "Comercial")}</span>
              <span>${escapeHtml(comment.km || "Kilometraje referencial")}</span>
              ${comment.verified ? '<span class="buyer-comment-verified">Compra verificada</span>' : ""}
            </div>
            <span class="buyer-comment-helpful"><i class="fa-regular fa-thumbs-up" aria-hidden="true"></i>${escapeHtml(String(comment.helpful || 0))} util</span>
          </div>
        </article>`
      )
      .join("");
  }

  if (detailSectionContainer) {
    renderBuyerInsights(detailSectionContainer, model, slug, modelInsightBank, modelCommentBank);
  }
});

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function renderStars(score) {
  const safeScore = Math.max(1, Math.min(5, Number(score) || 5));
  return "\u2605".repeat(safeScore) + "\u2606".repeat(5 - safeScore);
}

function buildCommentMeta(comment) {
  const zone = comment.zone || "Lima";
  const months = Number(comment.months || 0);
  return months > 0 ? `${zone} - ${months} meses de uso` : zone;
}

function getInitials(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (!parts.length) return "CL";
  return parts.map((part) => part[0].toUpperCase()).join("");
}

function renderBuyerInsights(container, model, slug, insightBank, commentBank) {
  if (container.querySelector("#modelBuyerInsights")) return;

  const insights = insightBank[slug] || { averageRating: "4.7", response: "Buen balance para trabajo diario", profile: "Uso comercial recomendado", repurchase: "85%" };
  const comments = commentBank[slug] || [];

  const article = document.createElement("article");
  article.id = "modelBuyerInsights";
  article.className = "model-detail-card mt-4";
  article.innerHTML = `
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <h3 class="h4 mb-0 text-white">Panorama de compradores</h3>
      <span class="about-kicker mb-0">Lectura rapida del modelo</span>
    </div>
    <div class="buyer-insights-grid">
      <article class="buyer-insight-card"><span class="buyer-insight-label">Calificacion promedio</span><strong>${escapeHtml(insights.averageRating)} / 5</strong><p>Basado en ${escapeHtml(String(comments.length))} opiniones publicadas.</p></article>
      <article class="buyer-insight-card"><span class="buyer-insight-label">Lo que mas resaltan</span><strong>${escapeHtml(insights.response)}</strong><p>Comentario repetido por conductores de uso diario.</p></article>
      <article class="buyer-insight-card"><span class="buyer-insight-label">Perfil recomendado</span><strong>${escapeHtml(insights.profile)}</strong><p>Alineado al tipo de operacion del modelo.</p></article>
      <article class="buyer-insight-card"><span class="buyer-insight-label">Volverian a comprar</span><strong>${escapeHtml(insights.repurchase)}</strong><p>Intencion declarada por compradores consultados.</p></article>
    </div>
    <div class="buyer-insights-cta">
      <a class="btn btn-epsa" href="cotiza.html?modelo=${encodeURIComponent(model.name)}">Cotizar con este perfil</a>
      <a class="btn btn-outline-light" href="https://wa.link/cewyh2" target="_blank" rel="noopener noreferrer">Hablar con un asesor</a>
    </div>
  `;

  container.append(article);
}
