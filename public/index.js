'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(cars);
console.log(rentals);
console.log(actors);

//#region Step 1 - Euro-Kilometers
function fetchPrice(id2) {
  var priceCar = (cars).find(element => element.id == id2);
  return [priceCar.pricePerDay, priceCar.pricePerKm]
}

function dayDiff(d1, d2) {
  d1 = d1.getTime() / 86400000;
  d2 = d2.getTime() / 86400000;
  return new Number(d2 - d1).toFixed(0);
}

function computePrice() {
  rentals.forEach(element => {
    var returnDate = new Date(element.returnDate);
    var pickup = new Date(element.pickupDate)
    var duration = parseInt(dayDiff(pickup, returnDate));
    if (duration == 0)
      duration += 1
    element.price = duration * fetchPrice(element.carId)[0] + element.distance * fetchPrice(element.carId)[1];
  });
}

computePrice();
/*
Very interesting javascript behavior 
console.log() shows the changed value of a variable before the value actually changes
The behavior described by the OP is part of a bug that was first reported in March 2010,
patched for Webkit in August 2012, but as of this writing is not yet integrated into Google Chrome. 
The behavior hinges upon whether or not the console debug window is open or closed at the time the object
literal is passed to console.log().
https://stackoverflow.com/questions/11284663/console-log-shows-the-changed-value-of-a-variable-before-the-value-actually-ch
Console.log() is passed a reference to the object, 
so the value in the Console changes as the object changes. To avoid that we must do:
*/
console.log("Step 1", JSON.parse(JSON.stringify(rentals)))
//#endregion

//#region Step 2 - Drive more, pay less
function applyDiscountPrice() {
  rentals.forEach(element => {
    var returnDate = new Date(element.returnDate);
    var pickup = new Date(element.pickupDate)
    var duration = parseInt(dayDiff(pickup, returnDate)) + 1;
    if (duration <= 1)
      element.price *= 1
    else if (duration > 1 && duration <= 4)
      element.price *= 0.9
    else if (duration > 4 && duration <= 10)
      element.price *= 0.7
    else
      element.price *= 0.5
  });
}
applyDiscountPrice()
console.log("Step 2", JSON.parse(JSON.stringify(rentals)))
//#endregion

//#region Step 3 - Give me all your money
function payVirtuo() {
  rentals.forEach(element => {
    var returnDate = new Date(element.returnDate);
    var pickup = new Date(element.pickupDate)
    var duration = parseInt(dayDiff(pickup, returnDate));
    if (duration == 0)
      duration += 1
    element.commission = element.price * 0.3
    element.insurance = element.commission / 2
    element.treasury = duration
    element.virtuo = element.commission - element.insurance - element.treasury
  });
}
payVirtuo()
console.log("Step 3", JSON.parse(JSON.stringify(rentals)))
//#endregion

//#region Step 4 - The famous deductible
function applyDeductible() {
  rentals.forEach(element => {
    if (element.options.deductibleReduction) {
      var returnDate = new Date(element.returnDate);
      var pickup = new Date(element.pickupDate)
      var duration = parseInt(dayDiff(pickup, returnDate));
      if (duration == 0)
        duration += 1
      element.price += 4 * duration
      element.virtuo += 4 * duration
    }
  });
}
applyDeductible()
console.log("Step 4", JSON.parse(JSON.stringify(rentals)))
//#endregion

//#region Step 5 - Pay the actors
function fetchPriceByRentail(id) {
  var rental = rentals.find(element => element.id == id)
  var returnDate = new Date(rental.returnDate);
  var pickup = new Date(rental.pickupDate)
  var duration = parseInt(dayDiff(pickup, returnDate));
  if (rental.options.deductibleReduction)
    return [rental.price, (rental.price - 4 * duration - rental.commission), rental.insurance, rental.treasury, rental.virtuo]
  else
    return [rental.price, (rental.price - rental.commission), rental.insurance, rental.treasury, rental.virtuo]
}

function payActors() {
  actors.forEach(element => {
    var finalPrice = fetchPriceByRentail(element.rentalId)
    element.payment.forEach(actor => {
      if (actor.who == 'driver')
        actor.amount = finalPrice[0]
      else if (actor.who == 'partner')
        actor.amount = finalPrice[1]
      else if (actor.who == 'insurance')
        actor.amount = finalPrice[2]
      else if (actor.who == 'treasury')
        actor.amount = finalPrice[3]
      else
        actor.amount = finalPrice[4]
    });
  });
}
payActors()
console.log("Step 5", JSON.parse(JSON.stringify(actors)))
//#endregion
