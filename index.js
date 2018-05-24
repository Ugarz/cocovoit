'use strict'

const Coco = require("./core/covoit");
const Carpooling = new Coco();

const options = {
  kms: 35.5,
  price_per_kms: 1.62,
  passengers: [],
  comeBack: true,
  conductor: "ugo",
  car: {
    model: "308",
    brand: "Peugeot",
    consumption: 7
  }
};

const journey = Carpooling.createJourney(options);
const passenger = Carpooling.createPassenger('ugo', 5, true);

journey.addPassengers(passenger);

const numberOfPassengers = journey.getPassengers();
const pricePerPassenger = journey.calculate();

console.log('User', passenger)
console.log("Number of passengers", numberOfPassengers);
console.log("Price per passenger", pricePerPassenger);
console.log("journey", journey);

// class journey {
//   constructor(props){
//     this.comeBack = props.comeBack;
//     this.kms = props.kms;
//   }
//   set currency(devise){
//     return this.devise = devise;
//   }
//   get bob(){
//     return this.kms;
//   }
// }

// const j = new journey({
//   comeBack : true,
//   kms : 30,
//   currency: 'euro'
// })

// j.currency = 'euros'

// console.log('devise', j.devise)
// console.log('bob', j)