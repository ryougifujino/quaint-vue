import {parseHTML} from "./core/compiler/parser/html-parser.js";

const htmlExample = `
<div style="color: red" id="app" data-e32f6>

</div>
`;

parseHTML(htmlExample.trim(), {
  start(tag, attrs, unary) {
    console.log('start()', `tag: ${tag}, attrs: ${JSON.stringify(attrs)}, unary: ${unary}`);
  },
  end() {

  },
  chars(text) {

  },
  comment(text) {

  }
});
