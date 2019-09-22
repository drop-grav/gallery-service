require('newrelic');
const express = require('express');

const app = express();
const port = 3100;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbpsql = require('./db/index-psql.js');
// const dbcql = require('./db/index-cql.js');

app.use(cors());
// app.use('/listing/:id', express.static('public'));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/listing/:listingID', (req, res) => {
  const { listingID } = req.params;
  dbpsql.getListingPhotos(listingID, (error, data) => {
    if (error) {
      console.log('SERVER GET LISTING PHOTOS ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER GET LISTING PHOTOS SUCCESS');
      res.status(200).send(data.rows);
    }
  });
});

app.post('/api/listing/:listingID', (req, res) => {
  const { listingID } = req.params;
  dbpsql.postListingPhoto(listingID, (error, data) => {
    if (error) {
      console.log('SERVER POST LISTING PHOTO ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER POST LISTING PHOTO SUCCESS');
      res.status(200).send(`POST SUCCESSFUL TO LISTING ${listingID}`);
    }
  });
});

app.delete('/api/listing/:listingID/photo/:photoID', (req, res) => {
  const { listingID } = req.params;
  const { photoID } = req.params;
  dbpsql.deleteListingPhoto(listingID, photoID, (error, data) => {
    if (error) {
      console.log('SERVER DELETE LISTING PHOTO ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER DELETE LISTING PHOTO SUCCESS');
      res.status(200).send(`DELETE SUCCESSFUL TO LISTING ${listingID} ON PHOTO ${photoID}`);
    }
  });
});

app.put('/api/listing/:listingID/photo/:photoID', (req, res) => {
  const { listingID, photoID } = req.params;
  dbpsql.putListingPhoto(listingID, photoID, (error, data) => {
    if (error) {
      console.log('SERVER UPDATE LISTING PHOTO ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER UPDATE LISTING PHOTO SUCCESS');
      res.status(200).send(`UPDATE SUCCESSFUL TO LISTING ${listingID} ON PHOTO ${photoID}`);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
