'use strict';

var rightItemEl = document.getElementById('right-image');
var centerItemEl = document.getElementById('center-image');
var leftItemEl = document.getElementById('left-image');
var divEl = document.getElementById('product-item');
var allItems = [];

function Product(name) {
  this.name = name;
  this.timesShown = 0;
  this.path = `img/${name}.jpg`; //remember to call the file path correctly! imag not images!
  allItems.push(this);
}

var allProductItems = ['bag', 'banana', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

allProductItems.forEach(function (productItem) {
  new Product(productItem);
});



console.log(allItems);
var usedItems = [];

function showRandomItem(event) {

  var rando1 = Math.floor(allItems.length * Math.random());
  usedItems.push(rando1);
  rightItemEl.src = allItems[rando1].path;
  allItems[rando1].timesShown++;

  var rando2 = Math.floor(allItems.length * Math.random());
  while (usedItems.includes(rando2)) {
    rando2 = Math.floor(allItems.length * Math.random());
  }
  centerItemEl.src = allItems[rando2].path;
  allItems[rando2].timesShown++;
  usedItems.push(rando2);


  var rando3 = Math.floor(allItems.length * Math.random());
  while (usedItems.includes(rando3)) {
    rando3 = Math.floor(allItems.length * Math.random());
  }
  leftItemEl.src = allItems[rando3].path;
  allItems[rando3].timesShown++;
  usedItems.push(rando3);


  if (usedItems.length > 6) {
    usedItems.splice(0, 3);
  }
}

showRandomItem();



// Getting the items to display
var userClicks = 0;

var endClicks = function () {
  if (userClicks === 25) {
    divEl.innerHTML = '';
  }
  //need to call this functio inside the event listener
};

divEl.addEventListener('click', function (event) {
  console.log(event.target);
  showRandomItem(event);
  userClicks++;
  endClicks();
});

//displaying number of clicks
var getChoices = document.getElementById('choices-display');
Product.prototype.render = function () {
  var trEl = document.createElement('ul');
  var tdEl = document.createElement('li');
  tdEl.textContent = `${this.name} was shown ${this.timesShown}`;
  trEl.appendChild(tdEl);
  getChoices.appendChild(tdEl);

};

function renderAllItems() {
  for (var i = 0; i < allItems.length; i++) {
    allItems[i].render();
  }
}
renderAllItems();


