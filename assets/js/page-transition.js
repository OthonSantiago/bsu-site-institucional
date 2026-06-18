(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.createElement('div');
  overlay.className = 'score-page-turn';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  const clefs = document.createElement('div');
  clefs.className = 'score-clefs';
  clefs.setAttribute('aria-hidden', 'true');
  document.body.appendChild(clefs);

  const dictionary = {
    en: {
      'Início':'Home','Agenda':'Schedule','Músicos':'Musicians','Sobre':'About','Participar':'Get involved','Contato':'Contact','Imprensa':'Press','Booking':'Booking','Apoio cultural':'Cultural support','Patrocínio':'Support',
      'Temporada 2026 · Campinas/SP':'2026 Season · Campinas/SP','Banda Sinfônica da Unicamp':'Unicamp Symphonic Band','Ver agenda':'View schedule','Conhecer músicos':'Meet the musicians','Kit de imprensa':'Press kit','Agenda em destaque':'Featured schedule','Próxima programação':'Upcoming program','Abrir agenda':'Open schedule','Receber novidades':'Get updates','Agora na home':'On the homepage','Agenda, bastidores e acesso rápido':'Schedule, backstage and quick access','Experiência institucional':'Institutional experience','O que o visitante encontra':'What visitors can find','Nossa história':'Our story','Missão':'Mission','Regente titular':'Chief conductor','Corpo artístico':'Artistic body','Maestro & Músicos':'Conductor & Musicians','Disposição dos naipes':'Section layout','Clique no nome de um músico para abrir a mini bio. Os dados estão em':'Click a musician name to open the mini bio. Data is stored in','Temporada':'Season','Agenda de Concertos':'Concert Schedule','Programação':'Program','Próximos destaques':'Upcoming highlights','Fale conosco':'Contact us','Envie uma solicitação':'Send a request','Caminhos rápidos':'Quick paths','O que você precisa?':'What do you need?'
    },
    es: {
      'Início':'Inicio','Agenda':'Agenda','Músicos':'Músicos','Sobre':'Acerca de','Participar':'Participar','Contato':'Contacto','Imprensa':'Prensa','Booking':'Contratación','Apoio cultural':'Apoyo cultural','Patrocínio':'Apoyo',
      'Temporada 2026 · Campinas/SP':'Temporada 2026 · Campinas/SP','Banda Sinfônica da Unicamp':'Banda Sinfónica de Unicamp','Ver agenda':'Ver agenda','Conhecer músicos':'Conocer músicos','Kit de imprensa':'Kit de prensa','Agenda em destaque':'Agenda destacada','Próxima programação':'Próxima programación','Abrir agenda':'Abrir agenda','Receber novidades':'Recibir novedades','Agora na home':'En la página inicial','Agenda, bastidores e acesso rápido':'Agenda, bastidores y acceso rápido','Experiência institucional':'Experiencia institucional','O que o visitante encontra':'Qué encuentra el visitante','Nossa história':'Nuestra historia','Missão':'Misión','Regente titular':'Director titular','Corpo artístico':'Cuerpo artístico','Maestro & Músicos':'Director y Músicos','Disposição dos naipes':'Disposición de secciones','Clique no nome de um músico para abrir a mini bio. Os dados estão em':'Haz clic en el nombre de un músico para abrir la mini bio. Los datos están en','Temporada':'Temporada','Agenda de Concertos':'Agenda de Conciertos','Programação':'Programación','Próximos destaques':'Próximos destacados','Fale conosco':'Contáctenos','Envie uma solicitação':'Envía una solicitud','Caminhos rápidos':'Accesos rápidos','O que você precisa?':'¿Qué necesitas?'
    }
  };

  function currentLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (['pt','en','es'].includes(fromUrl)) {
      localStorage.setItem('bsu-lang', fromUrl);
      return fromUrl;
    }
    return localStorage.getItem('bsu-lang') || 'pt';
  }

  function translateTextNodes(root, lang) {
    if (lang === 'pt') return;
    const map = dictionary[lang] || {};
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const original = node.nodeValue.trim();
      if (!original || original.length > 120) return;
      if (map[original]) node.nodeValue = node.nodeValue.replace(original, map[original]);
    });
  }

  function addLanguageSwitcher(lang) {
    const nav = document.querySelector('.nav');
    if (!nav || document.querySelector('.language-switch')) return;
    const switcher = document.createElement('div');
    switcher.className = 'language-switch';
    switcher.setAttribute('aria-label', 'Idioma / Language / Idioma');
    switcher.innerHTML = ['pt','en','es'].map(code => `<button type="button" data-lang="${code}" class="${code === lang ? 'active' : ''}">${code.toUpperCase()}</button>`).join('');
    nav.appendChild(switcher);
    switcher.addEventListener('click', event => {
      const button = event.target.closest('[data-lang]');
      if (!button) return;
      localStorage.setItem('bsu-lang', button.dataset.lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', button.dataset.lang);
      window.location.href = url.toString();
    });
  }

  function preserveLanguageOnLinks(lang) {
    if (lang === 'pt') return;
    document.querySelectorAll('a[href]').forEach(anchor => {
      const href = anchor.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      url.searchParams.set('lang', lang);
      anchor.href = url.toString();
    });
  }

  const lang = currentLanguage();
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  addLanguageSwitcher(lang);
  translateTextNodes(document.body, lang);
  preserveLanguageOnLinks(lang);

  if (sessionStorage.getItem('bsu-page-turn') === '1') {
    sessionStorage.removeItem('bsu-page-turn');
    document.body.classList.add('has-entered');
    window.setTimeout(() => document.body.classList.remove('has-entered'), 360);
  }

  if (reduceMotion) return;

  function isInternalPageLink(anchor) {
    if (!anchor || anchor.target === '_blank') return false;
    if (anchor.hasAttribute('download')) return false;
    const href = anchor.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;
    return true;
  }

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a');
    if (!isInternalPageLink(anchor)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    document.body.classList.add('is-page-turning');
    sessionStorage.setItem('bsu-page-turn', '1');

    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, 260);
  });
})();
