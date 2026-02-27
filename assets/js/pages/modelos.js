document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const marketColorFilters = [...document.querySelectorAll(".market-color-filter")];
  const marketPriceFilters = [...document.querySelectorAll(".market-price-filter")];
  const modelItems = [...document.querySelectorAll(".filter-item")];
  const catalogSection = document.getElementById("catalogSection");
  const recommendationSection = document.getElementById("modelRecommendation");
  const surveyForm = document.getElementById("modelSurveyForm");
  const retrySurveyBtn = document.getElementById("retrySurveyBtn");
  const showCatalogBtn = document.getElementById("showCatalogBtn");

  const recommendationName = document.getElementById("recommendedModelName");
  const recommendationDescription = document.getElementById("recommendedModelDescription");
  const recommendationImage = document.getElementById("recommendedModelImage");
  const recommendationFacts = document.getElementById("recommendedModelFacts");
  const recommendationSpecs = document.getElementById("recommendedModelSpecs");
  const recommendationQuoteLink = document.getElementById("recommendedModelQuoteLink");

  const entryModalEl = document.getElementById("modelEntryModal");
  const entryModal = window.bootstrap && entryModalEl
    ? new window.bootstrap.Modal(entryModalEl, {
        backdrop: "static",
        keyboard: false,
      })
    : null;
  const openModelSurveyBtn = document.getElementById("openModelSurveyBtn");
  const openQuoteSimulatorBtn = document.getElementById("openQuoteSimulatorBtn");
  const openModelSurveyPageBtn = document.getElementById("openModelSurveyPageBtn");
  const openQuoteSurveyPageBtn = document.getElementById("openQuoteSurveyPageBtn");

  const surveyModalEl = document.getElementById("modelSurveyModal");
  const surveyModal = window.bootstrap && surveyModalEl
    ? new window.bootstrap.Modal(surveyModalEl, {
        backdrop: "static",
        keyboard: false,
      })
    : null;
  const quoteSurveyModalEl = document.getElementById("quoteSurveyModal");
  const quoteSurveyModal = window.bootstrap && quoteSurveyModalEl
    ? new window.bootstrap.Modal(quoteSurveyModalEl, {
        backdrop: "static",
        keyboard: false,
      })
    : null;

  let activeCategoryFilter = "all";

  const marketReferenceByModel = {
    "4T Plus GSL": { price: 16199, colors: ["Rojo", "Verde", "Azul"] },
    "4T Plus GLP": { price: 16199, colors: ["Rojo", "Verde", "Azul"] },
    "4T Plus GNV": { price: 16199, colors: ["Rojo", "Verde", "Azul"] },
    "2T UG GSL": { price: 11499, colors: ["Rojo", "Amarillo", "Verde", "Azul"] },
    "2T UG GLP": { price: 13389, colors: ["Rojo", "Amarillo", "Verde", "Azul"] },
    "Maxima GLP": { price: 16999, colors: ["Rojo", "Amarillo", "Azul"] },
    "Maxima Z LPG": { price: 16999, colors: ["Rojo", "Amarillo", "Azul"] },
    "Titanio 250": { price: 16999, colors: ["Rojo", "Verde", "Azul"] },
    "CROM UG GSL": { price: 16199, colors: ["Rojo", "Verde", "Azul"] },
  };

  const parseModelData = (item) => {
    const card = item.querySelector(".model-card-modern");
    const title = card?.querySelector("h3")?.textContent?.trim() || "";
    const description = card?.querySelector("p")?.textContent?.trim() || "";
    const image = card?.querySelector("img");
    const specs = [...(card?.querySelectorAll("ul li") || [])].map((li) => li.textContent.trim());
    const type = item.classList.contains("carga") ? "carga" : "pasajeros";
    const engine = item.classList.contains("2t") ? "2t" : "4t";
    const fuel = inferFuel(title, description, specs);
    const power = parsePowerHp(specs);
    const displacement = parseDisplacementCc(specs);
    const marketRef = marketReferenceByModel[title] || { price: 0, colors: [] };
    const facts = collectModelFacts(item);

    item.dataset.marketPrice = String(marketRef.price || 0);
    item.dataset.marketColors = marketRef.colors.join("|");

    renderCommercialMetaInCard(card, marketRef);
    renderFactsInCard(card, facts);
    enhanceCardActions(card, slugifyTitle(title), title);

    return {
      slug: slugifyTitle(title),
      title,
      description,
      imageSrc: image?.getAttribute("src") || "",
      imageAlt: image?.getAttribute("alt") || title,
      specs,
      type,
      engine,
      fuel,
      power,
      displacement,
      marketPrice: marketRef.price || 0,
      marketColors: marketRef.colors,
      facts,
      quoteHref: "cotiza.html",
    };
  };

  const models = modelItems.map(parseModelData);
  renderModelsShowcase(models);

  const passMarketFilters = (item) => {
    const selectedColors = marketColorFilters.filter((check) => check.checked).map((check) => check.value);
    const selectedPrice = marketPriceFilters.find((radio) => radio.checked)?.value || "all";
    const itemColors = String(item.dataset.marketColors || "")
      .split("|")
      .filter(Boolean);
    const itemPrice = Number(item.dataset.marketPrice || 0);

    const colorMatch = !selectedColors.length || selectedColors.some((color) => itemColors.includes(color));
    let priceMatch = true;
    if (selectedPrice !== "all") {
      const [minRaw, maxRaw] = selectedPrice.split("-");
      const min = Number(minRaw || 0);
      const max = Number(maxRaw || Number.MAX_SAFE_INTEGER);
      priceMatch = itemPrice >= min && itemPrice <= max;
    }

    return colorMatch && priceMatch;
  };

  const filterModels = () => {
    modelItems.forEach((item) => {
      const categoryMatch = activeCategoryFilter === "all" || item.classList.contains(activeCategoryFilter);
      const marketMatch = passMarketFilters(item);
      const visible = categoryMatch && marketMatch;
      item.classList.toggle("d-none", !visible);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeCategoryFilter = button.dataset.filter || "all";
      filterModels();
      showCatalogOnly();
    });
  });

  marketColorFilters.forEach((check) => {
    check.addEventListener("change", () => {
      filterModels();
      showCatalogOnly();
    });
  });

  marketPriceFilters.forEach((radio) => {
    radio.addEventListener("change", () => {
      filterModels();
      showCatalogOnly();
    });
  });

  const showCatalogOnly = () => {
    recommendationSection?.classList.add("d-none");
    catalogSection?.classList.remove("d-none");
  };

  const showRecommendation = (model) => {
    if (!model || !recommendationSection || !catalogSection) return;

    recommendationName.textContent = model.title;
    recommendationDescription.textContent = model.description;
    recommendationImage.src = model.imageSrc;
    recommendationImage.alt = model.imageAlt;
    recommendationQuoteLink.href = model.quoteHref;
    if (recommendationFacts) recommendationFacts.innerHTML = renderFactsHtml(model.facts);
    recommendationSpecs.innerHTML = model.specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("");

    catalogSection.classList.add("d-none");
    recommendationSection.classList.remove("d-none");
    recommendationSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  surveyForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(surveyForm);
    const answers = {
      usage: String(formData.get("usage") || ""),
      fuel: String(formData.get("fuel") || ""),
      priority: String(formData.get("priority") || ""),
    };

    const recommended = recommendModel(models, answers) || models[0];
    showRecommendation(recommended);
    surveyModal?.hide();
  });

  retrySurveyBtn?.addEventListener("click", () => {
    surveyForm?.reset();
    surveyModal?.show();
  });

  showCatalogBtn?.addEventListener("click", () => {
    showCatalogOnly();
  });

  openModelSurveyBtn?.addEventListener("click", () => {
    entryModal?.hide();
    surveyForm?.reset();
    surveyModal?.show();
  });

  openQuoteSimulatorBtn?.addEventListener("click", () => {
    entryModal?.hide();
    showCatalogOnly();
    quoteSurveyModal?.show();
  });

  openModelSurveyPageBtn?.addEventListener("click", () => {
    surveyForm?.reset();
    surveyModal?.show();
  });

  openQuoteSurveyPageBtn?.addEventListener("click", () => {
    showCatalogOnly();
    quoteSurveyModal?.show();
  });

  const sondeoParam = new URLSearchParams(window.location.search).get("sondeo");
  const openByShortcut = () => {
    if (sondeoParam === "modelo") {
      surveyForm?.reset();
      showCatalogOnly();
      surveyModal?.show();
      return true;
    }

    if (sondeoParam === "cuotas") {
      showCatalogOnly();
      quoteSurveyModal?.show();
      return true;
    }

    return false;
  };

  // Selector inicial al ingresar.
  if (!openByShortcut()) {
    if (entryModal) {
      entryModal.show();
    } else if (surveyModal) {
      surveyModal.show();
    }
  }

  // Estado inicial del catálogo con los filtros combinados.
  filterModels();
});

function collectModelFacts(item) {
  const facts = [
    { icon: "fa-users", label: "Capacidad", value: item.dataset.capacity || "" },
    { icon: "fa-box-open", label: "Carga útil", value: item.dataset.load || "" },
    { icon: "fa-gas-pump", label: "Consumo", value: item.dataset.consumption || "" },
    { icon: "fa-circle-stop", label: "Frenos", value: item.dataset.brakes || "" },
    { icon: "fa-shield-halved", label: "Garantía", value: item.dataset.warranty || "" },
    { icon: "fa-screwdriver-wrench", label: "Mantenimiento", value: item.dataset.maintenance || "" },
  ];

  return facts.filter((fact) => fact.value);
}

function renderFactsInCard(card, facts) {
  if (!card || !facts.length || card.querySelector(".model-facts-grid")) return;

  const description = card.querySelector(".model-content p");
  if (!description) return;

  const factsWrap = document.createElement("div");
  factsWrap.className = "model-facts-grid";
  factsWrap.innerHTML = renderFactsHtml(facts);
  description.insertAdjacentElement("afterend", factsWrap);
}

function enhanceCardActions(card, slug, title) {
  if (!card) return;

  const actions = card.querySelector(".model-actions");
  const quoteLink = actions?.querySelector("a.btn");
  const image = card.querySelector(".model-image");
  if (!actions || !quoteLink) return;

  makeImageClickable(card, image, slug, title);
  quoteLink.href = `cotiza.html?modelo=${encodeURIComponent(title)}`;

  if (actions.querySelector(".btn-model-detail")) return;

  const detailLink = document.createElement("a");
  detailLink.className = "btn btn-outline-light btn-model-detail";
  detailLink.href = `modelo-${encodeURIComponent(slug)}.html`;
  detailLink.textContent = "Ver detalles";

  actions.classList.add("has-two-actions");
  actions.append(detailLink);
}

function makeImageClickable(card, image, slug, title) {
  if (!card || !image || image.closest("a.model-image-link")) return;

  const detailHref = `modelo-${encodeURIComponent(slug)}.html`;
  const imageLink = document.createElement("a");
  imageLink.className = "model-image-link";
  imageLink.href = detailHref;
  imageLink.setAttribute("aria-label", `Ver detalles de ${title}`);

  image.replaceWith(imageLink);
  imageLink.append(image);
}

function renderFactsHtml(facts) {
  return facts
    .map(
      (fact) =>
        `<div class="fact-chip"><i class="fa-solid ${escapeHtml(fact.icon)}" aria-hidden="true"></i><span><strong>${escapeHtml(
          fact.label
        )}:</strong> ${escapeHtml(fact.value)}</span></div>`
    )
    .join("");
}

function renderCommercialMetaInCard(card, marketRef) {
  if (!card || card.querySelector(".model-commercial-meta")) return;

  const content = card.querySelector(".model-content");
  const specsList = content?.querySelector("ul");
  if (!content || !specsList) return;

  const priceText = marketRef.price ? `S/ ${marketRef.price.toLocaleString("es-PE")}` : "Precio por confirmar";
  const noFiberNote = marketRef.price ? '<small>*No incluye fibra</small>' : "";

  const meta = document.createElement("div");
  meta.className = "model-commercial-meta";
  meta.innerHTML = `
    <div class="model-price-badge">
      <span class="model-price-label">Precio referencial</span>
      <strong>${escapeHtml(priceText)}</strong>
      ${noFiberNote}
    </div>
    <div class="model-colors-inline">
      <span class="model-colors-label"><i class="fa-solid fa-palette" aria-hidden="true"></i>Colores</span>
      ${renderColorSwatchesMarkup(marketRef.colors || [])}
    </div>
  `;

  specsList.insertAdjacentElement("beforebegin", meta);
}

function renderModelsShowcase(models) {
  const swiperRoot = document.getElementById("modelsShowcaseSwiper");
  const swiperWrapper = document.getElementById("modelsShowcaseWrapper");
  if (!swiperRoot || !swiperWrapper || !models.length) return;

  swiperWrapper.innerHTML = models
    .map(
      (model, index) => `
      <div class="swiper-slide">
        <article class="models-showcase-card" data-aos="fade-up" data-aos-delay="${(index % 4) * 70}">
          <img src="${escapeHtml(model.imageSrc)}" alt="${escapeHtml(model.imageAlt)}" loading="lazy" decoding="async" />
          <div class="models-showcase-body">
            <h4>${escapeHtml(model.title)}</h4>
            <p>${escapeHtml(model.description)}</p>
            <div class="models-showcase-facts">
              <span><i class="fa-solid fa-bolt" aria-hidden="true"></i>${escapeHtml(model.specs[1] || "Potencia referencial")}</span>
              <span><i class="fa-solid fa-gas-pump" aria-hidden="true"></i>${escapeHtml(model.fuel[0]?.toUpperCase() || "Combustible")}</span>
              <span class="models-showcase-price"><i class="fa-solid fa-tag" aria-hidden="true"></i><strong>${model.marketPrice ? `S/ ${escapeHtml(
                model.marketPrice.toLocaleString("es-PE")
              )}` : "Precio referencial"}</strong><small>${model.marketPrice ? "*No incluye fibra" : ""}</small></span>
              <span class="models-showcase-colors"><i class="fa-solid fa-palette" aria-hidden="true"></i>${renderColorSwatchesMarkup(
                model.marketColors || []
              )}</span>
            </div>
            <div class="models-showcase-actions">
              <a href="modelo-${encodeURIComponent(model.slug)}.html">Ver más detalles</a>
              <a class="btn-quote" href="cotiza.html?modelo=${encodeURIComponent(model.title)}">Cotizar</a>
            </div>
          </div>
        </article>
      </div>
    `
    )
    .join("");

  if (window.Swiper) {
    new window.Swiper(swiperRoot, {
      loop: true,
      speed: 4600,
      spaceBetween: 14,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".models-showcase-next",
        prevEl: ".models-showcase-prev",
      },
      pagination: {
        el: ".models-showcase-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1.05 },
        768: { slidesPerView: 2.1 },
        1200: { slidesPerView: 2.8 },
      },
    });
  }
}

function recommendModel(models, answers) {
  if (!models.length) return null;

  let bestModel = models[0];
  let bestScore = Number.NEGATIVE_INFINITY;

  models.forEach((model) => {
    let score = 0;

    if (answers.usage && model.type === answers.usage) score += 5;
    else if (answers.usage) score -= 3;

    if (answers.fuel && answers.fuel !== "indiferente") {
      if (model.fuel.includes(answers.fuel)) score += 4;
      else score -= 2;
    }

    if (answers.priority === "economia") {
      if (model.fuel.includes("glp") || model.fuel.includes("gnv")) score += 3;
      if (model.displacement > 0 && model.displacement <= 200) score += 2;
    }

    if (answers.priority === "potencia") {
      score += model.power;
      if (model.displacement >= 230) score += 1;
    }

    if (answers.priority === "capacidad") {
      if (model.type === "carga") score += 4;
      if (model.displacement >= 230) score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestModel = model;
    }
  });

  return bestModel;
}

function inferFuel(title, description, specs) {
  const text = [title, description, ...specs].join(" ").toLowerCase();
  const found = [];
  if (text.includes("gnv")) found.push("gnv");
  if (text.includes("glp") || text.includes("lpg")) found.push("glp");
  if (text.includes("gasolina") || text.includes("gsl")) found.push("gasolina");
  return found.length ? found : ["gasolina"];
}

function parsePowerHp(specs) {
  for (const spec of specs) {
    const match = spec.match(/(\d+([.,]\d+)?)\s*HP/i);
    if (match) return Number(match[1].replace(",", "."));
  }
  return 0;
}

function parseDisplacementCc(specs) {
  for (const spec of specs) {
    const match = spec.match(/(\d+([.,]\d+)?)\s*cc/i);
    if (match) return Number(match[1].replace(",", "."));
  }
  return 0;
}

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

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
