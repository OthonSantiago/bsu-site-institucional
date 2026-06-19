(() => {
  function cleanText(value) {
    return value.replace(/\s*[—–]\s*/g, ' ');
  }

  function cleanNode(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      root.nodeValue = cleanText(root.nodeValue);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root !== document) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (parent && parent.closest('script,style,noscript,code')) return;
      node.nodeValue = cleanText(node.nodeValue);
    });
  }

  document.title = cleanText(document.title);
  cleanNode(document.body);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'characterData') cleanNode(mutation.target);
      mutation.addedNodes.forEach(cleanNode);
    });
    document.title = cleanText(document.title);
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();
