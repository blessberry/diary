import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app.js';

const { expect } = chai;

chai.use(chaiHttp);

let userToken;


describe('POST /api/v1/auth/signin', () => {
    it('Should return a 422 status if email was not provided', done => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                pasword: 'password123'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.error).to.deep.equal('Not valid request');
                done();
            });
    });
    it('Should return a 422 status if password was not provided', done => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'user.one@localhost.com'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.error).to.deep.equal(
                    'Not valid request'
                );
                done();
            });
    });

    it('Should return a 422 status if email has invalid characters', done => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: '@gmail409@)(*).com**',
                password: 'password123'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.error).to.deep.equal('Not valid request');
                done();
            });
    });


    it('Should return a 404 status if passwords do match', done => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'user.one@localhost.com',
                password: 'notpass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.error).to.deep.equal(
                    'Not valid request'
                );
                done();
            });
    });

});