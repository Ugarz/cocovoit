const assert = require("assert");
const should = require('should')
const isEmpty = require('lodash/isEmpty')


const clib = require('./core/covoit')
const P = new clib();

console.log('P', P);

describe("Basic tests", function() {
  it("Should create passengers", function() {
    const uPassenger = P.createPassenger("ugo", 5, true);
    const cPassenger = P.createPassenger("camille", 3, true);
    const jPassenger = P.createPassenger("julien", 2, true);

    cPassenger.should.have.property("name", "camille");
    jPassenger.should.have.property("name", "julien");
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });

  it("Should create Cocovoit", function() {
    const options = {
        kms: 35.5,
        price_per_kms: 1.62,
        passengers: ['ugo', 'camille', 'julien'],
        comeBack: true,
        conductor: 'ugo'
    }
    const cocovoit = P.createJourney(options);
    cocovoit.should.have.property("passengers", options.passengers);
    cocovoit.should.have.property("price_per_kms", options.price_per_kms);
    cocovoit.should.have.property("comeBack", options.comeBack);
    cocovoit.should.have.property("conductor", options.conductor);
    cocovoit.should.have.property("kms", options.kms * 2);
  });
  
  it("Should create and add a passenger to the cocovoit", function() {
    const options = {
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: 'ugo'
    }
    const cocovoit = P.createJourney(options);

    // Create a passenger
    const uPassenger = P.createPassenger("ugo", 5, true);
    cocovoit.addPassengers(uPassenger)
    const passengersList = cocovoit.getPassengers();
    
    // Assert the passenger has been pushed to passengers list
    assert.deepEqual(passengersList[0], uPassenger);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeback");
    
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });
  
  it("Should create and add a bunch of passengers to the cocovoit", function() {
    const options = { kms: 35.5, price_per_kms: 1.62, comeBack: true, conductor: "ugo" };
    const cocovoit = P.createJourney(options);

    const uPassenger = P.createPassenger("ugo", 5, true);
    const cPassenger = P.createPassenger("camille", 3, true);

    cocovoit.addPassengers([uPassenger, cPassenger]);
    const passengersList = cocovoit.getPassengers();

    assert.deepEqual(passengersList, [uPassenger, cPassenger]);

    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeback");
  });
  
  it("Should reset the passengers of current cocovoit", function() {
    const options = { kms: 35.5, price_per_kms: 1.62, comeBack: true, conductor: "ugo" };
    const cocovoit = P.createJourney(options);

    const uPassenger = P.createPassenger("ugo", 5, true);
    const cPassenger = P.createPassenger("camille", 3, true);

    cocovoit.addPassengers([uPassenger, cPassenger]);
    let passengersList = cocovoit.getPassengers();
    
    assert.deepEqual(passengersList, [uPassenger, cPassenger]);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeback");
    
    cocovoit.resetPassengers();
    
    passengersList = cocovoit.getPassengers();
    
    passengersList.should.not.have.property("name");
    passengersList.should.not.have.property("number_per_week");
    passengersList.should.not.have.property("comeback");
  });
});



describe("Operation tests", function() {
  it("Should give the amount per person", function() {
    // 5.2 x 328 / 100 * 1.35 / 3
    // PRIXparPASSAGER = CONSO x NKM / 100 * PRIXduL / NBOCCUPANTS
    const options = {
      kms: 35.5,
      price_per_kms: 1.62,
      passengers: [],
      comeBack: true,
      // conductor: "ugo",
      car: {
        model: "308",
        brand: "Peugeot",
        consumption: 7,
      }
    };
    // Create passengers
    const uPassenger = P.createPassenger("ugo", 5, true);
    const cPassenger = P.createPassenger("camille", 3, true);
    const jPassenger = P.createPassenger("julien", 2, true);
    
    // Create journey
    const cocovoit = P.createJourney(options);
    
    // Add passengers to the journey
    cocovoit.addPassengers([uPassenger, cPassenger, jPassenger]);
    let passengersList = cocovoit.getPassengers();
    
    // Test the passengers list
    assert.deepEqual(passengersList, [uPassenger, cPassenger, jPassenger]);
    
    // Test the passengers list
    const pricePerPassenger = cocovoit.calculate();
    const cocovoitParameters = cocovoit.getCocovoitParameters();
    const personsWhoPay = options.passengers.length === 0 ? 1 : options.passengers.length + 1;
    
    const shouldPay = () => {
      let fullKms = options.kms;
      if (options.comeBack) {
        fullKms = options.kms * 2
      }
      return (options.car.consumption * fullKms) / 100 * options.price_per_kms / personsWhoPay;
    }

    console.log(pricePerPassenger);
    pricePerPassenger.should.be.equal(shouldPay());

  });
  // it("Should give the amount per person * number of day", function() {

  //   const options = { kms: 35.5, price_per_kms: 1.62, passengers: [{ name: "camille" }, { name: "julien" }], comeBack: true, conductor: "ugo", car: { model: "308", brand: "Peugeot", consumption: 7 } };
  //   const cocovoit = P.createJourney(options);
  //   const pricePerPassenger = cocovoit.calculate();
  //   const cocovoitParameters = cocovoit.getCocovoitParameters();
  //   const personsWhoPay = options.passengers.length === 0 ? 1 : options.passengers.length + 1;

  //   const shouldPay = (numberOfDays) => {
  //     let fullKms = options.kms;
  //     if (options.comeBack) {
  //       fullKms = options.kms * 2;
  //     }
  //     return options.car.consumption * fullKms / 100 * options.price_per_kms / personsWhoPay;
  //   };
  //   pricePerPassenger.should.be.equal(shouldPay() * 4);
  // });
});
