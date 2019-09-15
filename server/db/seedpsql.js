const faker = require('faker');
const dbpsql = require('./indexpsql.js');

const tenMil = 10000000;

const randomInt = function (max) {
  let num = Math.ceil(Math.random() * max);
  // all IDs start at 1 and not 0
  if (num < 1) {
    num = 1;
  }
  return num;
};

// generate 100 listings
for (let i = 0; i < 100; i++) {
  // seed each listing with 5 photos
  for (let j = 0; j < 5; j++) {
    const entry = {
      src: `https://bnbair.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 100)}.jpg`,
      description: `${faker.lorem.sentence()}`,
      listingID: `${i}`,
    };

    dbpsql.pool.query('INSERT INTO photos SET ?', entry, (error, results, fields) => {
      if (error) {
        console.log('PHOTO INSERT ERROR:');
        console.log(error);
      } else {
        console.log('PHOTO INSERT SUCCESS');
      }
    });
  }
}

console.log('seeder running');

dbpsql.pool.end();
