import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";

const { expect } = chai;

chai.use(chaiHttp);

let token, param;

before((done) => {
    chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
            email: 'user.one@localhost.com',
            password: 'password123'
        })
        .end((err, res) => {
            if (err) done(err);
            token = res.body.data.token;
            done();
        });
});

describe('POST /api/v2/entries', () => {
    it("should return a 422 status if title is not provided", done => {
        chai
          .request(app)
          .post("/api/v2/entries")
          .set('Authorization', token)   
          .send({
            description: 'description one',
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(422);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('"title" is required');
            done();
          });
      });
    
      it("should return a 422 status if title has more than 20 characters", done => {
        chai
          .request(app)
          .post("/api/v2/entries")
          .set('Authorization', token)
          .send({
            title: "somereallylongnamethatimadeupitistrulylongadfdfdfdfdsfd",
            description: 'description one',
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(422);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals(
              '"title" length must be less than or equal to 20 characters long'
            );
            done();
          });
      });
    
      it("should return a 401 status if Authorization is not provided", done => {
        chai
          .request(app)
          .post("/api/v2/entries")
          .send({
            title: "title one",
            description: 'description one'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('Token is not provided');
            done();
          });
      });
      it("should return a 401 status if token is not correct", done => {
        chai
          .request(app)
          .post("/api/v2/entries")
          .set('Authorization', 'oops')
          .send({
            title: "title one",
            description: 'description one'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('Unauthorised Token');
            done();
          });
      });
      it("should return a 201 status if entry was created", done => {
        chai
          .request(app)
          .post("/api/v2/entries")
          .set('Authorization', token)
          .send({
            title: "title one",
            description: 'description one'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(201);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("success");
            expect(res.body.data).to.have.keys('id', 'email', 'title', 'description', "createdon");
            expect(res.body.data.title).to.deep.equal("title one");
            expect(res.body.data.description).to.deep.equal("description one");
            expect(res.body.data.email).to.deep.equal("user.one@localhost.com");
            param = res.body.data.id;
            done();
          });
      }); 
});

describe('PATCH /api/v2/entries/:id', () => {
    it("should return a 422 status if req.params is not provided", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries`)
          .set('Authorization', token)   
          .send({
            title: 'title one',
            description: 'description one'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(404);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('Wrong api endpoint, does not exist');
            done();
          });
    });
    it("should return a 422 status if req.params is not correct", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/100000`)
          .set('Authorization', token)   
          .send({
            title: 'title one',
            description: 'description one',
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(404);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('ENTRY NOT FOUND');
            done();
          });
    });
    it("should return a 422 status if title is not provided", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/${param}`)
          .set('Authorization', token)   
          .send({
            description: 'description one',
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(422);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('"title" is required');
            done();
          });
      });
      it("should return a 422 status if description is not provided", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/${param}`)
          .set('Authorization', token)   
          .send({
            title: 'title one',
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(422);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('"description" is required');
            done();
          });
      });
      it("should return a 422 status if title has more than 20 characters", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/${param}`)
          .set('Authorization', token)
          .send({
            title: "somereallylongnamethatimadeupitistrulylongadfdfdfdfdsfd",
            description: 'description one',
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(422);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals(
              '"title" length must be less than or equal to 20 characters long'
            );
            done();
          });
      });
    
      it("should return a 401 status if Authorization is not provided", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/${param}`)
          .send({
            title: "title one",
            description: 'description one'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('Token is not provided');
            done();
          });
      });
      it("should return a 401 status if token is not correct", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/${param}`)
          .set('Authorization', 'oops')
          .send({
            title: "title one",
            description: 'description one'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("error");
            expect(res.body.data).to.deep.equals('Unauthorised Token');
            done();
          });
      });
      it("should return a 200 status if entry was updated", done => {
        chai
          .request(app)
          .patch(`/api/v2/entries/${param}`)
          .set('Authorization', token)
          .send({
            title: "title one updated",
            description: 'description one updated'
          })
          .end((error, res) => {
            if (error) done(error);
            expect(res).to.be.an("object");
            expect(res).to.have.status(200);
            expect(res.body).to.have.keys("status", "data");
            expect(res.body.status).to.deep.equal("success");
            expect(res.body.data).to.have.keys('id', 'email', 'title', 'description', "createdon");
            expect(res.body.data.title).to.deep.equal("title one updated");
            expect(res.body.data.description).to.deep.equal("description one updated");
            expect(res.body.data.email).to.deep.equal("user.one@localhost.com");
            done();
          });
      });     
});/*

describe('GET /api/v2/entries/:id', () => {
    it('Should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .get('/api/v2/entries/33333')
            .set('Authorization', token)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('Should return a 422 status if carId is not an integer', (done) => {
        chai.request(app)
            .get('/api/v2/entries/string')
            .set('Authorization', token)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('Should return a 200 status without an authorization token', (done) => {
        chai.request(app)
            .get('/api/v2/entries/4')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });

    it('Should return a 200 status when an authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v2/entries/4')
            .set('Authorization', token)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });
});

describe('DELETE /api/v2/entries/:id', () => {
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

    it('should return a 403 status if user is not an admin', (done) => {
        chai.request(app)
            .delete('/api/v2/entries/3')
            .set('Authorization', token)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .delete('/api/v2/entries/39999')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 status if carId is not an integer', (done) => {
        chai.request(app)
            .delete('/api/v2/entries/string')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('should return a 200 status if car was successfully deleted', (done) => {
        chai.request(app)
            .delete('/api/v2/entries/6')
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

describe('GET /api/v2/entries', () => {
    it('should return a list of all cars, whether sold or not', (done) => {
        chai.request(app)
            .get('/api/v2/entries')
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
});*/
