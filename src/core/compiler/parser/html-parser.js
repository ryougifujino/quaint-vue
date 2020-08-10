const tagNameGroup = '([a-zA-Z_][\\w\\-]*)';
const startTagOpen = new RegExp(`^<${tagNameGroup}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^</${tagNameGroup}>`);
const attribute = /^\s*([^\s"'=<>\/]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>\/`]+)))?/;
const comment = /^<!--([^<>!-]*)-->/;
const conditionalComment = /^<!\[/;
const doctype = /^<!DOCTYPE [^>]+>/i;

export function parseHTML(html, options) {
  while (html) {
    let textEnd = html.indexOf('<');

    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        handleStartTag(startTagMatch);
        continue;
      }

      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        options.end(endTagMatch[1]);
        continue;
      }

      const commentMatch = html.match(comment);
      if (commentMatch) {
        advance(commentMatch[0].length);
        if (options.shouldKeepComment) {
          options.comment(commentMatch[1]);
        }
        continue;
      }

      if (conditionalComment.test(html)) {
        const conditionalEnd = html.indexOf(']>');
        if (conditionalEnd >= 0) {
          advance(conditionalEnd + 2);
          continue;
        }
      }

      const doctypeMatch = html.match(doctype);
      if (doctypeMatch) {
        advance(doctypeMatch[0].length);
        continue;
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

  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tag: start[1],
        attrs: []
      };
      advance(start[0].length);

      let attr, end;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push(attr);
        advance(attr[0].length)
      }

      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        return match;
      }
    }
  }

  function handleStartTag(match) {
    options.start(match.tag, match.attrs, !!match.unarySlash);
  }
}
