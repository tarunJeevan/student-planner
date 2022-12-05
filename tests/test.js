const bodyParser = require('body-parser');
const path = require('path');
const { exit } = require('process');
const request = require('supertest')
const app = require('../server')
const dotenv = require('dotenv').config({ path: path.join(__dirname, '.env') });

//To run tests, use npx mocha test.js
var expect = require('chai').expect;

describe('Baseline test', function () {

  it('This test should pass to prove that the mocha chai testing framework is functioning correctly', function () {

    expect(5).to.equal(5);
    expect(5).to.not.equal(3);

  });

});

describe('Mongoose Connection Test', function () {

  it('This test should pass to prove that Mongoose is successfully connecting to the MongoDB database', function () {

    let mongoose = require('mongoose');
    mongoose.connect(process.env.DATABASE)

    expect(mongoose.connection.readyState).to.equal(2)
    mongoose.connection.close();
  });
});

describe('Get list of notes', function () {

  it('Get notes', function () {
    request(app)
      .get('/get_notes/user')
      .expect(200)
  })
})

describe('Delete and Save notes', function () {

  it('Save note', function () {
    request(app)
    .post('/save_note')
    .send({
      username: 'testName',
      id: 00001,
      title: 'Test note',
      body: 'Mocha test note',
      updated: new Date().toJSON()
    })
    .expect(200, 'Note created')
  })

  it('Delete note', function () {
    request(app)
    .post('/delete_note')
    .send({
      username: 'testName',
      id: 00001,
      title: 'Test note',
      body: 'Mocha test note',
      updated: new Date().toJSON()
    })
    .expect(200, 'Note deleted!')
  })
})