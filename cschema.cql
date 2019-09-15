DROP KEYSPACE IF EXISTS gallerymodule;

CREATE KEYSPACE gallerymodule
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

USE gallerymodule;

CREATE TABLE images (
  id            UUID PRIMARY KEY,
  src           VARCHAR(100) NOT NULL,
  description   VARCHAR(100) NOT NULL,
  PRIMARY KEY (id, src, description)
);

listing id
image id

partition KEY
location on disc