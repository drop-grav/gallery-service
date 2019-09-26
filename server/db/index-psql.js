const faker = require('faker');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'ec2-52-53-234-204.us-west-1.compute.amazonaws.com',
  user: 'student',
  password: 'student',
  database: 'gallerymodule',
});

pool.connect();

const randomInt = function (max) {
  return Math.ceil(Math.random() * max);
};

const getListingPhotos = function (listingID, callback) {
  pool.query(`SELECT * FROM photos WHERE listingID = ${listingID}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const postListingPhoto = function (listingID, callback) {
  pool.query(`INSERT INTO photos (src, description, listingID) VALUES ('https://bnbair.s3-us-west-1.amazonaws.com/${randomInt(100)}.jpg', '${faker.lorem.sentence()}', ${listingID})`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const deleteListingPhoto = function (listingID, photoID, callback) {
  pool.query(`DELETE FROM photos WHERE listingID = ${listingID} AND id = ${photoID}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const putListingPhoto = function (listingID, photoID, callback) {
  pool.query(`UPDATE photos SET description = '${faker.lorem.sentence()}' WHERE listingID = ${listingID} AND id = ${photoID}`, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  pool,
  getListingPhotos,
  postListingPhoto,
  deleteListingPhoto,
  putListingPhoto,
};
