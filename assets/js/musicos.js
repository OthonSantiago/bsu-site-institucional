const ORDER = ['Regência','Spalla','Flauta','Oboé','Clarinete','Saxofone','Trompa','Trompete','Trombone','Eufônio','Tuba','Contrabaixo','Percussão'];

const roster = document.querySelector('[data-musician-roster]');
const profileRoot = document.querySelector('[data-profile-root]');

const PROFILE_OVERRIDES = {
  'victor-vinicius-garcia-pereira': {
    foto: 'assets/img/musicos/victor-vinicius-garcia-pereira.svg',
    foto_disponivel: true
  }
};

function normalizeMusicians(items) {
  return items.map(item => ({ ...item, ...(PROFILE_OVERRIDES[item.id] || {}) }));
}

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function groupByNaipe(items) {
  return ORDER.map(naipe => ({ naipe, items: items.filter(item => item.naipe === naipe) })).filter(group => group.items.length);
}

function slugNaipe(naipe) {
  return naipe.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c');
}

function musicianCard(item) {
  return `
    <button class="musician musician-button" type="button" data-profile-id="${item.id}">
      <small>${item.instrumento}${item.funcao && item.funcao !== 'Músico' && item.funcao !== 'Música' ? ' · ' + item.funcao : ''}</small>
      <strong>${item.nome}</strong>
      <span>Ver mini bio</span>
    </button>
  `;
}

function renderRoster(items) {
  const groups = groupByNaipe(items);
  roster.innerHTML = groups.map(group => `
    <section class="roster-section" id="${slugNaipe(group.naipe)}">
      <div class="roster-title"><h2>${group.naipe}</h2><span class="count">${group.items.length}</span></div>
      <div class="musician-grid">${group.items.map(musicianCard).join('')}</div>
    </section>
  `).join('');
}

function profileImage(item) {
  if (item.foto_disponivel) {
    return `<img src="${item.foto}" alt="Foto de ${item.nome}" loading="lazy">`;
  }
  return `<div class="profile-placeholder" aria-hidden="true">${initials(item.nome)}</div>`;
}

function openProfile(item) {
  const redes = item.redes && item.redes.length
    ? item.redes.map(link => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`).join('')
    : '<span>Redes sociais a confirmar</span>';

  profileRoot.innerHTML = `
    <div class="profile-backdrop" data-close-profile></div>
    <section class="profile-modal" role="dialog" aria-modal="true" aria-label="Mini bio de ${item.nome}">
      <button class="profile-close" type="button" data-close-profile>Fechar</button>
      <div class="profile-grid">
        <figure class="profile-polaroid">
          <div class="profile-photo">${profileImage(item)}</div>
          <figcaption>${item.instrumento}</figcaption>
        </figure>
        <div class="profile-copy">
          <span class="tag">${item.naipe}</span>
          <h2>${item.nome}</h2>
          <p class="profile-role">${item.funcao} · ${item.status}</p>
          <p>${item.bio}</p>
          <h3>Formação</h3>
          <p>${item.formacao}</p>
          <h3>Redes e contato artístico</h3>
          <div class="profile-links">${redes}</div>
          <div class="profile-maintenance">
            <strong>Manutenção</strong><br>
            Foto esperada: <code>${item.foto}</code><br>
            Proporção recomendada: <code>4:5</code> · Tamanho base: <code>1080x1350px</code> · Formato: <code>WEBP/SVG</code>
          </div>
        </div>
      </div>
    </section>
  `;
  document.body.classList.add('profile-open');
}

function closeProfile() {
  profileRoot.innerHTML = '';
  document.body.classList.remove('profile-open');
}

async function init() {
  const response = await fetch('assets/data/musicos.json');
  const musicians = normalizeMusicians(await response.json());
  renderRoster(musicians);

  roster.addEventListener('click', event => {
    const button = event.target.closest('[data-profile-id]');
    if (!button) return;
    const item = musicians.find(musician => musician.id === button.dataset.profileId);
    if (item) openProfile(item);
  });

  document.addEventListener('click', event => {
    if (event.target.matches('[data-close-profile]')) closeProfile();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeProfile();
  });
}

if (roster && profileRoot) init();
