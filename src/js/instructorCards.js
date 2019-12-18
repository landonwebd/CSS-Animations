const instructorCards = document.querySelectorAll(`.instructor`);

function enlargeCard() {
  this.style.background = `green`;
}

for(let i = 0; i < instructorCards.length; i++) {
  instructorCards[ i ].addEventListener(`click`, enlargeCard);
}