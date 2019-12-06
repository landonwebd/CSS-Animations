const slidingCardsContainer = document.querySelector(`.sliding-cards-container`);
const slidingCards = document.querySelector(`.sliding-cards`);
const slidingCardsWidth = slidingCards.offsetWidth;
const viewportWidth = window.innerWidth;

/**
 * This function compares the width of the cards ul to the width of the
 * viewport. If it's less than 3x the viewport, it copies the card ul and
 * appends the copy to the end of the parent cards container;
 */
function duplicateCards() {
  let duplicateCardsWidth = slidingCardsWidth;
  do {
    let cardsToClone = slidingCards;
    let clonedCards = cardsToClone.cloneNode(true);
    slidingCardsContainer.appendChild(clonedCards);
    duplicateCardsWidth += slidingCardsWidth;
  }
  while(duplicateCardsWidth < viewportWidth * 3);
}

// Calling the duplicateCards function
duplicateCards();

/**
 * positionXstart stores starting mouse x position on click/touch.
 * positionXend stores current mouse position on move
 * mouseClick tracks if the mouse button is clicked or not
 */
let positionXstart;
let positionXend;
let mouseClick = false;

/**
 * Thie function captures the current mouse position and sets mouseClick to true.
 * Will be called on `mousedown` and `touchstart` events.
 */
const mouseDownFunction = function (e) {
  e.preventDefault;
  mouseClick = true;
  if(e.type === `touchstart`) {
    positionXstart = e.changedTouches[ 0 ].pageX - slidingCardsContainer.offsetLeft;
  } else if(e.type === `mousedown`) {
    positionXstart = e.clientX - slidingCardsContainer.offsetLeft;
  }
};

/**
 * The function compares current position of the mouse from where it started and updates 
 * the left style of the cards container.
 * Will be called on `mousemove` and `touchmove` events.
 * 
 * This function also checks if the mouse is moving left or right. When the container has passed
 * the left side of the viewport, it copies and removes a cards list.
 */

const mouseMoveFunction = function (e) {
  e.preventDefault;
  if(!mouseClick) {
    return;
  }
  if(e.type === `touchmove`) {
    positionXend = e.changedTouches[ 0 ].pageX;
  } else if(e.type === `mousemove`) {
    positionXend = e.clientX;
  }
  slidingCardsContainer.style.left = positionXend - positionXstart + `px`;
  let cardLeftPosition = slidingCardsContainer.offsetLeft;
  if(Math.abs(cardLeftPosition) - slidingCardsWidth >= 0) {
    let cards = document.querySelectorAll(`.sliding-cards-container > .sliding-cards`);
    let nodeToClone = cards[ 0 ];
    let clonedNode = nodeToClone.cloneNode(true);
    slidingCardsContainer.appendChild(clonedNode);
    nodeToClone.remove();
    slidingCardsContainer.style.left = `0px`;
  } else if(parseInt(slidingCardsContainer.style.left) > 0) {
    let cards = document.querySelectorAll(`.sliding-cards-container > .sliding-cards`);
    let nodeToClone = cards[ 0 ];
    let clonedNode = nodeToClone.cloneNode(true);
    slidingCardsContainer.prepend(clonedNode);
    let cardCount = cards.length;
    let nodeToRemove = cards[ cardCount - 1 ];
    nodeToRemove.remove();
    slidingCardsContainer.style.left = -slidingCardsWidth + `px`;
  }
};

/**
 * This function stops the function from the mousemove event from being fired.
 * Is called on mouseleave, mouseup, mouseenter, and touchend events. 
 */

const mouseClickFalse = function (e) {
  e.preventDefault;
  mouseClick = false;
};

slidingCardsContainer.addEventListener(`mousedown`, mouseDownFunction);
slidingCardsContainer.addEventListener(`touchstart`, mouseDownFunction);

slidingCardsContainer.addEventListener(`mousemove`, mouseMoveFunction);
slidingCardsContainer.addEventListener(`touchmove`, mouseMoveFunction);

slidingCardsContainer.addEventListener(`mouseleave`, mouseClickFalse);
slidingCardsContainer.addEventListener(`mouseup`, mouseClickFalse);
slidingCardsContainer.addEventListener(`mouseenter`, mouseClickFalse);
slidingCardsContainer.addEventListener(`touchend`, mouseClickFalse);