const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'gallerymodule',
});

pool.connect();

pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message); // Hello World!
  // pool.end();
});

const getListingPhotos = function (listingID, callback) {
  pool.query(`SELECT * FROM photos WHERE listingID = ${listingID}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

// const postListingPhoto = function (listingID, callback) {
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
