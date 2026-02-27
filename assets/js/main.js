(() => {
  const scrollButton = document.querySelector(".scroll-up");
  if (!scrollButton) return;

  const toggleScrollButton = () => {
    scrollButton.style.display = window.scrollY > 280 ? "grid" : "none";
  };

  window.addEventListener("scroll", toggleScrollButton);
  toggleScrollButton();
})();

(() => {
  const swiperRoot = document.getElementById("homeModelSwiper");
  const swiperWrapper = document.getElementById("homeModelSwiperWrapper");
  if (!swiperRoot || !swiperWrapper) return;

  const models = [
    { slug: "4t-plus-gsl", name: "4T Plus GSL", image: "assets/media/images/4T PLUS GSL.png", power: "10.19 HP", torque: "17.10 Nm", fuel: "Gasolina", load: "350 kg", colors: ["Rojo", "Verde", "Azul"] },
    { slug: "4t-plus-glp", name: "4T Plus GLP", image: "assets/media/images/4T PLUS GLP.png", power: "9.32 HP", torque: "16.00 Nm", fuel: "GLP", load: "340 kg", colors: ["Rojo", "Verde", "Azul"] },
    { slug: "4t-plus-gnv", name: "4T Plus GNV", image: "assets/media/images/4T PLUS GNV.png", power: "8.78 HP", torque: "14.50 Nm", fuel: "GNV / Gasolina", load: "330 kg", colors: ["Rojo", "Verde", "Azul"] },
    { slug: "2t-ug-gsl", name: "2T UG GSL", image: "assets/media/images/2T UG GSL.png", power: "8.44 HP", torque: "17.00 Nm", fuel: "Gasolina", load: "320 kg", colors: ["Rojo", "Amarillo", "Verde", "Azul"] },
    { slug: "2t-ug-glp", name: "2T UG GLP", image: "assets/media/images/2T UG GLP.png", power: "8.58 HP", torque: "15.00 Nm", fuel: "GLP", load: "320 kg", colors: ["Rojo", "Amarillo", "Verde", "Azul"] },
    { slug: "maxima-glp", name: "Maxima GLP", image: "assets/media/images/MAXIMA GLP.png", power: "11.06 HP", torque: "17.55 Nm", fuel: "GLP", load: "500 kg", colors: ["Rojo", "Amarillo", "Azul"] },
    { slug: "maxima-z-lpg", name: "Maxima Z LPG", image: "assets/media/images/Maxima-Z-LPG-Yellow-FRONT-7x8-righ2.png", power: "8.25 kW", torque: "17.55 Nm", fuel: "LPG", load: "550 kg", colors: ["Rojo", "Amarillo", "Azul"] },
    { slug: "titanio-250", name: "Titanio 250", image: "assets/media/images/TORITO-TITANIO-250-700X590.png", power: "9.86 HP", torque: "18.00 Nm", fuel: "Gasolina", load: "600 kg", colors: ["Rojo", "Verde", "Azul"] },
    { slug: "crom-ug-gsl", name: "CROM UG GSL", image: "assets/media/images/torito_crom_ug_gsl.webp", power: "Referencial", torque: "17.00 Nm", fuel: "Gasolina", load: "340 kg", colors: ["Rojo", "Verde", "Azul"] },
  ];

  const buildSlide = (model, index) => `
    <div class="swiper-slide">
      <article class="ticker-model-card" aria-label="${escapeHtml(model.name)}" data-aos="zoom-in-up" data-aos-delay="${(index % 5) * 60}">
        <img class="ticker-model-image" src="${escapeHtml(model.image)}" alt="${escapeHtml(model.name)}" loading="lazy" decoding="async" />
        <div class="ticker-model-body">
          <div class="ticker-specs-grid">
            <div class="ticker-specs-main">
              <h3 class="ticker-model-title">${escapeHtml(model.name)}</h3>
              <ul class="ticker-model-list">
                <li><i class="fa-solid fa-bolt" aria-hidden="true"></i><span>Potencia: ${escapeHtml(model.power)}</span></li>
                <li><i class="fa-solid fa-gauge-high" aria-hidden="true"></i><span>Torque: ${escapeHtml(model.torque)}</span></li>
                <li><i class="fa-solid fa-gas-pump" aria-hidden="true"></i><span>Combustible: ${escapeHtml(model.fuel)}</span></li>
                <li><i class="fa-solid fa-box-open" aria-hidden="true"></i><span>Carga útil: ${escapeHtml(model.load)}</span></li>
                <li>
                  <i class="fa-solid fa-palette" aria-hidden="true"></i>
                  <span class="ticker-color-line">
                    <span>Colores:</span>
                    ${renderColorSwatchesMarkup(model.colors || [])}
                  </span>
                </li>
              </ul>
            </div>
            <div class="ticker-specs-side">
              <a class="ticker-model-wa-float" href="https://wa.link/cewyh2" target="_blank" rel="noopener noreferrer" aria-label="Cotizar por WhatsApp">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="ticker-model-actions">
            <a class="ticker-model-btn" href="pages/modelo-${encodeURIComponent(model.slug)}.html">Ver más detalles</a>
            <a class="ticker-model-btn ticker-model-btn-primary" href="pages/cotiza.html?modelo=${encodeURIComponent(model.name)}">Cotizar</a>
          </div>
        </div>
      </article>
    </div>
  `;

  swiperWrapper.innerHTML = models.map(buildSlide).join("");
  if (!window.Swiper) return;

  new window.Swiper(swiperRoot, {
    loop: true,
    speed: 5200,
    spaceBetween: 16,
    grabCursor: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".model-showcase-next",
      prevEl: ".model-showcase-prev",
    },
    pagination: {
      el: ".model-showcase-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1.05 },
      768: { slidesPerView: 2.05 },
      1200: { slidesPerView: 3.05 },
    },
  });
})();

(() => {
  if (!window.AOS) return;
  window.AOS.init({
    duration: 700,
    once: true,
    offset: 90,
    easing: "ease-out-cubic",
  });
})();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderColorSwatchesMarkup(colors) {
  if (!colors.length) return '<span class="color-swatch-empty">Por confirmar</span>';

  return `<span class="color-swatch-list">${colors
    .map((color) => {
      const token = getColorToken(color);
      return `<span class="color-swatch color-swatch-${token}" title="${escapeHtml(color)}" aria-label="${escapeHtml(color)}"></span>`;
    })
    .join("")}</span>`;
}

function getColorToken(colorName) {
  const normalized = String(colorName).toLowerCase();
  if (normalized.includes("rojo")) return "red";
  if (normalized.includes("azul")) return "blue";
  if (normalized.includes("verde")) return "green";
  if (normalized.includes("amarillo")) return "yellow";
  return "neutral";
}



