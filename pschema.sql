DROP DATABASE IF EXISTS "gallerymodule";

CREATE DATABASE "gallerymodule";

\c "gallerymodule";

/*at least 5 photos per listing*/
CREATE TABLE "photos" (
  id            SERIAL PRIMARY KEY,
  src           VARCHAR(100) NOT NULL,
  description   VARCHAR(100) NOT NULL
);

/*10 million listings*/
CREATE TABLE "listings" (
  id            SERIAL PRIMARY KEY,
  FOREIGN KEY (photoID) REFERENCES "photos" (id)
);

/*  Execute this file from the command line by typing:
 *    sudo service postgresql restart
 *    sudo -u postgres psql
*/