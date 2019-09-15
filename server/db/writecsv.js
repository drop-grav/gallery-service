const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const csvWriter = createCsvWriter({
  path: './file.csv',
  header: [
    { id: 'src', title: 'SOURCE' },
    { id: 'description', title: 'DESCRIPTION' },
    { id: 'listingID', title: 'LISTING_ID' },
  ],
});

const records = [];
// { name: 'Bob', lang: 'French, English' },
// { name: 'Mary', lang: 'English' }

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
      src: `https://bnbair.s3-us-west-1.amazonaws.com/${randomInt(100)}.jpg`,
      description: `${faker.lorem.sentence()}`,
      listingID: `${i}`,
    };
    records.push(entry);
  }
  console.log(`Listing ${i} done`);
}

csvWriter.writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English
