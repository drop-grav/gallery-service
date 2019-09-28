require('newrelic');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = 3100;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const dbpsql = require('./db/index-psql.js');

app.use(compression());
app.use(cors());
app.use('/', express.static('./loader/'));
app.use('/listing/:id', expressStaticGzip('public', { // add '/listing/:id' path when only using this service and not the proxy
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/listing/:listingID/photos', (req, res) => {
  const { listingID } = req.params;
  dbpsql.getListingPhotos(listingID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data.rows);
    }
  });
});

app.post('/api/listing/:listingID/photos', (req, res) => {
  const { listingID } = req.params;
  dbpsql.postListingPhoto(listingID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(`POST SUCCESSFUL TO LISTING ${listingID}`);
    }
  });
});

app.delete('/api/listing/:listingID/photos/:photoID', (req, res) => {
  const { listingID } = req.params;
  const { photoID } = req.params;
  dbpsql.deleteListingPhoto(listingID, photoID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(`DELETE SUCCESSFUL TO LISTING ${listingID} ON PHOTO ${photoID}`);
    }
  });
});

app.put('/api/listing/:listingID/photos/:photoID', (req, res) => {
  const { listingID, photoID } = req.params;
  dbpsql.putListingPhoto(listingID, photoID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(`UPDATE SUCCESSFUL TO LISTING ${listingID} ON PHOTO ${photoID}`);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
