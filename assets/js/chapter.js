const chapterTitleEl = document.querySelector("#chapterTitle");
const chapterExcerptEl = document.querySelector("#chapterExcerpt");
const chapterPublishedEl = document.querySelector("#chapterPublished");
const chapterWordsEl = document.querySelector("#chapterWords");
const chapterContentEl = document.querySelector("#chapterContent");
const prevLink = document.querySelector("#prevLink");
const prevLinkBottom = document.querySelector("#prevLinkBottom");
const nextLink = document.querySelector("#nextLink");
const nextLinkBottom = document.querySelector("#nextLinkBottom");

function getQuery(value) {
  const params = new URLSearchParams(window.location.search);
  return params.get(value);
}

function formatNumber(value) {
  return value.toLocaleString();
}

function createLink(id) {
  return `chapter.html?id=${id}`;
}

function renderContent(chapter) {
  chapterTitleEl.textContent = chapter.title;
  chapterExcerptEl.textContent = chapter.description;
  chapterPublishedEl.textContent = `Published: ${chapter.published || 'TBA'}`;
  chapterWordsEl.textContent = `Words: ${formatNumber(chapter.words || 0)}`;

  chapterContentEl.innerHTML = chapter.content.map(block => {
    if (block.type === 'image') {
      return `
        <figure class="chapter-figure">
          <img src="${block.src}" alt="${block.caption || chapter.title}" loading="lazy" />
          ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}
        </figure>
      `;
    }
    return `<p>${block.text}</p>`;
  }).join('');
}

function setNavigation(index, chapters) {
  const prev = chapters[index - 1];
  const next = chapters[index + 1];

  if (prev) {
    prevLink.href = createLink(prev.id);
    prevLinkBottom.href = createLink(prev.id);
    prevLink.classList.remove('hidden');
    prevLinkBottom.classList.remove('hidden');
  } else {
    prevLink.href = '#';
    prevLinkBottom.href = '#';
    prevLink.classList.add('hidden');
    prevLinkBottom.classList.add('hidden');
  }

  if (next) {
    nextLink.href = createLink(next.id);
    nextLinkBottom.href = createLink(next.id);
    nextLink.classList.remove('hidden');
    nextLinkBottom.classList.remove('hidden');
  } else {
    nextLink.href = '#';
    nextLinkBottom.href = '#';
    nextLink.classList.add('hidden');
    nextLinkBottom.classList.add('hidden');
  }
}

async function loadChapters() {
  try {
    const response = await fetch('data/chapters.json');
    if (!response.ok) throw new Error('Unable to load chapter data.');
    return await response.json();
  } catch (error) {
    chapterContentEl.innerHTML = `<p class="error-text">${error.message}</p>`;
    return [];
  }
}

async function init() {
  const chapters = await loadChapters();
  const id = parseInt(getQuery('id'), 10) || 1;
  const index = chapters.findIndex(chapter => chapter.id === id);

  if (index === -1) {
    chapterTitleEl.textContent = 'Chapter not found';
    chapterContentEl.innerHTML = '<p class="error-text">The chapter you requested could not be found. Return to the chapters list.</p>';
    prevLink.classList.add('hidden');
    prevLinkBottom.classList.add('hidden');
    nextLink.classList.add('hidden');
    nextLinkBottom.classList.add('hidden');
    return;
  }

  const chapter = chapters[index];
  renderContent(chapter);
  setNavigation(index, chapters);
}

init();
