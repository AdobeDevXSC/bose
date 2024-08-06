import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  console.log(block);

  const pPic = document.createElement('div');
  pPic.classList.add('product-pic');

  const pDesc = document.createElement('div');
  pDesc.classList.add('product-desc');

  const classes = ['title', 'price', 'swatches'];
  let n = 0;
  [...block.children].forEach((row) => {
    if (row.querySelector('picture'))
      pPic.append(row);
    else {
      row.classList.add(classes[n++]);
      pDesc.append(row)
    }
  });

  const title = pDesc.querySelector('p');
  const titleH1 = document.createElement('h1');
  titleH1.textContent = title.textContent;

  // const hr = document.createElement('hr');
  // pDesc.prepend(hr);

  pDesc.querySelector('.title').prepend(titleH1);
  moveInstrumentation(title, titleH1);
  title.remove();

  let colors = pDesc.querySelector('.swatches');

  if (colors) colors = colors.textContent.trim().split(',');
  console.log(colors);

  const itemDiv = pDesc.querySelector('.swatches > div');
  if (colors) {
    colors.forEach((color) => {
      const span = document.createElement('span');
      span.classList.add('color-swatch');
      span.setAttribute('style', `background-color:#${color}`);
      span.classList.add(color);
      itemDiv.append(span);
    });
  }

  let pp = pDesc.querySelector('.swatches > div > p');
  pp.remove();

  block.append(pPic);
  block.append(pDesc);
}