
const startTagOpen = /^<([a-zA-Z_][\w\-]*)/;
const startTagClose = /^\s*(\/)?>/
const attribute = /^\s*([^\s"'=<>\/]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>\/`]+)))?/;

export function parseHTML(html, options) {
  const textEnd = html.indexOf('<');

  if (textEnd === 0) {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tag: start[1],
        attrs: []
      };

      html = html.slice(1 + match.tag.length);

      let attr;
      while (attr = html.match(attribute)) {
        match.attrs.push(attr);
        html = html.slice(attr[0].length);
      }

      const startClose = html.match(startTagClose);
      html = html.slice(startClose.length);
      options.start(match.tag, match.attrs, !!startClose[1]);
    }
  }

  if (textEnd <= 0) {

  }
}
