// Only the unqualified entry address chooses a language automatically.
// Explicit language links always keep the language in their URL.
(() => {
  if (window.location.pathname !== '/') return;
  let language;
  try { language = window.localStorage.getItem('jal-preferred-language'); } catch {}
  if (language !== 'en' && language !== 'pt') {
    const preferences = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
    const supported = preferences.find(value => /^(en|pt)(-|$)/i.test(value));
    language = supported ? supported.slice(0, 2).toLowerCase() : 'pt';
  }
  if (language === 'pt') {
    const destination = new URL('pt/index.html', window.location.href);
    destination.search = window.location.search;
    destination.hash = window.location.hash;
    window.location.replace(destination.href);
  }
})();
