import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach(async (row) => {

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    const anchor = li.querySelector('a');
    if (anchor) {
      const { href } = anchor;
      const frag = await loadFragment(new URL(href).pathname);
      if(frag) {
        const prod = frag.querySelector('.product');
        li.innerHTML = prod.innerHTML;
      }
    }

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });


    const item = li.querySelector('.cards-card-body:nth-last-child(1)');
    let colors = item.querySelector('p');
    if (colors) colors = colors.innerHTML.split(',');

    const itemDiv = document.createElement('div');
    if (colors) {
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('color-swatch');
        span.setAttribute('style', `background-color:#${color}`);
        span.classList.add(color);
        // span.innerHTML = color;
        itemDiv.append(span);
      });
    }
    item.replaceChildren(itemDiv);

    if (anchor) {
      anchor.textContent = 'ADD TO CART';
      li.append(anchor);
    }

    if (!anchor) {
      const i = document.createElement('i');
      i.classList.add('bif');
      i.classList.add('bif-calendar');
      li.append(i);
    }
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

}
