DROP KEYSPACE IF EXISTS "gallerymodule";

CREATE KEYSPACE "gallerymodule"
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

USE "gallerymodule";

CREATE TABLE "photos" (
  id            INT,
  src           TEXT,
  description   TEXT,
  listingID     INT,
  PRIMARY KEY (id, src, description, listingID)
);

-- COPY photos(src,description,listingID)
-- FROM '/mnt/c/Users/ANTHONY/hrsf122/dropgrav-sdc/gallery-service/photo-data.csv' DELIMITER ',' CSV HEADER;

-- CREATE INDEX idx_name ON photos (listingID);

/*  Execute this file from the command line by typing:
 *    create database with:
 *      psql -d postgres -a -f pschema.sql
 *
 *    log into cassandra with:
 *      sudo service cassandra restart
 *      cqlsh 10.0.1.34 9160
 *      cqlsh
*/