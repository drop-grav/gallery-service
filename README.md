# Project Name

> Project description

## Related Projects

  - https://github.com/haab-solutions/reservation-module
  - https://github.com/haab-solutions/photo-gallery-module
  - https://github.com/haab-solutions/reviews-module
  - https://github.com/haab-solutions/recommendations-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## RESTful CRUD API Routes
- Create / POST - create a new item
app.post('/api/photos/:propertyId', (req, res) => {
  res.send('Got a POST request');
});

- Read / GET - read an item
app.get('/api/photos/:propertyId', (req, res) => {
  res.send('Hello World!');
});

- Update / PUT - update an item
app.put('/api/photos/:propertyId', (req, res) => {
  res.send('Got a PUT request at /api/photos/:propertyId');
});

- Delete / DELETE - delete an item
app.delete('/api/photos/:propertyId', (req, res) => {
  res.send('Got a DELETE request at /api/photos/:propertyId');
});
