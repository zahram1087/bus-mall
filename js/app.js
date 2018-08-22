'use strict';

var rightItemEl = document.getElementById('right-image');
var centerItemEl = document.getElementById('center-image');
var leftItemEl = document.getElementById('left-image');
var divEl = document.getElementById('product-item');
var allItems = [];
var votes = [];
var titles = [];



function Product(name, timesShown, votes) {
  this.name = name;
  this.timesShown = timesShown || 0;
  this.votes = votes || 0;
  this.path = `img/${name}.jpg`; //remember to call the file path correctly! imag not images!

  allItems.push(this);
}

var allProductItems = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function checkLocalStorage() {
  if (localStorage.getItem('finishedGame')) {
    var retrievedItems = JSON.parse(localStorage.getItem('finishedGame'));
    console.log('retreieved', retrievedItems);
    retrievedItems.forEach(function(productItem) {
      new Product( productItem.name, productItem.timesShown, productItem.votes);
    });
  }
  else {
    allProductItems.forEach(function(productItem) {
      new Product(productItem);
    });
  }
}
checkLocalStorage();


//FUNCTION TO UPDATE CHART

function updateChartArray() {
  for (var i = 0; i < allItems.length; i++) {
    titles[i] = allItems[i].name;
    votes[i] = allItems[i].timesShown;
  }

}



// makinga function to store all the color for the backgroundColor
var colorChart = [];
function populateColors() {
  for (var allItemsIndex = 0; allItemsIndex < allItems.length; allItemsIndex++) {
    var differentColor = 'purple';
    colorChart.push(differentColor);
  }

}


var data = {
  labels: titles,
  datasets: [
    {
      label: 'Preferences',
      data: votes,
      backgroundColor: colorChart,
      borderWidth: 1
    }
  ]

};

function drawChart() {
  var ctx = document.getElementById('myProducts').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      legend: {
        fontColor: 'darkgreen',
        fontSize: 18
      }
    },
    responsive: false,
    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0

        }
      }]
    }
  });
}

function hideChart() {
  document.getElementById('myProducts').hidden = true;
}


// Getting the items to display
var userClicks = 0;
var endClicks = function () {
  if (userClicks === 25) {
    divEl.removeEventListener('click', showRandomItem);
    updateChartArray();
    console.log(votes);
    populateColors();
    drawChart();
    localStorage.setItem('finishedGame', JSON.stringify(allItems));
  }
  //need to call this functio inside the event listener
};

var usedItems = [];
function showRandomItem(event) {

  var rando1 = Math.floor(allItems.length * Math.random());
  usedItems.push(rando1);
  rightItemEl.src = allItems[rando1].path;
  rightItemEl.title = allItems[rando1].name;
  allItems[rando1].timesShown++;

  var rando2 = Math.floor(allItems.length * Math.random());
  while (usedItems.includes(rando2)) {
    rando2 = Math.floor(allItems.length * Math.random());
  }
  centerItemEl.src = allItems[rando2].path;
  centerItemEl.title = allItems[rando2].name;
  allItems[rando2].timesShown++;
  usedItems.push(rando2);


  var rando3 = Math.floor(allItems.length * Math.random());
  while (usedItems.includes(rando3)) {
    rando3 = Math.floor(allItems.length * Math.random());
  }
  leftItemEl.src = allItems[rando3].path;
  leftItemEl.title = allItems[rando3].name;
  allItems[rando3].timesShown++;
  usedItems.push(rando3);


  if (usedItems.length > 6) {
    usedItems.splice(0, 3);
  }
  userClicks++;
  endClicks();
}

showRandomItem();

function handleClick(event) {
  for (var i = 0; i < allItems.length; i++) {
    if (event.target.title === allItems[i].name){
      allItems[i].votes++;
    }
  }
  showRandomItem();
}


divEl.addEventListener('click', handleClick);

//displaying the chart
document.getElementById('myProducts').addEventListener('click', function () {
  document.getElementById('myProducts').hidden = true;
});



function renderAllItems() {
  for (var i = 0; i < allItems.length; i++) {
    allItems[i].render;
  }
}
renderAllItems();


