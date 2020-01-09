let programs = document.querySelectorAll(`.program-name`);
let courses = document.querySelectorAll(`.class > span`);
let classCells = document.querySelectorAll(`.class`);
let showAll = document.querySelector(`.show-all`);
let rowList = document.querySelectorAll(`.time-slot`);
let colNum = document.querySelector(`.schedule-container`).dataset.colnum;

programs.forEach(program => {
  program.addEventListener(`click`, removeProgram);
});

function removeProgram() {
  let className = this.classList[ 1 ];
  courses.forEach(course => {
    if(course.classList.contains(className)) {
      course.style.display = `block`;
    } else {
      course.style.display = `none`;
    }
  });
  reduceHeight(className);
  checkRow();
}

showAll.addEventListener(`click`, showAllProgram);

function showAllProgram() {
  courses.forEach(course => {
    course.style.display = `block`;
  });
  classCells.forEach(classCell => {
    classCell.style.display = ``;
  });
  rowList.forEach(rowListTime => {
    rowListTime.style.display = ``;
  });
}

function reduceHeight(activeClass) {
  classCells.forEach(classCell => {
    let classCellsChildren = classCell.childNodes;
    let classCellClass = 0;
    classCellsChildren.forEach(courseChild => {
      if(courseChild.classList.contains(activeClass)) {
        classCellClass = classCellClass + 1;
      }
    });
    if(classCellClass === 0) {
      classCell.style.display = `none`;
    } else {
      classCell.style.display = ``;
    }
  });
}

function checkRow() {
  let rowArray = [];
  for(i = 0; i < classCells.length; i++) {
    if(classCells[ i ].style.display === `none`) {
      rowArray.push(`none`);
    } else {
      rowArray.push(`full`);
    }
  }

  let rowChunkArray = [];
  while(rowArray.length > 0) {
    let rowChunk;
    rowChunk = rowArray.splice(0, colNum);
    rowChunkArray.push(rowChunk);

  }

  let activeRow = 0;
  rowChunkArray.forEach(rowChunk => {
    if(rowChunk.includes(`full`)) {
      rowList[ activeRow ].style.display = ``;
    } else {
      rowList[ activeRow ].style.display = `none`;
    }
    activeRow = activeRow + 1;

  });

}
