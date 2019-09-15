const express = require('express');

const app = express();
const port = 3100;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbpsql = require('./db/indexpsql.js');

// const db = require('./db/index.js');
// const Promise = require('bluebird');
// const models = require('./models');

app.use(cors());
app.use('/listing/:id', express.static('public'));
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
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
