import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  let i = 0;
  const content = document.createElement('div');
  content.classList.add('teaser-content');
  [...block.children].forEach((row) => {
    if (i === 1) {
      const p = row.querySelector('p');
      const h2 = document.createElement('h2');
      h2.textContent = p.textContent;
      moveInstrumentation(p, h2);
      p.replaceWith(h2);
    }

    if (i >= 1) {
      content.append(row);
    }
    i += 1;
  });

  const style = content.querySelector('div:nth-child(5)');
  const className = style.querySelector('p');
  block.classList.add(className.textContent);
  style.remove();
 
  block.append(content);
}