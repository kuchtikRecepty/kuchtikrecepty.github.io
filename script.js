document.addEventListener('DOMContentLoaded', () => {
  // ====== Přepočet porcí – spustí se jen pokud na stránce existují potřebné prvky ======
  const minusBtn = document.getElementById('minusBtn');
  const plusBtn = document.getElementById('plusBtn');
  const pocetPorciSpan = document.getElementById('pocetPorci');
  const ingredientListItems = document.querySelectorAll('.ingredient-list li span[data-zaklad]');

  if (minusBtn && plusBtn && pocetPorciSpan && ingredientListItems.length > 0) {
    const initialPortions = 4;
    let currentPortions = initialPortions;

    function updateIngredientQuantities() {
      let porceText = (currentPortions === 1) ? 'porce' :
                      (currentPortions >= 2 && currentPortions <= 4) ? 'porce' : 'porcí';
      pocetPorciSpan.textContent = `${currentPortions} ${porceText}`;

      ingredientListItems.forEach(item => {
        const baseQuantity = parseFloat(item.dataset.zaklad);
        const unit = item.dataset.jednotka || '';

        if (!isNaN(baseQuantity)) {
          const newQuantity = (baseQuantity / initialPortions) * currentPortions;
          const formattedQuantity = (newQuantity % 1 === 0)
            ? newQuantity.toFixed(0)
            : newQuantity.toFixed(1);
          item.textContent = `${formattedQuantity} ${unit}`;
        }
      });
    }

    minusBtn.addEventListener('click', () => {
      if (currentPortions > 1) {
        currentPortions--;
        updateIngredientQuantities();
      }
    });

    plusBtn.addEventListener('click', () => {
      currentPortions++;
      updateIngredientQuantities();
    });

    updateIngredientQuantities();
  }

  // ====== Přidání do historie – funguje vždy, pokud existuje tlačítko ======
  const btn = document.getElementById("pridatDoHistorieBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const nazev = document.querySelector(".recipe-header h1")?.textContent?.trim() || "Neznámý recept";
      const dnes = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      let historie = JSON.parse(localStorage.getItem("varenaHistorie")) || {};
      if (!historie[dnes]) historie[dnes] = [];

      historie[dnes].push(nazev);
      localStorage.setItem("varenaHistorie", JSON.stringify(historie));

      alert(`Zaznamenáno: "${nazev}" jako uvařené dne ${dnes}`);
    });
  }
});
