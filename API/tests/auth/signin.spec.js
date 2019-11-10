import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app.js";

const { expect } = chai;
chai.use(chaiHttp);

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

  /*it("Should return a 422 status if passwords do match", done => {
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
  });*/
});
