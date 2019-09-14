const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const models = require('./models');

const app = express();
const port = 3001;
const cors = require('cors');
const db = require('./db');

app.use(cors());
// app.use('/', express.static('public'));
app.use('/listing/:id', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.send('Hello World'));
app.get('/api/listing/:listingID', (req, res) => {
  const id = req.params.propertyId;
  const modelsPropertyListingGet = Promise.promisify(models.propertyListing.get);
  modelsPropertyListingGet(id, (results) => res.json(results))
    .catch((err) => console.log(err));
});

// put CRUD operations here
// Create / POST - create a new item
app.post('/api/listing/:listingID/photos', (req, res) => {
  res.send('Got a POST request');
});
// Read / GET - read an item
app.get('/api/listing/:listingID/photos', (req, res) => {
  res.send('Hello World!');
});
// Update / PUT - update an item
app.put('/api/listing/:listingID/photos/:photoID', (req, res) => {
  res.send('Got a PUT request at /api/listing/:listingID/photos/:photoID');
});
// Delete / DELETE - delete an item
app.delete('/api/listing/:listingID/photos/:photoID', (req, res) => {
  res.send('Got a DELETE request at /api/listing/:listingID/photos/:photoID');
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
