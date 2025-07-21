// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Získáme reference na tlačítka a element pro zobrazení počtu porcí
    const minusBtn = document.getElementById('minusBtn');
    const plusBtn = document.getElementById('plusBtn');
    const pocetPorciSpan = document.getElementById('pocetPorci');

    // Získáme všechny <span> elementy v seznamu ingrediencí, které mají atribut data-zaklad
    const ingredientListItems = document.querySelectorAll('.ingredient-list li span[data-zaklad]');

    // Definujeme počáteční počet porcí, který je nastaven v HTML (4 porce)
    // Toto je klíčové pro správný přepočet ingrediencí.
    const initialPortions = 4;
    let currentPortions = initialPortions; // Aktuální počet porcí, začínáme na 4

    // Funkce pro aktualizaci množství ingrediencí na základě aktuálního počtu porcí
    function updateIngredientQuantities() {
        // Aktualizujeme zobrazený text počtu porcí s ohledem na českou gramatiku
        // 1 porce
        // 2, 3, 4 porce
        // 5 a více porcí
        let porceText;
        if (currentPortions === 1) {
            porceText = 'porce';
        } else if (currentPortions >= 2 && currentPortions <= 4) {
            porceText = 'porce';
        } else {
            porceText = 'porcí';
        }
        pocetPorciSpan.textContent = `${currentPortions} ${porceText}`;

        // Projdeme každý element ingredience, který má definované základní množství
        ingredientListItems.forEach(item => {
            const baseQuantity = parseFloat(item.dataset.zaklad); // Převedeme základní množství na číslo
            const unit = item.dataset.jednotka; // Získáme jednotku (např. "ks", "paličky česneku")

            // Zkontrolujeme, zda je základní množství platné číslo
            if (!isNaN(baseQuantity)) {
                // Vypočítáme nové množství pro aktuální počet porcí
                // (základní množství / původní porce) * aktuální porce
                const newQuantity = (baseQuantity / initialPortions) * currentPortions;

                // Formátujeme množství:
                // Pokud je to celé číslo (např. 1, 2, 3), zobrazíme bez desetinných míst.
                // Jinak zobrazíme s jedním desetinným místem.
                let formattedQuantity;
                if (newQuantity % 1 === 0) { // Kontrola, zda je číslo celé
                    formattedQuantity = newQuantity.toFixed(0);
                } else {
                    formattedQuantity = newQuantity.toFixed(1);
                }

                // Aktualizujeme text obsahu elementu ingredience
                item.textContent = `${formattedQuantity} ${unit}`;
            }
            // Ingredience bez atributu data-zaklad (jako "sůl (podle chuti)") zůstanou nezměněny, což je žádoucí.
        });
    }

    // Přidáme posluchač událostí pro tlačítko mínus
    minusBtn.addEventListener('click', () => {
        // Zabráníme snížení počtu porcí pod 1
        if (currentPortions > 1) {
            currentPortions--; // Snížíme počet porcí
            updateIngredientQuantities(); // Aktualizujeme množství ingrediencí
        }
    });

    // Přidáme posluchač událostí pro tlačítko plus
    plusBtn.addEventListener('click', () => {
        currentPortions++; // Zvýšíme počet porcí
        updateIngredientQuantities(); // Aktualizujeme množství ingrediencí
    });

    // Zavoláme funkci updateIngredientQuantities jednou při načtení stránky.
    // Tím zajistíme, že se ingredience správně zobrazí i při prvním načtení,
    // ačkoli jsou již pro 4 porce nastaveny v HTML. Je to dobrý zvyk pro konzistenci.
    updateIngredientQuantities();

const btn = document.getElementById("pridatDoHistorieBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    // Název receptu z nadpisu h1
    const nazev = document.querySelector(".recipe-header h1")?.textContent || "Neznámý recept";
    const dnes = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Načteme historii z localStorage nebo vytvoříme novou
    let historie = JSON.parse(localStorage.getItem("varenaHistorie")) || {};

    // Přidáme záznam do dnešního data
    if (!historie[dnes]) historie[dnes] = [];
    historie[dnes].push(nazev);

    // Uložíme zpět
    localStorage.setItem("varenaHistorie", JSON.stringify(historie));

    alert(`Zaznamenáno: "${nazev}" jako uvařené dne ${dnes}`);
  });

});