import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("POST /api/v1/auth/signup", () => {
  it("should return a 422 status if firstName is not provided", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        lastName: "one",
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals('"firstName" is required');
        done();
      });
  });
  it("should return a 422 status if first name has invalid characters", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "user@##*(&$!(!*##",
        lastName: "one",
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals(
          '"firstName" must only contain alpha-numeric characters'
        );
        done();
      });
  });

  it("should return a 422 status if first name has more than 20 characters", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "somereallylongnamethatimadeupitistrulylong",
        lastName: "one",
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals(
          '"firstName" length must be less than or equal to 20 characters long'
        );
        done();
      });
  });

  it("should return a 422 status if last name is not provided", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "user",
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals('"lastName" is required');
        done();
      });
  });

  it("should return a 422 status if last name has invalid characters", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "user",
        lastName: ")&%&*^(*)",
        email: "user.one@localhost.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals(
          '"lastName" must only contain alpha-numeric characters'
        );
        done();
      });
  });

  it("should return a 422 status if last name has more than 20 characters", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "user",
        lastName: "somereallylongnamethatimadeupitistrulylong",
        email: "user.one@gmail.com",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals(
          '"lastName" length must be less than or equal to 20 characters long'
        );
        done();
      });
  });

  it("should return a 422 status if email was not provided", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "user",
        lastName: "one",
        password: "password123"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals('"email" is required');
        done();
      });
  });

  it("should return a 422 status if email is invalid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
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
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals('"email" must be a valid email');
        done();
      });
  });

  it("should return a 422 status if password was not provided", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "user",
        lastName: "one",
        email: "user.one@localhost.com"
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(422);
        expect(res.body).to.have.keys("status", "error");
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equals('"password" is required');
        done();
      });
  });

  it("should return a 201 status if account was created", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
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
        expect(res.body.data.firstName).to.deep.equals("user");
        expect(res.body.data.lastName).to.deep.equals("one");
        expect(res.body.data.email).to.deep.equals("user.one@localhost.com");
        done();
      });
  });
});

