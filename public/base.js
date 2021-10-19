var loadStartedAt = Date.now(),
  themes = ['light-theme', 'dark-theme'],
  documentElement = document.documentElement,
  storedTheme = localStorage.getItem('theme'),
  isStandalone = matchMedia && matchMedia('(display-mode: standalone)').matches,
  preferredTheme =
    matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? themes[1] : themes[0];

function removeSplash() {
  var nodes = Array.from(document.querySelectorAll('.splash'));
  if (!nodes.length) return;

  for (var idx = 0; idx < nodes.length; idx++) {
    if (nodes[idx] && nodes[idx].parentElement && nodes[idx].tagName !== 'SCRIPT') {
      nodes[idx].parentElement.removeChild(nodes[idx]);
    }
  }

  window.dispatchEvent(new CustomEvent('splashcomplete'));
  window.removeEventListener('routeloaded', removeSplash);
  documentElement.removeAttribute('no-scroll');
}

function onRouteLoad() {
  var currentTime = Date.now();
  var timeGap = 1500 - (currentTime - loadStartedAt);
  setTimeout(removeSplash, timeGap);
}

function init() {
  documentElement.setAttribute('no-scroll', 'true');

  try {
    var className = JSON.parse(storedTheme)['className'];
    className && documentElement.classList.add(className);
  } catch (error) {
    documentElement.classList.add(preferredTheme);
  }

  // Remove Splash immediately when is PWA (Standalone)
  isStandalone && removeSplash();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('routeloaded', onRouteLoad);

init();
