let items = []; // Liste des articles

function addItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const itemWeight = parseFloat(document.getElementById("itemWeight").value);
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);
  const errorMessage = document.getElementById("errorMessage");

  // Validation des entrées
  if (!itemName || isNaN(itemWeight) || isNaN(itemPrice)) {
    errorMessage.textContent = "Veuillez remplir tous les champs correctement.";
    return;
  }

  if (itemWeight <= 0 || itemPrice <= 0) {
    errorMessage.textContent =
      "Le poids et le prix doivent être des valeurs positives.";
    return;
  }

  errorMessage.textContent = "";

  const newItem = { name: itemName, weight: itemWeight, price: itemPrice };
  items.push(newItem);

  document.getElementById("itemName").value = "";
  document.getElementById("itemWeight").value = "";
  document.getElementById("itemPrice").value = "";

  updateTable();
}

function updateTable() {
  const tableBody = document.getElementById("itemsTable");
  tableBody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.weight} kg</td>
      <td>${item.price} </td>
      <td>
        <button onclick="editItem(${index})">Éditer</button>
        <button onclick="removeItem(${index})">Supprimer</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  updateTable();
}

function editItem(index) {
  const item = items[index];

  document.getElementById("itemName").value = item.name;
  document.getElementById("itemWeight").value = item.weight;
  document.getElementById("itemPrice").value = item.price;

  removeItem(index);
}

function optimize() {
  const capacity = parseFloat(document.getElementById("capacity").value);
  const resultContent = document.getElementById("resultContent");
  const errorMessage = document.getElementById("errorMessage");

  // Validation des entrées
  if (items.length === 0) {
    errorMessage.textContent =
      "Veuillez sélectionner au moins un article avant de vérifier.";
    return;
  }

  if (isNaN(capacity) || capacity <= 0) {
    errorMessage.textContent =
      "Veuillez entrer une capacité de chariot valide.";
    return;
  }

  errorMessage.textContent = "";

  resultContent.innerHTML = "";

  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { weight, price } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + price);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let w = capacity;
  const selectedItems = [];
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(items[i - 1]);
      w -= items[i - 1].weight;
    }
  }

  // Afficher les résultats sous forme de tableau
  if (selectedItems.length > 0) {
    const totalValue = dp[n][capacity];
    const complexityProduct = n * capacity;
    const complexity = `O(n × W) = O(${n} × ${capacity}) = O(${complexityProduct})`;

    let tableHTML = `
      <p>Gain total : <strong>${totalValue} </strong></p>
      <p>Complexité    : <strong>${complexity}</strong></p>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Poids (kg)</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          ${selectedItems
            .map(
              (item) =>
                `<tr>
                  <td>${item.name}</td>
                  <td>${item.weight}</td>
                  <td>${item.price}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;

    resultContent.innerHTML = tableHTML;
  } else {
    resultContent.innerHTML = "<p>Aucun article sélectionné.</p>";
  }

  document.getElementById("resultModal").style.display = "block";
}

function closeModal() {
  document.getElementById("resultModal").style.display = "none";
}
