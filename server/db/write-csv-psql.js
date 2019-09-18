const faker = require('faker');
const fs = require('fs');

const randomInt = function (max) {
  return Math.ceil(Math.random() * max);
};

const hundredMil = 100000000;
const tenMil = 10000000;

const writeUsers = fs.createWriteStream('photo-data.csv');
writeUsers.write('src,description,listingID\n', 'utf8');

// generate 100 million data points
// randomly assign listing one of the ten mil
function writeHundredMillionUsers(writer, encoding, callback) {
  let i = hundredMil;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      if (id % 10000 === 0) {
        console.log(`Listing ${id} done`);
      }
      const src = `https://bnbair.s3-us-west-1.amazonaws.com/${randomInt(100)}.jpg`;
      const description = `${faker.lorem.sentence()}`;
      const listingID = `${randomInt(tenMil)}`;
      const entry = `${src},${description},${listingID}\n`;
      if (i === 0) {
        writer.write(entry, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(entry, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeHundredMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
