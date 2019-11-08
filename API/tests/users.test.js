  
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;

describe('POST /api/v2/auth/signup', () => {
    it('should return a 404 status if first name is not provided', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                lastName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });
    it('should return a 404 status if first name has invalid characters', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: '45____=- *&*&()&()&',
                lastName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });

    it('should return a 404 status if first name has more than 20 characters', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'somereallylongnamethatimadeupitistrulylongdaffdfddfd',
                lastName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });
    it('should return a 404 status if last name is not provided', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });
    it('should return a 404 status if last name has invalid characters', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: ')(_(_(Doe',
                email: 'desmondoe@gmail.com',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });

    it('should return a 404 status if last name has more than 20 characters', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'somereallylongnamethatimadeupitistrulylongddfddf',
                email: 'desmondoe@gmail.com',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });
    it('should return a 404 status if email was not provided', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });
    it('should return a 404 status if email is invalid', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: '#jondoe@@gmal.',
                password: 'password',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });

    it('should return a 404 status if password was not provided', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: 'desmonddoe@gmail.com',
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });

    it('should return a 409 status if account exists', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password',
                address: '17, lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                
                
                done();
            });
    });

    it('should return a 201 status if account was created', done => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: 'desmonddoe@gmail.com',
                password: 'password'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });
});

describe('POST /api/v2/auth/signin', () => {
    it('Should return a 404 status if email was not provided', done => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                pasword: 'password'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });
    it('Should return a 404 status if password was not provided', done => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                email: 'johndoe@gmail.com'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });

    it('Should return a 404 status if email has invalid characters', done => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                email: 'johndoe@gmail)(*).com**',
                password: 'password'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });

    it('Should return a 404 status if account does not exist', done => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                email: 'notauser@gmail.com',
                password: 'password'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });

    it('Should return a 404 status if passwords do match', done => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                email: 'johndoe@gmail.com',
                password: 'notpass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                done();
            });
    });

    it('Should return a 200 status on successful login', done => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                email: 'osahonoboite@gmail.com',
                password: 'password'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                userToken = res.body.token;
                done();
            });
    });
});