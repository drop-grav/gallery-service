DROP DATABASE IF EXISTS "gallerymodule";

CREATE DATABASE "gallerymodule";

\c "gallerymodule";

CREATE TABLE "listings" (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100)
);

CREATE TABLE "photos" (
  id            SERIAL PRIMARY KEY,
  src           VARCHAR(100) NOT NULL,
  description   VARCHAR(125) NOT NULL,
  listingID     INT NOT NULL
);

COPY photos(src,description,listingID)
FROM '/mnt/c/Users/ANTHONY/hrsf122/dropgrav-sdc/gallery-service/photo-data-psql.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_name ON photos (listingID);

/*  Execute this file from the command line by typing:
 *    create database with:
 *      psql -d postgres -a -f pschema.sql
 *
 *    log into postgres with:
 *      sudo service postgresql restart
 *      psql -h localhost -d gallerymodule -U student -W
*/