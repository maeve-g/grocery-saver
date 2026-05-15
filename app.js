const products = {
  "Carrots (1kg)": [
    { store: "Aldi", price: 2.09 },
    { store: "Woolworths", price: 1.70 },
    { store: "Coles", price: 1.70 },
  ],

  "Tasty Cheese Block (250g)": [
    { store: "Aldi", price: 4.99 },
    { store: "Woolworths", price: 6.00 },
    { store: "Coles", price: 6.00 },
  ],

  "Bananas (Cavendish per kg)": [
    { store: "Aldi", price: 3.99 },
    { store: "Woolworths", price: 3.99 },
    { store: "Coles", price: 4.50 },
  ],

  "Hass Avocado Each": [
    { store: "Aldi", price: 1.99 },
    { store: "Woolworths", price: 2.50 },
    { store: "Coles", price: 2.20 },
  ]
};

const productCards = document.getElementById("productCards");
const priceContainer = document.getElementById("prices");
const productName = document.getElementById("productName");
const bestDeal = document.getElementById("bestDeal");

let activeProduct = Object.keys(products)[0];

// BUILD PRODUCT SELECTION UI
function buildSelector() {
  productCards.innerHTML = "";

  Object.keys(products).forEach((name) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.textContent = name;

    if (name === activeProduct) div.classList.add("active");

    div.onclick = () => {
      activeProduct = name;
      renderProduct(name);
      buildSelector();
    };

    productCards.appendChild(div);
  });
}

// RENDER PRICES
function renderProduct(name) {
  const data = products[name];

  productName.textContent = name;
  priceContainer.innerHTML = "";

  let cheapestPrice = Math.min(...data.map(item => item.price));

  // find all stores with lowest price (handles ties)
  let cheapestStores = data.filter(item => item.price === cheapestPrice);

  data.forEach((item) => {
    const row = document.createElement("div");
    row.className = "price-row";

    // highlight cheapest rows 
    const isCheapest = item.price === cheapestPrice;

    row.innerHTML = `
      <span>
        ${item.store}
        ${isCheapest ? "🏆" : ""}
      </span>
      <span>$${item.price.toFixed(2)}</span>
    `;

    if (isCheapest) {
      row.style.border = "1px solid #22c55e";
      row.style.background = "rgba(34, 197, 94, 0.15)";
    }

    priceContainer.appendChild(row);
  });

  // BEST DEAL DISPLAY 
  if (cheapestStores.length === 1) {
    bestDeal.textContent =
      `🏆 Best deal: ${cheapestStores[0].store} - $${cheapestPrice.toFixed(2)}`;
  } else {
    bestDeal.textContent =
      `🏆 Best deals (tie): ` +
      cheapestStores.map(s => s.store).join(" + ") +
      ` - $${cheapestPrice.toFixed(2)}`;
  }
}
// RANDOM PRODUCT
function randomProduct() {
  const keys = Object.keys(products);
  const random = keys[Math.floor(Math.random() * keys.length)];
  activeProduct = random;
  renderProduct(random);
  buildSelector();
}

// INIT
buildSelector();
renderProduct(activeProduct);

// BENEFITS
const benefits = [
  "Real supermarket pricing",
  "Compare instantly",
  "Save money weekly",
];

const grid = document.getElementById("benefits");

benefits.forEach((b) => {
  const div = document.createElement("div");
  div.className = "card-small";
  div.textContent = b;
  grid.appendChild(div);
});