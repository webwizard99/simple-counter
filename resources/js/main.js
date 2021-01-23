const displays = {
  singles: '.singles-display',
  doubles: '.doubles-display',
  triples: '.triples-display',
  quads: '.quad-display'
}

const totalDisplays = {
  singles: '.singles-total-display',
  doubles: '.doubles-total-display',
  triples: '.triples-total-display',
  quads: '.quad-total-display'
}

const buttons = {
  singles: '.singles-button',
  doubles: '.doubles-button',
  triples: '.triples-button',
  quads: '.quad-button',
  clear: '.clear-button'
}

const incrementSingles = () => {
  const singles = document.querySelector(displays.singles);
  const singlesTotal = document.querySelector(totalDisplays.singles);
  let value = Number.parseInt(singles.innerHTML);
  value++;
  singles.innerHTML = value;
  singlesTotal.innerHTML = value;
}

const incrementDoubles = () => {
  const doubles = document.querySelector(displays.doubles);
  const doublesTotal = document.querySelector(totalDisplays.doubles);
  let value = Number.parseInt(doubles.innerHTML);
  value++;
  doubles.innerHTML = value;
  doublesTotal.innerHTML = value * 2;
}

const incrementTriples = () => {
  const triples = document.querySelector(displays.triples);
  const triplesTotal = document.querySelector(totalDisplays.triples);
  let value = Number.parseInt(triples.innerHTML);
  value++;
  triples.innerHTML = value;
  triplesTotal.innerHTML = value * 3;
}

const incrementQuads = () => {
  const quads = document.querySelector(displays.quads);
  const quadTotal = document.querySelector(totalDisplays.quads);
  let value = Number.parseInt(quads.innerHTML);
  value++;
  quads.innerHTML = value;
  quadTotal.innerHTML = value * 4;
}

const clearCounts = () => {
  const displayEles = Object.values(displays);
  const totalEles = Object.values(totalDisplays);
  displayEles.forEach(ele => {
    console.log(ele);
    document.querySelector(ele).innerHTML = 0;
  });
  totalEles.forEach(ele => {
    document.querySelector(ele).innerHTML = 0;
  });
}

const setEventListeners = () => {
  document.querySelector(buttons.singles).addEventListener('touchstart', incrementSingles);
  document.querySelector(buttons.doubles).addEventListener('touchstart', incrementDoubles);
  document.querySelector(buttons.triples).addEventListener('touchstart', incrementTriples);
  document.querySelector(buttons.quads).addEventListener('touchstart', incrementQuads);
  document.querySelector(buttons.clear).addEventListener('touchstart', clearCounts);
}

const init = () => {
  setEventListeners();
}

init();