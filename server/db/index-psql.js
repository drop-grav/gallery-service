const faker = require('faker');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'gallerymodule',
});

pool.connect();

pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message);
});

const randomInt = function (max) {
  return Math.ceil(Math.random() * max);
};
const tenMil = 10000000;

const getListingPhotos = function (listingID, callback) {
  pool.query(`SELECT * FROM photos WHERE listingID = ${listingID}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const postListingPhotos = function (listingID, callback) {
  pool.query(`INSERT INTO photos VALUES (default, https://bnbair.s3-us-west-1.amazonaws.com/${randomInt(100)}.jpg, ${faker.lorem.sentence()}, ${randomInt(tenMil)}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

// const getListingPhotos = function (listingID, callback) {
//   pool.query(`SELECT * FROM photos WHERE listingID = ${listingID}`, (error, results, fields) => {
//     if (error) {
//       callback(error);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// const getListingPhotos = function (listingID, callback) {
//   pool.query(`SELECT * FROM photos WHERE listingID = ${listingID}`, (error, results, fields) => {
//     if (error) {
//       callback(error);
//     } else {
//       callback(null, results);
//     }
//   });
// };

module.exports = {
  pool,
  getListingPhotos,
};
