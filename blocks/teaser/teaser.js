import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  let i = 0;
  console.log(block.children.length);
  [...block.children].forEach((row) => {
    if (i === 1) {
      const p = row.querySelector('p');
      const h2 = document.createElement('h2');
      h2.textContent = p.textContent;
      moveInstrumentation(p, h2);
      p.replaceWith(h2);
      console.log(h2);
    }

    if(i === block.children.length - 1) {
      const style = row.querySelector('p');
      block.classList.add(style.textContent);
    }
    console.log(row);
    i += 1;
  });
  console.log(block)
}