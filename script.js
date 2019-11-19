
/**
 * @param {function} func - The function to add delay to
 * @param {number} wait - The time in milliseconds between function firing.
 * @param {boolean} immediate - If this function should run on page load
 */
function debounce( func, wait = 5, immediate = true ) {
  let timeout;
  return function () {
    let context = this

    /**
     * The arguments object is an array-like object. It has a length property that corresponds to 
     * the number of arguments passed into the function. You can access these values by indexing 
     * into the array, e.g. arguments[0] is the first argument. 
     */

    let args = arguments;
    let later = function () {
      timeout = null;
      if( !immediate ) func.apply( context, args ); // https://www.w3schools.com/js/js_function_apply.asp
    }
    let callNow = immediate && !timeout;
    clearTimeout( timeout );
    timeout = setTimeout( later, wait );
    if( callNow ) func.apply( context, args );
  };
}

/**
 * grabs all of the elements you want to slide in and puts them into an array to cycle through
 */
const sliderImages = document.querySelectorAll( `.slide-in` );

function checkSlide( e ) {
  /**
   * The .scrollY method returns how many pixels you have scrolled down.
   * the .innerHeight method returns the height of the viewport
   */
  console.log( `You have scrolled down ${ window.scrollY } pixels` );
  console.log( `The bottom of the viewport is currently ${ window.scrollY + window.innerHeight } pixels from the top of the window` );

  /**
   * using a forEach to cycle through each of the elements you want to have the slide-in effect
   */
  sliderImages.forEach( slideImage => {
    /**
     * The offsetTop property returns the top position (in pixels) relative to the top of the 
     * offsetParent element.
     */
    console.log( `The offsetTop of the image is ${ slideImage.offsetTop } pixels` );
    console.log( `The height of the image is ${ slideImage.height } pixels` )
    /**
     * We want the slide in to happen when the user has scrolled past half of the sliding element.
     * To calculate that, we get the current pixel count of the bottom the viewport. We then 
     * subtract half of the height of the image to get the pixel count we want the slide in to 
     * happen.
     */
    const slideInAt = ( window.scrollY + window.innerHeight ) - slideImage.height * 0.5;

    /**
     * A Boolean to once the slideInAt pixel count is finally bigger than the top position of
     * the element.
     */
    const isHalfShown = slideInAt > slideImage.offsetTop;

    /**
     * Once the isHalfShown is true, the function below triggers, adding the .active class to
     * the element, thus triggering the animation
     */

    if( isHalfShown ) {
      slideImage.classList.add( 'active' );
    }
  } )

}

/**
 * adding the event listener 'scroll' to the window object and telling it to run the debounce
 * function on each scroll.
 */
window.addEventListener( `scroll`, debounce( checkSlide ) );