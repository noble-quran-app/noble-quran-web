var loadStartedAt = new Date().getTime(),
  html = document.querySelector('html'),
  storedTheme = localStorage.getItem('theme');

try {
  var className = JSON.parse(storedTheme)['className'];
  className && html.classList.add(className);
} catch (error) {
  html.classList.add('nq-light-theme');
}

function removeSplash(removeNow) {
  if (removeNow.value) {
    var splashNodes = Array.from(document.querySelectorAll('.splash'));
    for (var index = 0; index < splashNodes.length; index++) {
      if (splashNodes[index]) {
        splashNodes[index].parentElement.removeChild(splashNodes[index]);
      }
    }

    document.dispatchEvent(new CustomEvent('splashcomplete'));
    document.removeEventListener('routeloaded', removeSplash);
    return;
  }

  var currentTime = new Date().getTime();
  var timeGap = 1500 - (currentTime - loadStartedAt);
  setTimeout(removeSplash, timeGap, { value: true });
}

document.addEventListener('routeloaded', removeSplash);
