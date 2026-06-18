(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.createElement('div');
  overlay.className = 'score-page-turn';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

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
