DROP DATABASE IF EXISTS gallerymodule;

CREATE DATABASE gallerymodule;

USE gallerymodule;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  src VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  FOREIGN KEY (photoID) REFERENCES photos (id)
);

/*  Execute this file from the command line by typing:
 *    sudo -u postgres psql
*/