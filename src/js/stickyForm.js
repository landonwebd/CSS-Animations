let stickyBox = document.querySelector(`.sticky-form`);
let formExpanded = document.querySelector(`.form-content`);
let closeButton = document.querySelector(`.close-triangle`);
let formTaglineP = document.querySelector(`.form-more-text p`);

/*
 * function expandStickyForm() {
 *  stickyBox.classList.add(`expanded`);
 *  formExpanded.classList.remove('hidden');
 * }
 */

function closeStickyForm() {
  stickyBox.classList.toggle(`expanded`);
  formExpanded.classList.toggle(`hidden`);
  formTaglineP.classList.toggle(`hidden`);
  console.log(stickyBox);
}

// stickyBox.addEventListener('click', expandStickyForm);
closeButton.addEventListener(`click`, closeStickyForm);

