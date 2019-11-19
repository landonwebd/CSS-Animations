// window.onscroll = function() {
//   myFunction();
// };

// function myFunction() {
//   /**
//    * The scrollTop() method sets or returns the vertical scrollbar position 
//    * for the selected elements.
//    * 
//    * The body method returns the <body> element. the documentElement returns the <html> element
//    */

//   if (document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500 ) {
//     document.querySelector(".card-image, .card-text").className += " slide-in";
//   }
// // }



// window.onscroll = function() {
//   this.animation();
// }

// function animation() {
//   if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000 ) {
//     document.querySelector('.card').className = ' slide-in';
//   }
// }

function debounce( func, wait = 5, immediate = true ) {
  let timeout;
  return function () {
    let context = this
    let args = arguments;
    let later = function () {
      timeout = null;
      if( !immediate ) func.apply( context, args );
    }
    let callNow = immediate && !timeout;
    clearTimeout( timeout );
    timeout = setTimeout( later, wait );
    if( callNow ) func.apply( context, args );
  };
}

const sliderImages = document.querySelectorAll( `.slide-in` );

function checkSlide( e ) {
  console.log( `You have scrolled down ${ window.scrollY } pixels` );
  console.log( `The bottom of the viewport is currently ${ window.scrollY + window.innerHeight } pixels from the top of the window` );
  sliderImages.forEach( slideImage => {
    console.log( `The offsetTop of the image is ${ slideImage.offsetTop } pixels` );
    console.log( `The height of the image is ${ slideImage.height } pixels` )
    // half way through the image
    const slideInAt = ( window.scrollY + window.innerHeight ) - slideImage.height * 0.5;
    // bottom of the image
    const imageBottom = slideImage.offsetTop + slideImage.height;

    const isHalfShown = slideInAt > slideImage.offsetTop;

    if( isHalfShown ) {
      slideImage.classList.add( 'active' );
    }
  } )

}

window.addEventListener( `scroll`, debounce( checkSlide ) );