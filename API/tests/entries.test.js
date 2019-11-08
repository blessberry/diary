import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import usersTest from './db/users';
import entriesTest from './db/entries';
import generateToken from '../helpers/jwt';


const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

const token = generateToken(usersTest[5].id, usersTest[5].email);
const unthToken = generateToken(usersTest[12].id, usersTest[12].email);
const invalidToken = '';

describe('When users tries to view all their diaries--- GET entry,api/v2/entries', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .get('/api/v2/entries')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.data).to.equal('Unauthorised - Header Not Set');
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .get('/api/v2/entries')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.data).to.equal('Unauthorised Token or token not provided');
        done();
      });
  });
});


describe('When the user try to create a new entry--- POST entry,api/v2/entries', () => {
  it('should return title must be required ', (done) => {
    chai
      .request(app)
      .post('/api/v2/entries')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('"title" is not allowed to be empty');
        done();
      });
  });
  it('should return description must be a string ', (done) => {
    chai
      .request(app)
      .post('/api/v2/entries')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('"description" is not allowed to be empty');
        done();
      });
  });
  it('should return entry successfully created', (done) => {
    chai
      .request(app)
      .post('/api/v2/entries')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('entry successfully created');
        done();
      });
  });
});


describe('When users tries to view all their diaries--- GET entry,api/v2/entries', () => {
  it('should return display all entries', (done) => {
    chai
      .request(app)
      .get('/api/v2/entries')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.an('array');
        done();
      });
  });
});

describe('When the user tries to view a specific entry--- GET entry,api/v2/entries/id', () => {
  it('should return params id must be a number ', (done) => {
    chai
      .request(app)
      .get('/api/v2/entries/h')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('should return entry not found ', (done) => {
    chai
      .request(app)
      .get('/api/v2/entries/3')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No entry to display');
        done();
      });
  });
});

describe('When the user tries to UPDATE a specific diary--- PATCH entry,api/v2/entries/id', () => {
  it('should return params id must be a number ', (done) => {
    chai
      .request(app)
      .patch('/api/v2/entries/h')
      .set('Authorization', token)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('"id" must be a number');
        done();
      });
  });
  it('should return title must be string', (done) => {
    chai
      .request(app)
      .patch('/api/v2/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('"title" must be a string');
        done();
      });
  });
  it('should return description must be string', (done) => {
    chai
      .request(app)
      .patch('/api/v2/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('"description" must be a string');
        done();
      });
  });
  it('should return There is no entry with that id', (done) => {
    chai
      .request(app)
      .patch('/api/v2/entries/145')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('should return You are not authorized to perform this action', (done) => {
    chai
      .request(app)
      .patch('/api/v2/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', unthToken)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.data).to.equal('You are not authorized to perform this action');
        done();
      });
  });
});

describe('delete entry, --api/v2/entries/id', () => {
  it('should return entry not found', (done) => {
    chai
      .request(app)
      .delete('/api/v2/entries/145')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('entry not found');
        done();
      });
  });
});