const tagNameGroup = '([a-zA-Z_][\\w\\-]*)';
const startTagOpen = new RegExp(`^<${tagNameGroup}`);
const startTagClose = /^\s*(\/?>)/;
const endTag = new RegExp(`^</${tagNameGroup}>`);
const attribute = /^\s*([^\s"'=<>\/]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>\/`]+)))?/;
const comment = /^<!--([^<>!-]*)-->/;

export function parseHTML(html, options) {
  while (html) {
    let textEnd = html.indexOf('<');

    if (textEnd === 0) {
      const start = html.match(startTagOpen);
      if (start) {
        const match = {
          tag: start[1],
          attrs: []
        };

        advance(1 + match.tag.length);

        let attr;
        while (attr = html.match(attribute)) {
          match.attrs.push(attr);
          advance(attr[0].length)
        }

        const startClose = html.match(startTagClose);
        advance(startClose[1].length);
        options.start(match.tag, match.attrs, startClose[1].length === 2);
      }
      const end = html.match(endTag);
      if (end) {
        options.end(end[1]);
        advance(3 + end[1].length)
      }
      const commentContent = html.match(comment);
      if (commentContent) {
        options.comment(commentContent[1]);
        advance(7 + commentContent[1].length)
      }
    }

    if (textEnd >= 0) {
      const rest = html.substring(textEnd);
      if (startTagClose.test(rest) || endTag.test(rest)) {
        const text = html.substring(0, textEnd).trim();
        if (text) {
          options.chars(text);
        }
      }
      advance(textEnd);
    }
  }

  function advance(n) {
    html = html.slice(n);
  }
}
