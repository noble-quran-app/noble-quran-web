var loadStartedAt = new Date().getTime(),
  html = document.querySelector('html'),
  storedTheme = localStorage.getItem('theme');

try {
  var className = JSON.parse(storedTheme)['className'];
  className && html.classList.add(className);
} catch (error) {
  html.classList.add('light-theme');
}

function removeSplash() {
  var splashNodes = Array.from(document.querySelectorAll('.splash'));
  for (var index = 0; index < splashNodes.length; index++) {
    if (splashNodes[index]) {
      splashNodes[index].parentElement.removeChild(splashNodes[index]);
    }
  }
  document.dispatchEvent(new CustomEvent('splash'));
  document.removeEventListener('routeloaded', removeSplash);
}

function onRouteLoad() {
  var currentTime = new Date().getTime();
  var timeGap = 1500 - (currentTime - loadStartedAt);
  setTimeout(removeSplash, timeGap);
}

function onContentLoaded() {
  // Remove Splash when on PWA
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    removeSplash();
  }
  document.removeEventListener('DOMContentLoaded', onContentLoaded);
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
document.addEventListener('routeloaded', onRouteLoad);
