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
  showAllProgram();
  let className = this.classList[ 1 ];
  let classCellChildrenStatus = [];
  classCells.forEach(classCell => {
    let classCellChildren = classCell.childNodes;
    if(classCellChildren.length === 0) {
      classCell.dataset.currentState = `empty`;
      classCellChildrenStatus.push(`empty`);
    } else {
      classCellChildrenArray = [];
      classCellChildren.forEach(classCellChild => {
        if(classCellChild.classList.contains(className)) {
          classCellChild.classList.add(`grow-class`);
          classCellChild.classList.remove(`shrink-class`);
          classCellChildrenArray.push(`full`);
        } else {
          classCellChild.classList.add(`shrink-class`);
          classCellChild.classList.remove(`grow-class`);
          classCellChildrenArray.push(`empty`);
        }
      });
      if(classCellChildrenArray.includes(`full`)) {
        classCellChildrenStatus.push(`full`);
      } else {
        classCellChildrenStatus.push(`empty`);
      }
    }
  });
  checkRow(classCellChildrenStatus);
}

showAll.addEventListener(`click`, showAllProgram);

function showAllProgram() {
  courses.forEach(course => {
    course.classList.add(`grow-class`);
  });
  classCells.forEach(classCell => {
    classCell.classList.add(`grow-cell`);
    classCell.classList.remove(`shrink-cell`);
  });
  rowList.forEach(rowListTime => {
    rowListTime.classList.add(`grow-cell`);
    rowListTime.classList.remove(`shrink-cell`);
    rowListTime.firstChild.style.display = ``;
  });
}

function checkRow(classesArray) {
  let rowsArray = [];
  let i = 0;

  while(classesArray.length > 0) {
    let checkRow = classesArray.splice(0, colNum);
    rowsArray.push(checkRow);
  }

  rowsArray.forEach(row => {
    if(!row.includes(`full`)) {
      rowList[ i ].classList.toggle(`grow-cell`);
      rowList[ i ].classList.toggle(`shrink-cell`);
      rowList[ i ].firstChild.style.display = `none`;
    }
    i++;
  });

  emptyRows();

}

function emptyRows() {
  let updatedRowList = document.querySelectorAll(`.time-slot`);

  for(i = 0; i < updatedRowList.length; i++) {
    if(updatedRowList[ i ].classList.contains(`shrink-cell`)) {
      let k = updatedRowList[ i ].nextElementSibling;

      for(j = 0; j < colNum; j++) {
        k.classList.toggle(`grow-cell`);
        k.classList.toggle(`shrink-cell`);
        console.log(k);
        k = k.nextElementSibling;
      }
    }
  }
}
