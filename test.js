const assert = require("assert");
const should = require('should')
const isEmpty = require('lodash/isEmpty')


const clib = require('./core/covoit')
const P = new clib();


describe("Basic tests", function() {
  it("Should create passengers", function() {
    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const cPassenger = P.createPassenger({ name: "camille" }, { number_per_week: 3, comeBack: true });
    const jPassenger = P.createPassenger({ name: "julien" }, { number_per_week: 2, comeBack: true });

    cPassenger.should.have.property("name", "camille");
    jPassenger.should.have.property("name", "julien");
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });

  it("Should create Journey", function() {
    const options = {
        smoking : false,
        kms: 35.5,
        price_per_kms: 1.62,
        passengers: ['ugo', 'camille', 'julien'],
        comeBack: true,
        conductor: 'ugo'
    }
    const journey = P.createJourney(options);
    journey.should.have.property("passengers", options.passengers);
    journey.should.have.property("price_per_kms", options.price_per_kms);
    journey.should.have.property("comeBack", options.comeBack);
    journey.should.have.property("conductor", options.conductor);
    journey.should.have.property("kms", options.kms * 2);
  });
  
  it("Should create and add a passenger to the journey", function() {
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: 'ugo'
    }
    const journey = P.createJourney(options);

    // Create a passenger
    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    journey.addPassengers(uPassenger)
    const passengersList = journey.passengersList;
    
    // Assert the passenger has been pushed to passengers list
    assert.deepEqual(passengersList[0], uPassenger);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeBack");
    
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });
  
  it("Should create and add a bunch of passengers to the journey", function() {
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: "ugo"
    };
    const journey = P.createJourney(options);

    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const cPassenger = P.createPassenger({ name: "camille" }, { number_per_week: 3, comeBack: true });

    journey.addPassengers([uPassenger, cPassenger]);
    const passengersList = journey.passengersList;

    assert.deepEqual(passengersList, [uPassenger, cPassenger]);

    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeBack");
  });
  
  it("Should reset the passengers of current journey", function() {
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: "ugo"
    };
    const journey = P.createJourney(options);

    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const cPassenger = P.createPassenger({ name: "camille" }, { number_per_week: 3, comeBack: true });

    journey.addPassengers([uPassenger, cPassenger]);
    let passengersList = journey.passengersList;
    
    assert.deepEqual(passengersList, [uPassenger, cPassenger]);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeBack");
    
    // Reset passengers list
    journey.resetPassengers();
    
    passengersList = journey.passengersList;
    
    passengersList.should.not.have.property("name");
    passengersList.should.not.have.property("number_per_week");
    passengersList.should.not.have.property("comeBack");
  });
});



describe("Operation tests", function() {
  it("Should give the amount per person", function() {
    // 5.2 x 328 / 100 * 1.35 / 3
    // PRIXparPASSAGER = CONSO x NKM / 100 * PRIXduL / NBOCCUPANTS
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      passengers: [],
      comeBack: true,
      conductor: "ugo",
      car: {
        model: "308",
        brand: "Peugeot",
        consumption: 4.2,
      }
    };

    // Create passengers
    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const cPassenger = P.createPassenger({ name: "camille" }, { number_per_week: 3, comeBack: true });
    const jPassenger = P.createPassenger({ name: "julien" }, { number_per_week: 2, comeBack: true });

    // Create journey
    const journey = P.createJourney(options);
    
    // Add passengers to the journey
    journey.addPassengers([uPassenger, cPassenger, jPassenger]);
    let passengersList = journey.passengersList;
    
    // Test the passengers list
    assert.deepEqual(passengersList, [uPassenger, cPassenger, jPassenger]);
    
    // Test the passengers list
    const pricePerPassenger = journey.calculate();
    const numberOfPayers = journey.numberOfPayers;

    const shouldPay = () => {
      let fullKms = options.kms;
      if (options.comeBack) fullKms = options.kms * 2
      return (options.car.consumption * fullKms) / 100 * options.price_per_kms / journey.numberOfPayers;
    }

    pricePerPassenger.should.be.equal(shouldPay());
  });

  
  it("Should give the amount per person * number of day", function() {
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      passengers: [],
      comeBack: true,
      conductor: "ugo",
      car: {
        model: "308",
        brand: "Peugeot",
        consumption: 7,
      }
    };
    
    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const jPassenger = P.createPassenger({ name: "julien" }, { number_per_week: 2, comeBack: true });

    const journey = P.createJourney(options);
    
    journey.addPassengers([uPassenger, jPassenger]);
    
    const pricePerPassenger = journey.calculate();
    const uPrice = journey.calculate({ passengerName: 'ugo' });
    const jPrice = journey.calculate({ passengerName: 'julien' });
    
    const uPriceRounded = journey.calculate({ passengerName: 'ugo', rounded: 2 });
    
    const numberOfPayers = journey.numberOfPayers;

    const shouldPay = (passenger) => {
      let fullKms = options.kms;
      if (options.comeBack) fullKms = options.kms * 2;
      if (passenger) {
        return (options.car.consumption * fullKms / 100 * options.price_per_kms / numberOfPayers) * passenger.number_per_week;
      }
      return options.car.consumption * fullKms / 100 * options.price_per_kms / numberOfPayers;
    };

    // Recurrent case
    uPrice.should.be.equal(shouldPay(uPassenger));
    jPrice.should.be.equal(shouldPay(jPassenger));
    
    // Once way price case
    pricePerPassenger.should.be.equal(shouldPay());
  });
  
  it("Should give the amount per person * number of day rounded", function () {
    const options = {
      smoking: false,
      kms: 35.5,
      price_per_kms: 1.62,
      passengers: [],
      comeBack: true,
      conductor: "ugo",
      car: {
        model: "308",
        brand: "Peugeot",
        consumption: 7,
      }
    };

    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const jPassenger = P.createPassenger({ name: "julien" }, { number_per_week: 2, comeBack: true });

    const journey = P.createJourney(options);

    journey.addPassengers([uPassenger, jPassenger]);

    // One way price
    const pricePerPassenger = journey.calculate();
    
    // A precise Price
    const uPrice = journey.calculate({ passengerName: 'ugo' });
    const jPrice = journey.calculate({ passengerName: 'julien' });

    // A 2 decimals rounded Price
    const uPriceRounded = journey.calculate({ passengerName: 'ugo', rounded: 2 });
    const jPriceRounded = journey.calculate({ passengerName: 'julien', rounded: 2 });

    const numberOfPayers = journey.numberOfPayers;

    const shouldPay = () => {
      let fullKms = options.kms;
      if (options.comeBack) fullKms = options.kms * 2;
      return options.car.consumption * fullKms / 100 * options.price_per_kms / numberOfPayers;
    };
    
    // Recurrent case
    uPriceRounded.should.be.equal(uPrice.toFixed(2));
    jPriceRounded.should.be.equal(jPrice.toFixed(2));

    // Once way price case
    pricePerPassenger.should.be.equal(shouldPay());
  });


});
