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

  const languageStyle = document.createElement('style');
  languageStyle.textContent = `.language-switch{display:flex;gap:4px;align-items:center;padding:4px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.07)}.language-switch button{border:0;border-radius:999px;background:transparent;color:#dce6ef;font-weight:900;font-size:.72rem;letter-spacing:.08em;padding:7px 9px;cursor:pointer}.language-switch button.active,.language-switch button:hover{background:linear-gradient(135deg,var(--gold),#b87b24);color:#101923}@media(max-width:760px){.language-switch{margin-left:auto}.nav{gap:10px}.language-switch button{padding:6px 8px;font-size:.68rem}}`;
  document.head.appendChild(languageStyle);

  const text = {
    en: {
      'Início':'Home','Agenda':'Schedule','Músicos':'Musicians','Sobre':'About','Participar':'Get involved','Contato':'Contact','Imprensa':'Press','Booking':'Booking','Apoio cultural':'Cultural support','Patrocínio':'Cultural support','Navegação':'Navigation','Local':'Location',
      'Temporada 2026 · Campinas/SP':'2026 Season · Campinas/SP','Banda Sinfônica da Unicamp':'Unicamp Symphonic Band','Música orquestral, formação artística e difusão cultural — um portal institucional com cara de temporada, agenda viva e memória visual da banda.':'Orchestral music, artistic education and cultural outreach — an institutional portal with a season-driven experience, active schedule and visual memory of the band.','Ver agenda':'View schedule','Conhecer músicos':'Meet the musicians','Kit de imprensa':'Press kit','músicos, regência e convidados':'musicians, conductor and guests','naipes e categorias artísticas':'sections and artistic categories','temporada em preparação':'season in preparation','Agenda em destaque':'Featured schedule','Próxima programação':'Upcoming program','A agenda oficial ainda não possui concertos publicados. Assim que a temporada for confirmada, este bilhete passa a destacar data, local, programa e chamada para o público.':'The official schedule has no published concerts yet. Once the season is confirmed, this ticket will highlight the date, venue, program and public call.','Abrir agenda':'Open schedule','Receber novidades':'Get updates','temporada':'season','em breve':'coming soon','Foto de concerto':'Concert photo','Palco & público':'Stage & audience','substituir por imagem real':'replace with real image','Regência':'Conducting','Maestro em cena':'Conductor on stage','momento de apresentação':'performance moment','Naipe de metais':'Brass section','Força sinfônica':'Symphonic power','bastidores e ensaio':'backstage and rehearsal','Campus Unicamp':'Unicamp campus','Identidade universitária':'University identity','território e memória':'place and memory',
      'Agora na home':'On the homepage','Agenda, bastidores e acesso rápido':'Schedule, backstage and quick access','O novo desenho aproxima o site de portais de orquestras: programação em evidência, imagens fortes, chamadas claras e navegação para público, imprensa e apoiadores.':'The new design brings the site closer to professional orchestra portals: prominent programming, strong imagery, clear calls to action and navigation for audiences, press and supporters.','aguardando temporada':'awaiting season','Próximo concerto':'Next concert','Assim que houver uma data oficial, este card vira o destaque principal do site.':'Once there is an official date, this card becomes the main highlight of the site.','Galeria':'Gallery','Memória visual':'Visual memory','Álbuns de concertos, ensaios e bastidores com estética editorial.':'Albums of concerts, rehearsals and backstage moments with an editorial look.','Corpo artístico':'Artistic body','Músicos por naipe':'Musicians by section','Regência, spalla, madeiras, metais, percussão e convidados.':'Conducting, spalla, woodwinds, brass, percussion and guests.','Experiência institucional':'Institutional experience','O que o visitante encontra':'What visitors find','Uma estrutura mais parecida com portais profissionais de orquestras, mas adaptada à realidade de uma banda sinfônica universitária.':'A structure closer to professional orchestra portals, adapted to the reality of a university symphonic band.','História, missão, regência e relação com a Unicamp.':'History, mission, conducting and relationship with Unicamp.','Concertos, ensaios abertos e programação da temporada.':'Concerts, open rehearsals and season programming.','Release, fotos oficiais, rider técnico e entrevistas.':'Press releases, official photos, technical rider and interviews.','Cotas, contrapartidas e relacionamento institucional.':'Support tiers, benefits and institutional relationship.','Design':'Design','Visual editorial com Polaroids':'Editorial look with Polaroids','A proposta usa fotos em moldura estilo Polaroid para transmitir memória, proximidade e bastidor, sem perder a linguagem institucional.':'The proposal uses Polaroid-style framed photos to convey memory, closeness and backstage atmosphere while preserving an institutional tone.','Manutenção':'Maintenance','Site simples de evoluir':'Simple site to evolve','A estrutura foi pensada para facilitar atualização de agenda, músicos, fotos, imprensa e páginas institucionais.':'The structure was designed to make updates to schedule, musicians, photos, press and institutional pages easier.',
      'A orquestra':'The ensemble','Sobre a Banda Sinfônica da Unicamp':'About the Unicamp Symphonic Band','Uma trajetória construída em cena, conectando prática artística, pesquisa, ensino e extensão universitária.':'A journey built on stage, connecting artistic practice, research, teaching and university outreach.','Nossa história':'Our story','Missão':'Mission','Regente titular':'Chief conductor','Fernando Hehl é bacharel em trombone pela Unicamp, pós-graduado em Educação Musical pelo Centro Universitário Claretiano e atua como músico, professor, pesquisador, diretor artístico e regente da Banda Sinfônica da Unicamp.':'Fernando Hehl holds a bachelor degree in trombone from Unicamp, a postgraduate degree in Music Education, and works as a musician, teacher, researcher, artistic director and conductor of the Unicamp Symphonic Band.','A BSU conta com músicos distribuídos entre os naipes da banda, além de solistas, bolsistas e convidados de cada temporada.':'BSU includes musicians distributed across the band sections, as well as soloists, scholarship students and guests in each season.','Ver o corpo artístico':'View the artistic body',
      'Maestro & Músicos':'Conductor & Musicians','Integrantes organizados como uma banda sinfônica: regência no centro do palco, naipes em arco e mini bios individuais ao clicar no nome.':'Members organized like a symphonic band: conducting at the center of the stage, sections in an arc and individual mini bios when clicking each name.','Disposição dos naipes':'Section layout','Uma leitura visual inspirada na formação de palco: madeiras à frente, saxofones no miolo, metais atrás, graves e percussão ao fundo.':'A visual reading inspired by stage layout: woodwinds in front, saxophones in the middle, brass behind, low instruments and percussion at the back.','Clique no nome de um músico para abrir a mini bio. Os dados estão em':'Click a musician name to open the mini bio. Data is stored in','facilitando manutenção futura.':'making future maintenance easier.','Ver mini bio':'View mini bio','Fechar':'Close','Formação':'Education','Redes e contato artístico':'Social media and artistic contact','Redes sociais a confirmar':'Social media to be confirmed','Mini bio em construção.':'Mini bio under construction.','A confirmar':'To be confirmed','Foto esperada':'Expected photo','Proporção recomendada':'Recommended ratio','Tamanho base':'Base size','Formato':'Format','Regente Titular':'Chief conductor','Bolsista BAS/SAE':'BAS/SAE scholarship musician','Música':'Musician','Músico':'Musician','Clarinete':'Clarinet','Flauta':'Flute','Oboé':'Oboe','Saxofone':'Saxophone','Trompa':'Horn','Trompete':'Trumpet','Eufônio':'Euphonium','Contrabaixo':'Double bass','Percussão':'Percussion','músicos':'musicians','músico':'musician',
      'Agenda de Concertos':'Concert Schedule','Concertos, ensaios abertos e atividades da Banda Sinfônica da Unicamp. A página está pronta para receber a programação oficial.':'Concerts, open rehearsals and activities of the Unicamp Symphonic Band. The page is ready to receive the official program.','Programação':'Program','Próximos destaques':'Upcoming highlights','Como a agenda oficial ainda não publicou novos concertos, os cards abaixo funcionam como modelo visual para a temporada.':'As the official schedule has not yet published new concerts, the cards below work as a visual model for the season.','aguardando data':'awaiting date','Concerto oficial':'Official concert','Receber informações':'Receive information','modelo':'model','Ensaio aberto':'Open rehearsal','Tenho interesse':'I am interested','Projeto educativo':'Educational project','Saber mais':'Learn more','Modelo de evento':'Event model','O que cada página de concerto deve trazer':'What each concert page should include','Data e local':'Date and venue','Programa':'Program','Divulgação':'Promotion','Serviço':'Service information',
      'Memória':'Memory','Estilo Polaroid':'Polaroid style','Álbuns em destaque':'Featured albums','Concerto':'Concert','álbum oficial':'official album','Ensaio':'Rehearsal','Bastidores':'Backstage','processo artístico':'artistic process','direção musical':'musical direction','Naipe':'Section','Sugestão':'Suggestion','Álbuns recomendados':'Recommended albums','Concertos':'Concerts','Ensaios':'Rehearsals','Institucional':'Institutional',
      'Bastidores & novidades':'Backstage & news','Notícias':'News','Comunicados, artigos e notas sobre temporadas, convidados, bastidores e projetos educativos.':'Announcements, articles and notes about seasons, guests, backstage and educational projects.','Editorial':'Editorial','Publicações da BSU':'BSU publications','Educação':'Education','Extensão cultural':'Cultural outreach',
      'Electronic Press Kit':'Electronic Press Kit','Solicitar entrevista':'Request interview','Fotos em alta resolução':'High-resolution photos','Publicações':'Publications','Releases de imprensa':'Press releases','Produção':'Production','Rider técnico':'Technical rider','Profissionalização':'Professionalization','Materiais que faltam':'Missing materials','Release curto':'Short release','Release completo':'Full release','Banco de imagens':'Image bank',
      'Fale conosco':'Contact us','Dúvidas, parcerias, convites para apresentações ou solicitações de imprensa.':'Questions, partnerships, performance invitations or press requests.','Mensagem':'Message','Envie uma solicitação':'Send a request','Entre em contato com a equipe da BSU para dúvidas institucionais, imprensa, apresentações, parcerias e apoio cultural.':'Contact the BSU team for institutional questions, press, performances, partnerships and cultural support.','Enviar e-mail':'Send email','Informações':'Information','Universidade Estadual de Campinas':'State University of Campinas','Canais':'Channels','Caminhos rápidos':'Quick paths','O que você precisa?':'What do you need?','Imprensa':'Press','Solicitação de apresentação e orçamento.':'Performance request and quotation.','Apoio institucional, cotas e relacionamento.':'Institutional support, tiers and relationship.',
      'Contratação':'Booking','Booking e Agendamento de Concertos':'Booking & Concert Scheduling','Solicitação':'Request','Solicite um orçamento':'Request a quote','Envie os dados do evento para que a equipe da BSU avalie disponibilidade, formato de apresentação, repertório, estrutura e logística.':'Send event details so the BSU team can evaluate availability, performance format, repertoire, structure and logistics.','Enviar solicitação':'Send request','Fluxo':'Flow','Como funciona':'How it works','Atendimento':'Service','Documentos':'Documents','Materiais de apoio':'Support materials','Repertório':'Repertoire','Logística':'Logistics','Falar com a equipe':'Talk to the team','Possibilidades':'Possibilities','Modelos de apoio':'Support models','Cota':'Tier','Diamante':'Diamond','Ouro':'Gold','Prata':'Silver'
    },
    es: {
      'Início':'Inicio','Agenda':'Agenda','Músicos':'Músicos','Sobre':'Acerca de','Participar':'Participar','Contato':'Contacto','Imprensa':'Prensa','Booking':'Contratación','Patrocínio':'Apoyo cultural','Apoio cultural':'Apoyo cultural','Navegação':'Navegación','Local':'Ubicación',
      'Temporada 2026 · Campinas/SP':'Temporada 2026 · Campinas/SP','Banda Sinfônica da Unicamp':'Banda Sinfónica de Unicamp','Ver agenda':'Ver agenda','Conhecer músicos':'Conocer músicos','Kit de imprensa':'Kit de prensa','Agenda em destaque':'Agenda destacada','Próxima programação':'Próxima programación','Abrir agenda':'Abrir agenda','Receber novidades':'Recibir novedades','temporada':'temporada','em breve':'próximamente','Foto de concerto':'Foto de concierto','Palco & público':'Escenario y público','Regência':'Dirección','Maestro em cena':'Director en escena','Naipe de metais':'Sección de metales','Força sinfônica':'Fuerza sinfónica','Campus Unicamp':'Campus Unicamp','Identidade universitária':'Identidad universitaria',
      'Agora na home':'En la página inicial','Agenda, bastidores e acesso rápido':'Agenda, bastidores y acceso rápido','aguardando temporada':'esperando temporada','Próximo concerto':'Próximo concierto','Galeria':'Galería','Memória visual':'Memoria visual','Corpo artístico':'Cuerpo artístico','Músicos por naipe':'Músicos por sección','Experiência institucional':'Experiencia institucional','O que o visitante encontra':'Qué encuentra el visitante','Design':'Diseño','Manutenção':'Mantenimiento','Site simples de evoluir':'Sitio simple de evolucionar',
      'A orquestra':'La orquesta','Sobre a Banda Sinfônica da Unicamp':'Acerca de la Banda Sinfónica de Unicamp','Nossa história':'Nuestra historia','Missão':'Misión','Regente titular':'Director titular','Ver o corpo artístico':'Ver el cuerpo artístico','Maestro & Músicos':'Director y Músicos','Disposição dos naipes':'Disposición de secciones','Ver mini bio':'Ver mini bio','Fechar':'Cerrar','Formação':'Formación','Redes e contato artístico':'Redes y contacto artístico','Redes sociais a confirmar':'Redes sociales por confirmar','Mini bio em construção.':'Mini bio en construcción.','A confirmar':'Por confirmar','Foto esperada':'Foto esperada','Proporção recomendada':'Proporción recomendada','Tamanho base':'Tamaño base','Formato':'Formato','Regente Titular':'Director titular','Bolsista BAS/SAE':'Becario BAS/SAE','Música':'Música','Músico':'Músico','Saxofone':'Saxofón','Trompete':'Trompeta','Eufônio':'Eufonio','Contrabaixo':'Contrabajo','Percussão':'Percusión',
      'Agenda de Concertos':'Agenda de Conciertos','Programação':'Programación','Próximos destaques':'Próximos destacados','aguardando data':'esperando fecha','Concerto oficial':'Concierto oficial','Receber informações':'Recibir información','Ensaio aberto':'Ensayo abierto','Tenho interesse':'Tengo interés','Projeto educativo':'Proyecto educativo','Saber mais':'Saber más','Modelo de evento':'Modelo de evento','O que cada página de concerto deve trazer':'Qué debe incluir cada página de concierto','Data e local':'Fecha y lugar','Divulgação':'Divulgación','Serviço':'Servicio',
      'Memória':'Memoria','Estilo Polaroid':'Estilo Polaroid','Álbuns em destaque':'Álbumes destacados','Concerto':'Concierto','Ensaio':'Ensayo','Bastidores':'Bastidores','Naipe':'Sección','Sugestão':'Sugerencia','Álbuns recomendados':'Álbumes recomendados','Concertos':'Conciertos','Ensaios':'Ensayos',
      'Bastidores & novidades':'Bastidores y novedades','Notícias':'Noticias','Editorial':'Editorial','Publicações da BSU':'Publicaciones de la BSU','Educação':'Educación','Extensão cultural':'Extensión cultural',
      'Solicitar entrevista':'Solicitar entrevista','Fotos em alta resolução':'Fotos en alta resolución','Publicações':'Publicaciones','Releases de imprensa':'Comunicados de prensa','Produção':'Producción','Profissionalização':'Profesionalización','Materiais que faltam':'Materiales pendientes','Release curto':'Comunicado corto','Release completo':'Comunicado completo','Banco de imagens':'Banco de imágenes',
      'Fale conosco':'Contáctenos','Mensagem':'Mensaje','Envie uma solicitação':'Envía una solicitud','Entre em contato com a equipe da BSU para dúvidas institucionais, imprensa, apresentações, parcerias e apoio cultural.':'Contacta al equipo de la BSU para dudas institucionales, prensa, presentaciones, alianzas y apoyo cultural.','Enviar e-mail':'Enviar correo','Informações':'Información','Canais':'Canales','Caminhos rápidos':'Accesos rápidos','O que você precisa?':'¿Qué necesitas?','Solicitação de apresentação e orçamento.':'Solicitud de presentación y presupuesto.','Apoio institucional, cotas e relacionamento.':'Apoyo institucional, cotas y relación.',
      'Contratação':'Contratación','Booking e Agendamento de Concertos':'Contratación y Agenda de Conciertos','Solicitação':'Solicitud','Solicite um orçamento':'Solicita un presupuesto','Envie os dados do evento para que a equipe da BSU avalie disponibilidade, formato de apresentação, repertório, estrutura e logística.':'Envía los datos del evento para que el equipo de la BSU evalúe disponibilidad, formato de presentación, repertorio, estructura y logística.','Enviar solicitação':'Enviar solicitud','Fluxo':'Flujo','Como funciona':'Cómo funciona','Atendimento':'Atención','Documentos':'Documentos','Materiais de apoio':'Materiales de apoyo','Repertório':'Repertorio','Logística':'Logística','Falar com a equipe':'Hablar con el equipo','Possibilidades':'Posibilidades','Modelos de apoio':'Modelos de apoyo','Cota':'Cota','Ouro':'Oro','Prata':'Plata'
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

  function skip(node) {
    const parent = node.parentElement;
    return !parent || parent.closest('script,style,noscript,code,.language-switch');
  }

  function applyText(root, lang) {
    if (lang === 'pt') return;
    const map = text[lang] || {};
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (skip(node)) return;
      let value = node.nodeValue;
      const trimmed = value.trim();
      if (!trimmed) return;
      if (map[trimmed]) {
        node.nodeValue = value.replace(trimmed, map[trimmed]);
        return;
      }
      keys.forEach(key => {
        if (key.length >= 4 && value.includes(key)) value = value.split(key).join(map[key]);
      });
      node.nodeValue = value;
    });
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

  if (lang !== 'pt') {
    let pending = false;
    const observer = new MutationObserver(mutations => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(() => {
        mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) applyText(node, lang);
        }));
        keepLanguageOnLinks(lang);
        pending = false;
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

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
