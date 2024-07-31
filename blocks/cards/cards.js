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
      console.log(anchor);
      const { href } = anchor
      // const resp = await fetch(`${href}.plain.html`);

      console.log(href);

      // const frag = await loadFragment(new URL(href).pathname);
      // console.log(frag);

      // const pic = frag.querySelector('picture');

      // const div = document.createElement('div');
      // div.className = 'cards-card-image';
      // div.appendChild(pic);
      // li.replaceChildren(div);
    }

    // [...li.children].forEach((div) => {
    //   if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
    //   else div.className = 'cards-card-body';
    // });
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
