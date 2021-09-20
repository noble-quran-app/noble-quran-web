var loadStartedAt = Date.now(),
  documentElement = document.documentElement,
  storedTheme = localStorage.getItem('theme');

documentElement.setAttribute('no-scroll', '');

try {
  var className = JSON.parse(storedTheme)['className'];
  className && documentElement.classList.add(className);
} catch (error) {
  documentElement.classList.add('light-theme');
}

function removeSplash() {
  var splashNodes = Array.from(document.querySelectorAll('.splash'));
  for (var index = 0; index < splashNodes.length; index++) {
    if (splashNodes[index]) {
      splashNodes[index].parentElement.removeChild(splashNodes[index]);
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

function onLoadStart() {
  // Remove Splash immediately when on PWA
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    removeSplash();
  }
  document.removeEventListener('DOMContentLoaded', onLoadStart);
}

window.addEventListener('loadstart', onLoadStart);
window.addEventListener('routeloaded', onRouteLoad);
