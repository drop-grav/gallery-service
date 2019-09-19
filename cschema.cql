DROP KEYSPACE IF EXISTS "gallerymodule";

CREATE KEYSPACE "gallerymodule"
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

USE "gallerymodule";

CREATE TABLE "photos" (
  listingID     INT,
  id            INT,
  src           TEXT,
  description   TEXT,
  PRIMARY KEY (listingID, id, src, description)
);

COPY photos(listingID,id,src,description) FROM '/mnt/c/Users/ANTHONY/hrsf122/dropgrav-sdc/gallery-service/photo-data-cql.csv' WITH HEADER = true;

/*  Execute this file from the command line by typing:
 *    create database with:
 *      cqlsh -f cschema.cql
 *
 *    log into cassandra with:
 *      sudo service cassandra restart
 *      cqlsh 10.0.1.34 9160
 *      cqlsh
*/