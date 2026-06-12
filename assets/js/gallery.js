const galleryGrid = document.querySelector("#galleryGrid");
const buttons = document.querySelectorAll(".tab-btn");

let galleryItems = [];

async function loadGallery() {
  const res = await fetch("data/gallery.json?v=20");
  galleryItems = await res.json();
  renderGallery("all");
}

function renderGallery(category) {
  const items = category === "all"
    ? galleryItems
    : galleryItems.filter(item => (item.category || "characters") === category);

  galleryGrid.innerHTML = items.map(item => `
    <article class="gallery-card">
      <img src="${item.image}" alt="${item.title || item.name}" loading="lazy">

      <h3>${item.title || item.name}</h3>

      ${item.isMap ? "" : `
        ${item.status ? `<p><strong>Status:</strong> ${item.status}</p>` : ""}
        ${item.age ? `<p><strong>Age:</strong> ${item.age}</p>` : ""}
        ${item.level ? `<p><strong>Level:</strong> ${item.level}</p>` : ""}
        ${item.stage ? `<p><strong>Stage:</strong> ${item.stage}</p>` : ""}
        ${item.potential ? `<p><strong>Potential:</strong> ${item.potential}</p>` : ""}
        ${item.combatPower ? `<p><strong>Battle Power:</strong> ${item.combatPower}</p>` : ""}
      `}

      <p>${item.description || ""}</p>
      <span class="character-meta">${item.category || "characters"}</span>
    </article>
  `).join("");
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.category);
  });
});

loadGallery();
