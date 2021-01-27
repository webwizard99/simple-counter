const buttons = {
  clear: '.clear-button'
}

// implement storage of counts. WIP. Needs setCounter mthds
const storage = (function(){
  let records = [];

  let hasStorage = true;


}());

const counterController = (function(){
  const DOM = {
    countersContainer: '.counters-container',
    newButton: '.new-button',
    newButtonContainer: '.new-button-container',
    newSelect: '.new-button-select'
  }
  const newButtonContainerStart = `
  <div class="new-button-container">
  `
  const newButton = `
    <div class="new-button button noselect"><p class="new-button-icon noselect">+</p></div>
  `
  const newSelectStart = `
  <select class="new-button-select">
  `
  const newOptionTemplate = `
  <option class="new-option" key="%key%" value="%count-type%">%type-display%</option>
  `
  const newSelectEnd = `
  </select>
  `
  const newButtonContainerEnd = `
  </div>
  `
  const counterTemplate = `
    <div id="%id%" class="counter-container button noselect" counter-id="%count-id%">
      <p class="button-type noselect">%button-type-display%</p>
      <div class="count-display noselect">%count%</div>
    </div>
  `
  const counterContentTemplate = `
    <p class="button-type noselect">%button-type-display%</p>
    <div class="count-display noselect">%count%</div>
  `

  const counterTypes = {
    singles: 'singles',
    doubles: 'doubles',
    triples: 'triples',
    quads: 'quads'
  }

  let counters = [];
  const maxCounters = 3;
  let nextId = 0;

  let countersReserve = [1, 2, 3, 4];
  const countersMap = {
    1: 'singles',
    2: 'doubles',
    3: 'triples',
    4: 'quads'
  }
  const reserveMap = {
    singles: 1,
    doubles: 2,
    triples: 3,
    quads: 4
  }

  const Counter = function(counterType, value) {
    if (!counterTypes[counterType]) return false;
    this.counterType = counterTypes[counterType];
    this.value = value;
    this.id = nextId;
    nextId++;
  }

  Counter.prototype.updateContent = function() {
    const thisDom = `#counter-${this.id}`;
    const counterDOM = document.querySelector(thisDom);
    let updatedCounter = counterContentTemplate;
    updatedCounter = updatedCounter.replace('%button-type-display%', this.counterType);
    updatedCounter = updatedCounter.replace("%count%", this.value);
    counterDOM.innerHTML = updatedCounter;
  }

  Counter.prototype.incrementCounter = function () {
    this.value ++;
  }

  Counter.prototype.clearCounter = function() {
    this.value = 0;
  }

  Counter.prototype.removeSelf = function() {
    const container = document.querySelector(DOM.countersContainer);
    const thisDom = `#counter-${this.id}`;
    container.removeChild(document.querySelector(thisDom));
    counters = counters.filter(counter => counter.id !== this.id);
    countersReserve.push(reserveMap[this.counterType]);
  }

  getNewButton = () => {
    let newButtonTemplate = newButtonContainerStart + newButton;
    newButtonTemplate += newSelectStart;
    if (countersReserve.length > 0) {
      countersReserve.forEach(counterReserve => {
        let newOption = newOptionTemplate;
        newOption = newOption.replace('%key%', counterReserve);
        newOption = newOption.replace('%count-type%', counterReserve);
        newOption = newOption.replace('%type-display%', countersMap[counterReserve]);
        newButtonTemplate += newOption
      });
    }
    newButtonTemplate += newSelectEnd;
    newButtonTemplate += newButtonContainerEnd;
    return newButtonTemplate;
  }

  return {
    addCounter: (e) => {
      // exit if max counters exist
      if (counters.length >= maxCounters) return;
      if (!e.target.classList.contains('new-button-select')) {
        e.preventDefault();
      }
      // create counter model
      const currentType = Number.parseInt(document.querySelector(DOM.newSelect).value);
      countersReserve = countersReserve.filter(reserveCounter => reserveCounter !== currentType);
      // const newCountType = countersReserve.shift();
      const newCounter = new Counter(countersMap[currentType], 0);
      counters.push(newCounter);
      // compose DOM for counter
      let newTemplate = counterTemplate.slice();
      newTemplate = newTemplate.replace('%id%', `counter-${newCounter.id}`);
      newTemplate = newTemplate.replace('%count-id%', newCounter.id);
      newTemplate = newTemplate.replace("%button-type-display%", newCounter.counterType);
      newTemplate = newTemplate.replace("%count%", newCounter.value);
      // manage new-button and new counter DOM in container
      let container = document.querySelector(DOM.countersContainer);
      const newButtonDOM = document.querySelector(DOM.newButtonContainer);
      if (newButtonDOM) {
        container.removeChild(newButtonDOM);
      }
      const newButtonHTML = getNewButton();
      container.innerHTML += newTemplate;
      if (counters.length < maxCounters) {
        container.innerHTML += newButtonHTML;
        relinkNewButton();
      }
      
    },
    addNewButton: () => {
      // manage new-button and new counter DOM in container
      let container = document.querySelector(DOM.countersContainer);
      const newButtonDOM = document.querySelector(DOM.newButtonContainer);
      if (newButtonDOM) {
        container.removeChild(newButtonDOM);
      }
      const newButtonHTML = getNewButton();
      if (counters.length < maxCounters) {
        container.innerHTML += newButtonHTML;
      }
    },
    clearCounters: () => {
      counters.forEach(counter => {
        counter.clearCounter();
        counter.updateContent();
      });
    },
    getDOMStrings: () => {
      return DOM;
    },
    incrementCounter: (e) => {
      console.log(e.target);
      // e.preventDefault();
      if (!e.target.classList.contains('new-button-select')) {
        e.preventDefault();
      }
      let targetCounter = e.target;
      if (targetCounter.classList.contains('main-container')) return;

      if (!e.target.classList.contains('counter-container')) {
        targetCounter = targetCounter.parentNode;
      }
      console.log(targetCounter);
      let counterId = targetCounter.getAttribute('counter-id');
      console.log(counterId);
      counterId = Number.parseInt(counterId);
      console.log(counterId);
      if (counterId === undefined) {
        console.log('invalid counter id!')
        return;
      }
      console.log(counters);
      let foundCounter = counters.find(counter => counter.id === counterId);
      console.log(foundCounter);
      if (!foundCounter) return;
      foundCounter.incrementCounter();
      foundCounter.updateContent();
    },
    handleSelect: (e) => {

    }
  }

}())


const clearCounts = () => {
  counterController.clearCounters();
}

const setEventListeners = () => {
  const DOM = counterController.getDOMStrings();
  document.querySelector(DOM.countersContainer).addEventListener('touchstart', counterController.incrementCounter);
  document.querySelector(DOM.newButton).addEventListener('touchstart', counterController.addCounter);
  document.querySelector(buttons.clear).addEventListener('touchstart', clearCounts);
}

const relinkNewButton = () => {
  const DOM = counterController.getDOMStrings();
  document.querySelector(DOM.newButton).addEventListener('touchstart', counterController.addCounter);
}

const init = () => {
  counterController.addNewButton();
  setEventListeners();
}

init();