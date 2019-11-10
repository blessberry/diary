import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

const { expect } = chai;
chai.use(chaiHttp);

let token, param;

describe("POST /api/v2/auth/signup", () => {
  it("should return a 422 status if firstName is not provided", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        lastName: "one",
        email: "another.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals('"firstName" is required');
        done();
      });
  });
  it("should return a 422 status if first name has invalid characters", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user@##*(&$!(!*##",
        lastName: "one",
        email: "another.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals(
          '"firstName" must only contain alpha-numeric characters'
        );
        done();
      });
  });

  it("should return a 422 status if first name has more than 20 characters", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "somereallylongnamethatimadeupitistrulylong",
        lastName: "one",
        email: "another.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals(
          '"firstName" length must be less than or equal to 20 characters long'
        );
        done();
      });
  });

  it("should return a 422 status if last name is not provided", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        email: "another.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals('"lastName" is required');
        done();
      });
  });

  it("should return a 422 status if last name has invalid characters", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        lastName: ")&%&*^(*)",
        email: "another.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals(
          '"lastName" must only contain alpha-numeric characters'
        );
        done();
      });
  });

  it("should return a 422 status if last name has more than 20 characters", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        lastName: "somereallylongnamethatimadeupitistrulylong",
        email: "another.one@gmail.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals(
          '"lastName" length must be less than or equal to 20 characters long'
        );
        done();
      });
  });

  it("should return a 422 status if email was not provided", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        lastName: "one",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals('"email" is required');
        done();
      });
  });

  it("should return a 422 status if email is invalid", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        lastName: "one",
        email: "#user1@@gmal.",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals('"email" must be a valid email');
        done();
      });
  });

  it("should return a 422 status if password was not provided", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        lastName: "one",
        email: "another.one@localhost.com"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.data).to.deep.equals('"password" is required');
        done();
      });
  });

  it("should return a 201 status if account was created", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstName: "user",
        lastName: "one",
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys("status", "data");
        expect(res.body.status).to.deep.equal("success");
        token = res.body.data.token;
        done();
      });
  });
});

describe("POST /api/v2/auth/signin", () => {
  it("Should return a 422 status if email was not provided", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        pasword: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equals("error");
        expect(res.body.data).to.deep.equal('"email" is required');
        done();
      });
  });
  it("Should return a 422 status if password was not provided", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "user.one@localhost.com"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equals("error");
        expect(res.body.data).to.deep.equal('"password" is required');
        done();
      });
  });

  it("Should return a 422 status if email has invalid characters", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "@gmail409@)(*).com**",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equals("error");
        expect(res.body.data).to.deep.equal('"email" must be a valid email');
        done();
      });
  });

  it("Should return a 422 status if passwords do match", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "user.one@localhost.com",
        password: "notpass"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body.status).to.deep.equals("error");
        expect(res.body.data).to.deep.equal("INCORRECT PASSWORD");
        done();
      });
  });
  it("Should return a 200 status if email and password match", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.body.status).to.deep.equals("success");
        expect(res.body.data).to.have.keys('token');
        done();
      });
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
});