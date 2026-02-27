document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll(".js-credit-quote")];
  if (!sections.length) return;

  const annualEffectiveRate = 0.54;
  const monthlyRate = Math.pow(1 + annualEffectiveRate, 1 / 12) - 1;

  const pricesByModel = {
    "4T Plus GSL": 16199,
    "4T Plus GLP": 16199,
    "4T Plus GNV": 16199,
    "2T UG GSL": 11499,
    "2T UG GLP": 13389,
    "Maxima GLP": 16999,
    "Maxima Z LPG": 16999,
    "Titanio 250": 16999,
    "CROM UG GSL": 16199,
  };

  sections.forEach((section) => {
    const modelInput = section.querySelector(".js-credit-model");
    const priceInput = section.querySelector(".js-credit-price");
    const initialPctInput = section.querySelector(".js-credit-initial-pct");
    const initialPctValue = section.querySelector(".js-credit-initial-pct-value");
    const termInput = section.querySelector(".js-credit-term");

    const paymentOutput = section.querySelector(".js-credit-payment");
    const initialAmountOutput = section.querySelector(".js-credit-initial-amount");
    const financedOutput = section.querySelector(".js-credit-financed");
    const totalOutput = section.querySelector(".js-credit-total");
    const interestOutput = section.querySelector(".js-credit-interest");

    if (!modelInput || !priceInput || !initialPctInput || !termInput) return;

    const update = () => {
      const modelName = String(modelInput.value || "");
      const price = pricesByModel[modelName] || 0;
      const initialPct = Number(initialPctInput.value || 0);
      const terms = Number(termInput.value || 6);

      const initialAmount = (price * initialPct) / 100;
      const financedAmount = Math.max(price - initialAmount, 0);
      const payment =
        financedAmount > 0
          ? (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -terms))
          : 0;
      const total = initialAmount + payment * terms;
      const interest = Math.max(total - price, 0);

      priceInput.value = formatCurrency(price);
      if (initialPctValue) initialPctValue.textContent = `${initialPct}%`;

      if (paymentOutput) paymentOutput.textContent = formatCurrency(payment);
      if (initialAmountOutput) initialAmountOutput.textContent = formatCurrency(initialAmount);
      if (financedOutput) financedOutput.textContent = formatCurrency(financedAmount);
      if (totalOutput) totalOutput.textContent = formatCurrency(total);
      if (interestOutput) interestOutput.textContent = formatCurrency(interest);
    };

    modelInput.addEventListener("change", update);
    initialPctInput.addEventListener("input", update);
    termInput.addEventListener("change", update);
    update();
  });
});

function formatCurrency(amount) {
  return `S/ ${Number(amount || 0).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
