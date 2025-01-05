function clearShips() {
    const images = document.getElementsByTagName('img');
    for (const image of images) {
      image.src = '';
      image.alt = '';
      image.classList.add('hidden');
      image.classList.remove('mark-image');
    }
    const allGrids = document.getElementsByClassName('grid-box');
    for (const grid of allGrids) {
      grid.classList.add('grid-box-hover');
    }
  }
  
  function mapShips(ship) {
    switch (ship) {
      case 0: return '11';
      case 1: return '12';
      case 2: return '13';
      case 3: return '14';
      case 4: return '21';
      case 5: return '22';
      case 6: return '23';
      case 7: return '24';
      case 8: return '31';
      case 9: return '32';
      case 10: return '33';
      case 11: return '34';
      case 12: return '41';
      case 13: return '42';
      case 14: return '43';
      case 15: return '44';
    }
  }
  
  function mapSea(allGrids) {
    for (const grid of allGrids) {
      gridImage = document.querySelector(`#grid-${grid}>img`);
      gridImage.src = 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp';
      gridImage.alt = 'sea';
    }
  }
  
  function assignShips() {
    const ships = [];
    let random = 0;
    for (let i=0; i < 5; i++) {
      random = Math.floor(Math.random() * 16);
      if (ships.includes(random)) {
        i--;
        continue;
      }
      ships.push(random);
    }
  
    let idValue = '';
    let grid;
    let allGrids = ['11', '12', '13', '14',
                      '21', '22', '23', '24',
                      '31', '32', '33', '34',
                      '41', '42', '43', '44'];
    for (const ship of ships) {
      idValue = mapShips(ship);
      grid = document.querySelector(`#grid-${idValue}>img`);
      grid.src = 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png';
      grid.alt = 'ship';
      allGrids = allGrids.filter((item) => item != idValue);
    }
    mapSea(allGrids);
  }
  
  
  let clickCounts = 0;
  let corrects = 0;
  const resetBtn = document.querySelector('#reset');
  resetBtn.addEventListener('click', () => {
    clickCounts = 0;
    corrects = 0;
    clearShips();
    assignShips();
    }
  );
  document.body.onload = resetBtn.click();
  
  const gameAreaDiv = document.querySelector('.game-area');
  const allGrids = gameAreaDiv.getElementsByTagName('div');
  for (const grid of allGrids) {
    grid.addEventListener('click', gridSelect);
  }
  
  function gridSelect(event) {
    clickCounts++;
    event.target.classList.remove('grid-box-hover');
    const gridImage = event.target.getElementsByTagName('img')[0];
    gridImage.classList.remove('hidden');
    gridImage.classList.add('mark-image');
    if (gridImage.alt == 'ship')
      corrects++;
    if (corrects == 5) 
      showResult(true);
    else if (clickCounts == 8)
      showResult(false);
  }
  
  function showResult(result) {
    const images = document.getElementsByTagName('img');
    for (const image of images) {
      image.classList.remove('hidden');
    }
  
    const newDialog = document.createElement('dialog');
    document.body.append(newDialog);
    
    const newBtn = document.createElement('button');
    newBtn.id = 'dialog-button';
    newBtn.innerText = (result)? 'Cool':'Sad';
    newBtn.addEventListener('click', () => closeDialog(newDialog));
  
    const newH = document.createElement('h2');
    newH.innerHTML = getResult(result);
    newH.id = 'dialog-heading';
  
    const newP = document.createElement('p');
    newP.innerHTML = getText(result);
    newP.id = 'dialog-para';
    
    newDialog.appendChild(newBtn);
    newDialog.appendChild(newH);
    newDialog.appendChild(newP);
  
    newDialog.showModal();
  }
  
  function getResult(result) {
    if (result)
      return 'You Won!';
    return 'You Lost!';
  }
  function getText(result) {
    if (result)
      return 'All Ships Found.';
    return 'Clicks Completed.';
  }
  
  function closeDialog(dialog) {
    document.body.removeChild(dialog);
    dialog.close();
    resetBtn.click();
  }
  