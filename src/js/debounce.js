
/**
 * @param {function} func - The function to add delay to
 * @param {number} wait - The time in milliseconds between function firing.
 * @param {boolean} immediate - If this function should run on page load
 */
function debounce(func, wait = 200, immediate = true) {
  let timeout;
  return function () {
    let context = this;

    /**
     * The arguments object is an array-like object. It has a length property that corresponds to 
     * the number of arguments passed into the function. You can access these values by indexing 
     * into the array, e.g. arguments[0] is the first argument. 
     */

    let args = arguments;
    let later = function () {
      timeout = null;
      if(!immediate) func.apply(context, args); // https://www.w3schools.com/js/js_function_apply.asp
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  };
}

export { debounce };