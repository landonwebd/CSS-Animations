/* eslint-disable */

let slidingCards = document.querySelector(`.sliding-cards`);
let cards = document.querySelectorAll(`.sliding-cards > li`);
const viewportWidth = window.innerWidth;
let cardsWidth = slidingCardsWidth(cards);


/** 
 * This function returns the width of all of the child elements'
 * widths added together.
 */
function slidingCardsWidth(cardsArray) {
  let cardsArrayWidth = 0;
  cardsArray.forEach(card => {
    cardsArrayWidth += (card.offsetWidth + 16);
  });
  return cardsArrayWidth;
};

/** 
 * Function cycles through each of the cards, cloning then and appending
 * them to the end of the parent node.
 * It then assigns the cards variable.
 */
function cloneCards(cardsArray) {
  cardsArray.forEach(card => {
    let clonedNode = card.cloneNode(true);
    slidingCards.appendChild(clonedNode);
  })
  cards = document.querySelectorAll(`.sliding-cards > li`);
};

/**
 * This function checks the widths of the cards and compares them to the
 * viewport. If it's less than 3x the viewport, it runs the cloneCards function and recalculates the width.
 */
function duplicateCards() {
  while(cardsWidth < viewportWidth * 3) {
    cloneCards(cards);
    cardsWidth = slidingCardsWidth(cards);
  }
}

// Calling the duplicateCards function
duplicateCards();

let positionXstart;
let positionXend;
let mouseClick = false;

slidingCards.addEventListener(`mousedown`, (e) => {
  e.preventDefault;
  mouseClick = true;
  positionXstart = e.pageX - slidingCards.offsetLeft;
})

slidingCards.addEventListener(`mousemove`, (e) => {
  e.preventDefault;
  if(!mouseClick) {
    return;
  }
  positionXend = e.clientX;
  slidingCards.style.left = (positionXend - positionXstart) + `px`;
})

slidingCards.addEventListener(`mouseup`, (e) => {
  e.preventDefault;
  mouseClick = false;
  let cardsLeft = slidingCards.offsetLeft;
  if(Math.abs(cardsLeft) > viewportWidth) {
    let firstNode = document.querySelector(`.sliding-cards > li`);
    let clonedNode = firstNode.cloneNode(true);
    slidingCards.appendChild(clonedNode);
    cards[ 0 ].remove();
    cards = document.querySelectorAll(`.sliding-cards > li`);
  }
})



/*
slide(slider, sliderCards, prev, next);

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    cards = items.querySelectorAll(`.card`),
    cardCount = cards.length,
    cardsWidth = items.querySelectorAll(`.card`)[ 0 ].offsetWidth,
    firstCard = cards[ 0 ],
    lastCard = cards[ cardCount - 1 ],
    cloneLast = lastCard.cloneNode(true),
    index = 0,
    allowShift = true;

  wrapper.classList.add(`loaded`);

  // Mouse and Touch events
  cards.onmousedown = dragStart;

  // Touch events
  items.addEventListener(`touchstart`, dragStart);
  items.addEventListener(`touchend`, dragEnd);
  items.addEventListener(`touchmove`, dragAction);

  // Click events
  prev.addEventListener(`click`, function () {
    shiftSlide(-1);
  });
  next.addEventListener(`click`, function () {
    shiftSlide(1);
  });

  // Transition events
  items.addEventListener(`transitionend`, checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = cards.offsetLeft;

    if(e.type === `touchstart`) {
      posX1 = e.touches[ 0 ].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if(e.type === `touchmove`) {
      posX2 = posX1 - e.touches[ 0 ].clientX;
      posX1 = e.touches[ 0 ].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    cards.style.left = (cards.offsetLeft - posX2) + `px`;
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if(posFinal - posInitial < -threshold) {
      shiftSlide(1, `drag`);
    } else if(posFinal - posInitial > threshold) {
      shiftSlide(-1, `drag`);
    } else {
      cards.style.left = (posInitial) + `px`;
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add(`shifting`);

    if(allowShift) {
      if(!action) {
        posInitial = cards.offsetLeft;
      }

      if(dir === 1) {
        items.style.left = (posInitial - cardsWidth) + `px`;
        index++;
      } else if(dir === -1) {
        items.style.left = (posInitial + cardsWidth) + `px`;
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove(`shifting`);

    if(index === -1) {
      items.style.left = -(cardCount * cardsWidth) + `px`;
      index = cardCount - 1;
    }

    if(index === cardCount) {
      items.style.left = -(1 * cardsWidth) + `px`;
      index = 0;
    }

    allowShift = true;
  }
}*/