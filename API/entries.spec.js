import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;

chai.use(chaiHttp);

let myToken;
let adminToken;

before((done) => {
    chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'user.one@localhost.com',
            password: 'password123'
        })
        .end((err, res) => {
            if (err) done(err);
            myToken = res.body.data.token;
            done();
        });
});

//describe('POST /api/v1/entries', () => {})

    
    
    

describe('PATCH /api/v1/car/:car_id/status', () => {
    it('should return a 404 error if car does not exist', (done) => {
        chai.request(app)
            .patch('/api/v1/car/300000000/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 404 error if user tries to update a car that is not his', (done) => {
        chai.request(app)
            .patch('/api/v1/car/1/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 200 status if car status was successfully updated', (done) => {
        chai.request(app)
            .patch('/api/v1/car/2/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data.status).to.deep.equal('sold');
                done();
            });
    });
});


describe('PATCH/api/v1/car/:car_id/price', () => {
    it('should return a 404 status if car is not found', (done) => {
        chai.request(app)
            .patch('/api/v1/car/400/price')
            .set('Authorization', myToken)
            .send({
                price: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('car not found');
                done();
            });
    });

    

    it('should return a 404 error if car does not belong to user', (done) => {
        chai.request(app)
            .patch('/api/v1/car/6/price')
            .set('Authorization', myToken)
            .send({
                price: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('car not found');
                done();
            });
    });
  
});

describe('GET /api/v1/car/:car_id', () => {
    it('Should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .get('/api/v1/car/33333')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('car not found');
                done();
            });
    });

    
    it('Should return a 401 status without an authorization token', (done) => {
        chai.request(app)
            .get('/api/v1/car/4')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                done();
            });
    });

    it('Should return a 200 status when an authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v1/car/4')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});


describe('GET /api/v1/car?status=available', () => {
    it('should return a 403 error if status query is not available', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({ status: 'notavailable' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 401 error when authorization token is not provided', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({ status: 'available' })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('Authorization token was not provided');
                done();
            });
    });

    it('should return a 401 error when authorization token is invalid', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .set('Authorization', 'fake')
            .query({ status: 'available' })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.keys('status', 'error');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('Invalid authorization token');
                done();
            });
    });

    it('should return available cars when authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({ status: 'available' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });
});

describe('(Admin) GET /api/v1/car', () => {

    before((done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'johndoe@gmail.com',
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                adminToken = res.body.data.token;
                done();
            });
    });


    it('should return a list of all cars, whether sold or not', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data.find(datum => datum.status === 'sold'))
                    .to.be.an('object');
                expect(res.body.data.find(datum => datum.status === 'available'))
                    .to.be.an('object');
                done();
            });
    });
});

describe('DELETE /api/v1/car/:car_id', () => {

    it('should return a 403 status if user is not an admin', (done) => {
        chai.request(app)
            .delete('/api/v1/car/3')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .delete('/api/v1/car/39999')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.error).to.deep.equal('car not found');
                done();
            });
    });


    it('should return a 200 status if car was successfully deleted', (done) => {
        chai.request(app)
            .delete('/api/v1/car/6')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.message).to.deep.equal('car ad was successfully deleted');
                done();
            });
    });
});