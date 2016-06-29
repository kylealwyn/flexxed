var entityMap = {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': '&quot;',
   "'": '&#39;',
   "/": '&#x2F;'
 };

function escapeHTML(string) {
   return String(string).replace(/[&<>"'\/]/g, function (s) {
     return entityMap[s];
   });
 }

function escapeCodeBlocks() {
  var sections = document.querySelectorAll('.page-section');
  [].forEach.call(sections, function (section) {
    var sectionCodeBlocks = section.querySelectorAll('.section-code');
    if (sectionCodeBlocks.length) {
      [].forEach.call(sectionCodeBlocks, function (codeBlock) {
        codeBlock.innerHTML = escapeHTML(codeBlock.innerHTML);
      })
    }
  });
}

function formatCodeBlocks() {
  [].forEach.call(document.querySelectorAll('code'), function($code) {
      var lines = $code.textContent.split('\n');

      if (lines[0] === '') {
          lines.shift()
      }

      var matches;
      var indentation = (matches = /^[\s\t]+/.exec(lines[0])) !== null ? matches[0] : null;
      if (!!indentation) {
        lines = lines.map(function(line) {
          line = line.replace(indentation, '')
          return line.replace(/\t/g, '    ')
        });

        $code.textContent = lines.join('\n').trim();
      }
  });
}

function toggleMenu() {

}

function createMenu() {
  var menuList = document.querySelector('.menu-list'),
      menuItems = document.querySelectorAll('a[name]'),
      menuToggle = document.querySelector('.menu-toggle');

  menuToggle.addEventListener('click', function () {
    var menu = document.querySelector('.menu');
    if (menu.classList.contains('menu-open')) {
      menu.classList.remove('menu-open');
      this.classList.remove('menu-toggle-open');
    } else {
      menu.classList.add('menu-open');
      this.classList.add('menu-toggle-open');
    }
  });

  [].forEach.call(menuItems, function (menuItem) {
    var menuText = menuItem.name.charAt(0).toUpperCase() + menuItem.name.slice(1);
    var anchor = document.createElement('a');
    anchor.href = '#' + menuText.toLowerCase();
    var listItemEl = document.createElement('li');
    listItemEl.classList.add('menu-list-item');
    listItemEl.innerHTML = '<a class="menu-list-link" href="#' + menuText.toLowerCase() + '""><a>' + menuText;
    menuList.appendChild(listItemEl)
  });
}

(function init() {
  createMenu();
  escapeCodeBlocks();
  formatCodeBlocks();
  hljs.initHighlightingOnLoad();
})();
