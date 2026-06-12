const galleryGrid = document.querySelector("#galleryGrid");
const buttons = document.querySelectorAll(".tab-btn");

let galleryItems = [];

async function loadGallery() {
  const res = await fetch("data/gallery.json?v=10");
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
