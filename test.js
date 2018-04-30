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

  it("Should create Cocovoit", function() {
    const options = {
        smoking : false,
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
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: 'ugo'
    }
    const cocovoit = P.createJourney(options);

    // Create a passenger
    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    cocovoit.addPassengers(uPassenger)
    const passengersList = cocovoit.passengersList;
    
    // Assert the passenger has been pushed to passengers list
    assert.deepEqual(passengersList[0], uPassenger);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeBack");
    
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });
  
  it("Should create and add a bunch of passengers to the cocovoit", function() {
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: "ugo"
    };
    const cocovoit = P.createJourney(options);

    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const cPassenger = P.createPassenger({ name: "camille" }, { number_per_week: 3, comeBack: true });

    cocovoit.addPassengers([uPassenger, cPassenger]);
    const passengersList = cocovoit.passengersList;

    assert.deepEqual(passengersList, [uPassenger, cPassenger]);

    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeBack");
  });
  
  it("Should reset the passengers of current cocovoit", function() {
    const options = {
      smoking : false,
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: "ugo"
    };
    const cocovoit = P.createJourney(options);

    const uPassenger = P.createPassenger({ name: "ugo" }, { number_per_week: 5, comeBack: true });
    const cPassenger = P.createPassenger({ name: "camille" }, { number_per_week: 3, comeBack: true });

    cocovoit.addPassengers([uPassenger, cPassenger]);
    let passengersList = cocovoit.passengersList;
    
    assert.deepEqual(passengersList, [uPassenger, cPassenger]);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeBack");
    
    cocovoit.resetPassengers();
    
    passengersList = cocovoit.passengersList;
    
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
    const cocovoit = P.createJourney(options);
    
    // Add passengers to the journey
    cocovoit.addPassengers([uPassenger, cPassenger, jPassenger]);
    let passengersList = cocovoit.passengersList;
    
    // Test the passengers list
    assert.deepEqual(passengersList, [uPassenger, cPassenger, jPassenger]);
    
    // Test the passengers list
    const pricePerPassenger = cocovoit.calculate();
    const numberOfPayers = cocovoit.numberOfPayers;

    const shouldPay = () => {
      let fullKms = options.kms;
      if (options.comeBack) fullKms = options.kms * 2
      return (options.car.consumption * fullKms) / 100 * options.price_per_kms / cocovoit.numberOfPayers;
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

    const cocovoit = P.createJourney(options);
    
    cocovoit.addPassengers([uPassenger, jPassenger]);
    
    const pricePerPassenger = cocovoit.calculate();
    const uPrice = cocovoit.calculate();
    const jPrice = cocovoit.calculate();
    
    const numberOfPayers = cocovoit.numberOfPayers;
    
    const shouldPay = (passenger, price) => {
      let fullKms = options.kms;
      if (options.comeBack) {
        fullKms = options.kms * 2;
      }
      if(passenger){
        return (options.car.consumption * fullKms / 100 * options.price_per_kms / numberOfPayers) * passenger.number_per_week;
      }
      return options.car.consumption * fullKms / 100 * options.price_per_kms / numberOfPayers;
    };
    
    // console.log('uPrice', uPrice)
    // console.log('jPrice', jPrice)

    // console.log(`uPrice ${uPassenger.number_per_week} fois par semaine`, uPrice * uPassenger.number_per_week)
    // console.log(`jPrice ${jPassenger.number_per_week} fois par semaine`, jPrice * jPassenger.number_per_week)
    
    // console.log('numberOfPayers', numberOfPayers)
    // console.log('Each passenger should pay', pricePerPassenger)
    
    console.log('Ugo shouldPay', shouldPay(uPrice))
    console.log('Julien shouldPay', shouldPay(jPrice))

    // Recurrent case
    uPrice.should.be.equal(shouldPay(uPassenger.number_per_week));
    jPrice.should.be.equal(shouldPay(jPassenger.number_per_week));
    
    // Once case
    pricePerPassenger.should.be.equal(shouldPay());
  });
});
