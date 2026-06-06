const state = {
  chapters: [],
  characters: [],
  gallery: [],
  updates: []
};

const totalChaptersEl = document.querySelector("#totalChapters");
const totalWordsEl = document.querySelector("#totalWords");
const latestChapterEl = document.querySelector("#latestChapter");
const chapterList = document.querySelector("#chapterList");
const updatesList = document.querySelector("#updatesList");
const characterGrid = document.querySelector("#characterGrid");
const galleryGrid = document.querySelector("#galleryGrid");

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

async function loadData(filePath, fallback = []) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  }
}

function renderStats() {
  if (!totalChaptersEl || !totalWordsEl || !latestChapterEl) return;

  const chapters = state.chapters;

  if (!chapters.length) {
    totalChaptersEl.textContent = "0";
    totalWordsEl.textContent = "0 words";
    latestChapterEl.textContent = "No chapters yet";
    return;
  }

  const totalWords = chapters.reduce((sum, chapter) => sum + (chapter.words || 0), 0);

  totalChaptersEl.textContent = chapters.length;
  totalWordsEl.textContent = `${formatNumber(totalWords)} words`;
  latestChapterEl.textContent = chapters[chapters.length - 1].title;
}

function renderUpdates() {
  if (!updatesList) return;

  updatesList.innerHTML = state.updates.map(update => `
    <article class="update-card">
      <h3>${update.title}</h3>
      <p>${update.detail}</p>
    </article>
  `).join("");
}

function renderChapters() {
  if (!chapterList) return;

  chapterList.innerHTML = state.chapters.map(chapter => `
    <article class="update-card">
      <h3>${chapter.title}</h3>
      <p>${chapter.description || ""}</p>
      <div class="character-meta">
        <span>${formatNumber(chapter.words || 0)} words</span>
      </div>
      <a class="small-link" href="${chapter.link || `chapter.html?id=${chapter.id}`}">Read chapter</a>
    </article>
  `).join("");
}

function renderCharacters() {
  if (!characterGrid) return;

  characterGrid.innerHTML = state.characters.map(character => `
    <article class="character-card">
      <figure>
        <img src="${character.image}" alt="${character.name}" loading="lazy">
      </figure>

      <div class="character-info">
        <h3>${character.name}</h3>

${character.isMap ? "" : `
<div class="character-meta">
  <p><strong>Status:</strong> ${character.status || "Alive"}</p>
  <p><strong>Age:</strong> ${character.age || "-"}</p>
  <p><strong>Level:</strong> ${character.level || "-"}</p>
  <p><strong>Stage:</strong> ${character.stage || character.rank || "-"}</p>
  <p><strong>Potential:</strong> ${character.potential || "-"}</p>
  <p><strong>Battle Power:</strong> ${character.combatPower || "-"}</p>
</div>
`}

        <p class="character-bio">
          ${character.description || character.bio || ""}
        </p>
      </div>
    </article>
  `).join("");
}

function renderGallery() {
  if (!galleryGrid) return;

  galleryGrid.innerHTML = state.gallery.map(item => `
    <article class="gallery-card">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <h3>${item.title}</h3>
      <p>${item.description || ""}</p>
      <span class="character-meta">${item.category || ""}</span>
    </article>
  `).join("");
}

async function init() {
  state.chapters = await loadData("data/chapters.json", []);
  state.characters = await loadData("data/characters.json", []);
  state.gallery = await loadData("data/gallery.json", []);
  state.updates = await loadData("data/updates.json", []);

  renderStats();
  renderUpdates();
  renderChapters();
  renderCharacters();
  renderGallery();
}

init();
