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

  const style = document.createElement('style');
  style.textContent = `.language-switch{display:flex;gap:4px;align-items:center;padding:4px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.07)}.language-switch button{border:0;border-radius:999px;background:transparent;color:#dce6ef;font-weight:900;font-size:.72rem;letter-spacing:.08em;padding:7px 9px;cursor:pointer}.language-switch button.active,.language-switch button:hover{background:linear-gradient(135deg,var(--gold),#b87b24);color:#101923}@media(max-width:760px){.language-switch{margin-left:auto}.nav{gap:10px}.language-switch button{padding:6px 8px;font-size:.68rem}}`;
  document.head.appendChild(style);

  const text = {
    en: {
      'Início':'Home','Agenda':'Schedule','Músicos':'Musicians','Sobre':'About','Participar':'Get involved','Contato':'Contact','Imprensa':'Press','Booking':'Booking','Patrocínio':'Cultural support','Apoio cultural':'Cultural support','Navegação':'Navigation','Local':'Location','Banda Sinfônica da Unicamp':'Unicamp Symphonic Band','Temporada 2026 · Campinas/SP':'2026 Season · Campinas/SP','Ver agenda':'View schedule','Conhecer músicos':'Meet the musicians','Kit de imprensa':'Press kit','Agenda em destaque':'Featured schedule','Próxima programação':'Upcoming program','Abrir agenda':'Open schedule','Receber novidades':'Get updates','Agora na home':'On the homepage','Agenda, bastidores e acesso rápido':'Schedule, backstage and quick access','Próximo concerto':'Next concert','Galeria':'Gallery','Memória visual':'Visual memory','Corpo artístico':'Artistic body','Músicos por naipe':'Musicians by section','Experiência institucional':'Institutional experience','O que o visitante encontra':'What visitors find','Design':'Design','Manutenção':'Maintenance','Site simples de evoluir':'Simple site to evolve','Sobre a Banda Sinfônica da Unicamp':'About the Unicamp Symphonic Band','Nossa história':'Our story','Missão':'Mission','Regente titular':'Chief conductor','Maestro & Músicos':'Conductor and Musicians','Disposição dos naipes':'Section layout','Ver mini bio':'View mini bio','Fechar':'Close','Formação':'Education','Redes e contato artístico':'Social media and artistic contact','Agenda de Concertos':'Concert Schedule','Programação':'Program','Próximos destaques':'Upcoming highlights','Concerto oficial':'Official concert','Receber informações':'Receive information','Ensaio aberto':'Open rehearsal','Projeto educativo':'Educational project','Saber mais':'Learn more','Data e local':'Date and venue','Divulgação':'Promotion','Serviço':'Service information','Notícias':'News','Fotos em alta resolução':'High-resolution photos','Releases de imprensa':'Press releases','Rider técnico':'Technical rider','Fale conosco':'Contact us','Mensagem':'Message','Envie uma solicitação':'Send a request','Enviar e-mail':'Send email','Informações':'Information','Caminhos rápidos':'Quick paths','O que você precisa?':'What do you need?','Contratação':'Booking','Solicitação':'Request','Solicite um orçamento':'Request a quote','Enviar solicitação':'Send request','Fluxo':'Flow','Como funciona':'How it works','Documentos':'Documents','Materiais de apoio':'Support materials','Repertório':'Repertoire','Logística':'Logistics'
    },
    es: {
      'Início':'Inicio','Agenda':'Agenda','Músicos':'Músicos','Sobre':'Acerca de','Participar':'Participar','Contato':'Contacto','Imprensa':'Prensa','Booking':'Contratación','Patrocínio':'Apoyo cultural','Apoio cultural':'Apoyo cultural','Navegação':'Navegación','Local':'Ubicación','Banda Sinfônica da Unicamp':'Banda Sinfónica de Unicamp','Ver agenda':'Ver agenda','Conhecer músicos':'Conocer músicos','Kit de imprensa':'Kit de prensa','Agenda em destaque':'Agenda destacada','Próxima programação':'Próxima programación','Abrir agenda':'Abrir agenda','Receber novidades':'Recibir novedades','Agora na home':'En la página inicial','Agenda, bastidores e acesso rápido':'Agenda, bastidores y acceso rápido','Próximo concerto':'Próximo concierto','Galeria':'Galería','Memória visual':'Memoria visual','Corpo artístico':'Cuerpo artístico','Músicos por naipe':'Músicos por sección','Experiência institucional':'Experiencia institucional','O que o visitante encontra':'Qué encuentra el visitante','Design':'Diseño','Manutenção':'Mantenimiento','Site simples de evoluir':'Sitio simple de evolucionar','Sobre a Banda Sinfônica da Unicamp':'Acerca de la Banda Sinfónica de Unicamp','Nossa história':'Nuestra historia','Missão':'Misión','Regente titular':'Director titular','Maestro & Músicos':'Director y Músicos','Disposição dos naipes':'Disposición de secciones','Ver mini bio':'Ver mini bio','Fechar':'Cerrar','Formação':'Formación','Redes e contato artístico':'Redes y contacto artístico','Agenda de Concertos':'Agenda de Conciertos','Programação':'Programación','Próximos destaques':'Próximos destacados','Concerto oficial':'Concierto oficial','Receber informações':'Recibir información','Ensaio aberto':'Ensayo abierto','Projeto educativo':'Proyecto educativo','Saber mais':'Saber más','Data e local':'Fecha y lugar','Divulgação':'Divulgación','Serviço':'Servicio','Notícias':'Noticias','Fotos em alta resolução':'Fotos en alta resolución','Releases de imprensa':'Comunicados de prensa','Rider técnico':'Rider técnico','Fale conosco':'Contáctenos','Mensagem':'Mensaje','Envie uma solicitação':'Envía una solicitud','Enviar e-mail':'Enviar correo','Informações':'Información','Caminhos rápidos':'Accesos rápidos','O que você precisa?':'Qué necesitas','Contratação':'Contratación','Solicitação':'Solicitud','Solicite um orçamento':'Solicita un presupuesto','Enviar solicitação':'Enviar solicitud','Fluxo':'Flujo','Como funciona':'Cómo funciona','Documentos':'Documentos','Materiais de apoio':'Materiales de apoyo','Repertório':'Repertorio','Logística':'Logística'
    }
  };

  function cleanSymbols(value) {
    return value.replace(/[\u2013\u2014]/g, ' ').replace(/\s{2,}/g, ' ');
  }

  function currentLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (['pt','en','es'].includes(fromUrl)) {
      localStorage.setItem('bsu-lang', fromUrl);
      return fromUrl;
    }
    return localStorage.getItem('bsu-lang') || 'pt';
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    return !parent || parent.closest('script,style,noscript,code,.language-switch');
  }

  function applyText(root, lang) {
    const map = text[lang] || {};
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (shouldSkip(node)) return;
      let value = cleanSymbols(node.nodeValue);
      if (lang !== 'pt') {
        const trimmed = value.trim();
        if (map[trimmed]) value = value.replace(trimmed, map[trimmed]);
        else keys.forEach(key => {
          if (key.length >= 4 && value.includes(key)) value = value.split(key).join(map[key]);
        });
      }
      node.nodeValue = cleanSymbols(value);
    });
    document.title = cleanSymbols(document.title);
  }

  function addLanguageSwitcher(lang) {
    const nav = document.querySelector('.nav');
    if (!nav || document.querySelector('.language-switch')) return;
    const switcher = document.createElement('div');
    switcher.className = 'language-switch';
    switcher.setAttribute('aria-label', 'Idiomas');
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

  function keepLanguageOnLinks(lang) {
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
  applyText(document.body, lang);
  keepLanguageOnLinks(lang);

  let pending = false;
  const observer = new MutationObserver(mutations => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(() => {
      mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) applyText(node, lang);
      }));
      applyText(document.body, lang);
      keepLanguageOnLinks(lang);
      pending = false;
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  if (sessionStorage.getItem('bsu-page-turn') === '1') {
    sessionStorage.removeItem('bsu-page-turn');
    document.body.classList.add('has-entered');
    window.setTimeout(() => document.body.classList.remove('has-entered'), 360);
  }

  if (reduceMotion) return;

  function isInternalPageLink(anchor) {
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return false;
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
    window.setTimeout(() => { window.location.href = anchor.href; }, 260);
  });
})();
