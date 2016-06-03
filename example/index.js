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
  [].slice.call(sections).forEach(function (section) {
    var sectionExample = section.querySelector('.section-code');
    var sectionCode = section.querySelector('.section-code');
    sectionCode.innerHTML = escapeHTML(sectionCode.innerHTML);
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

(function init() {
  escapeCodeBlocks();
  formatCodeBlocks();
  hljs.initHighlightingOnLoad();
})();
