import { debounce } from './debounce.js';

/**
 * grabs all of the elements you want to slide in and puts them into an array to cycle through
 */
const sliderImages = document.querySelectorAll(`.slide-in`);

function checkSlide(e) {
  /**
   * using a forEach to cycle through each of the elements you want to have the slide-in effect
   */
  sliderImages.forEach(slideImage => {
    /**
     * window.scrollY returns how many pixels you have scrolled down.
     * window.innerHeight returns the height of the viewport
     * window.scrollY + window.innerHeight returns what pixel bottom of viewport is at
     */
    let viewportBottom = window.scrollY + window.innerHeight;

    function offset(element) {
      var rect = element.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    }
    var topOfImage = offset(slideImage);

    var slideInAt = topOfImage + slideImage.height * 0.2;
    /*
     * console.log(`top of image = ${ topOfImage }`);
     * console.log(`viewportBottom = ${ viewportBottom }`);
     * console.log(`slideInAt = ${ slideInAt }`);
     */

    /**
     * A Boolean to check once the slide in point has passed the top of the image.
     */
    let isHalfShown = viewportBottom > slideInAt;
    console.log(`isHalfShown = ${ isHalfShown }`);

    /**
     * adds .active class once isHalfShown === true;
     */
    if(isHalfShown) {
      slideImage.classList.add(`active`);
    }
  });
}

/**
 * add event listener 'scroll' to the window object
 * Tell it to run the debounce function (which takes a function as an argument) on each scroll.
 */
window.addEventListener(`scroll`, debounce(checkSlide, 10));