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

(function init() {
  escapeCodeBlocks();
  formatCodeBlocks();
  hljs.initHighlightingOnLoad();
})();
