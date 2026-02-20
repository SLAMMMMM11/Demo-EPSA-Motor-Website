document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
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

  const surveyModalEl = document.getElementById("modelSurveyModal");
  const surveyModal = window.bootstrap && surveyModalEl
    ? new window.bootstrap.Modal(surveyModalEl, {
        backdrop: "static",
        keyboard: false,
      })
    : null;

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
    const facts = collectModelFacts(item);

    renderFactsInCard(card, facts);

    return {
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
      facts,
      quoteHref: "cotiza.html",
    };
  };

  const models = modelItems.map(parseModelData);

  const filterModels = (value) => {
    modelItems.forEach((item) => {
      const visible = value === "all" || item.classList.contains(value);
      item.classList.toggle("d-none", !visible);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterModels(button.dataset.filter || "all");
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

  // Sondeo al ingresar.
  if (surveyModal) {
    surveyModal.show();
  }
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
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
