import {parseHTML} from "./core/compiler/parser/html-parser.js";

const htmlExample = `
<!DOCTYPE html>
<div style="color: red" id="app" data-e32f6>
  <!-- I am comment -->
  <![if !IE]<link href="non-ie.css" rel="stylesheet"><![endif]>
  <h1>Title</h1>
  <p>
    content1<<1.1
    content2
  </p>
</div>
`;

parseHTML(htmlExample.trim(), {
  shouldKeepComment: true,
  start(tag, attrs, unary) {
    console.log('start()', `tag: ${tag}, attrs: ${JSON.stringify(attrs)}, unary: ${unary}`);
  },
  end(tag) {
    console.log('end()', `tag: ${tag}`);
  },
  chars(text) {
    console.log('chars()', `text: "${text}"`);
  },
  comment(text) {
    console.log('comment()', `comment: ${text}`);
  }
});
