const instructorCards = document.querySelectorAll(`.instructor`);
const instructorBios = document.querySelectorAll(`.instructor-bio > p`);
let showChar = 150;
let ellipsestext = `...`;

instructorBios.forEach(biography => {
  let content = biography.innerHTML;
  if(content.length > showChar) {
    let contentToShow = content.substr(0, showChar);
    let contentToHide = content.substr(showChar - 1, content.length - showChar);
    let html = contentToShow + `<span class="bio-ellipses">${ ellipsestext }</span>
      <span class="hidden-text">${ contentToHide }</span>`;
    biography.innerHTML = html;
  }
});

function enlargeCard() {
  this.removeEventListener(`click`, enlargeCard);
  let cardNumber = this.getAttribute(`data-number`);
  let bioEllipses = this.querySelector(`.bio-ellipses`);
  let hiddenText = this.querySelector(`span.hidden-text`);
  let readMore = this.querySelector(`.read-more`);
  bioEllipses.innerHTML = ``;
  readMore.innerHTML = `Show Less`;
  readMore.classList.add(`show-less-active`);
  hiddenText.style.display = `block`;
  this.classList.add(`instructor-active`);
  this.classList.remove(`return-instructor`);

  if(cardNumber % 3 === 2) {
    this.classList.add(`middle-card-active`);
  } else if(cardNumber % 3 === 1) {
    this.classList.add(`left-card-active`);
  } else if(cardNumber % 3 === 0) {
    this.classList.add(`right-card-active`);
  }

  let activeCard = this;

  document.addEventListener(`click`, checkClick);
  readMore.addEventListener(`click`, function () {
    if(readMore.classList.contains(`show-less-active`)) {
      returnCard();
      activeCard.addEventListener(`click`, enlargeCard);
    }
  });

  function checkClick() {
    let isClickInside = activeCard.contains(event.target);
    if(!isClickInside) {
      returnCard();
      activeCard.addEventListener(`click`, enlargeCard);
      document.removeEventListener(`click`, checkClick);
      return;
    }
  }

  function returnCard() {
    activeCard.classList.remove(`instructor-active`);
    if(cardNumber % 3 === 2) {
      activeCard.classList.remove(`middle-card-active`);
    } else if(cardNumber % 3 === 1) {
      activeCard.classList.remove(`left-card-active`);
    } else if(cardNumber % 3 === 0) {
      activeCard.classList.remove(`right-card-active`);
    }
    activeCard.classList.add(`return-instructor`);
    activeCard.parentNode.style.removeProperty(`justify-self`);
    bioEllipses.innerHTML = ellipsestext;
    readMore.innerHTML = `Read More`;
    hiddenText.style.display = `none`;
    readMore.classList.toggle(`show-less-active`);
  }
}

for(let i = 0; i < instructorCards.length; i++) {
  instructorCards[ i ].addEventListener(`click`, enlargeCard);
  instructorCards[ i ].setAttribute(`data-number`, i + 1);
}

