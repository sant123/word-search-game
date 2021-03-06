const { JSDOM } = require('jsdom');

function prepareForPrint(document) {
  let html = '<head>\n';

  const headTags = document.getElementsByTagName('head');

  if (headTags.length > 0) {
    html += headTags[0].innerHTML;
  }

  html += '\n</head>\n<body>\n';

  const printReadyElem = document.getElementById('printReady');

  if (printReadyElem != null) {
    html += printReadyElem.innerHTML;
  }

  html += '\n</body>';

  document.documentElement.innerHTML = html;
}

function removeExtraContent(document) {
  const scripts = document.getElementsByTagName('script');

  for (const script of scripts) {
    script.remove();
  }

  document.querySelector('table').remove();
  document.getElementById('code').remove();
  document.getElementById('paused').remove();

  // Remove rule html,body with height 100%
  const firstStyleElement = document.getElementsByTagName('style')[0];
  firstStyleElement.textContent = firstStyleElement.textContent.replace(/html,body{[^}]+}/, '').trim();
}

exports.prepareHTML = function (htmlString) {
  const dom = new JSDOM(htmlString);
  const { document } = dom.window;

  prepareForPrint(document);
  removeExtraContent(document);

  return dom.serialize();
};
