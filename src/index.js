import morphdom from 'morphdom';
import { default as pugToHtmlStr } from './index.pug';
import './style.css';
import './script.js';

(() => {
  let root = document.getElementById('root'); 
  let newRoot = document.createRange().createContextualFragment(
    pugToHtmlStr()
  );
  return morphdom(root, newRoot, {
    onBeforeElUpdated: (fromEl, toEl) => (
      fromEl.isEqualNode(toEl) ? false : true
    ),
    childrenOnly: true
  });
})();

if (module.hot) {
  module.hot.accept(err => console.error(err));
}