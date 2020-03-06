document.addEventListener(
  'DOMContentLoaded', 
  () => document
    .querySelector('button')
    .addEventListener("click", btnClickHandler)
);

function btnClickHandler() {
  return alert('It works!');
}
