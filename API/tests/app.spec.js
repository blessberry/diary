import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

const { expect } = chai;
chai.use(chaiHttp);

describe("GET /", () => {
  it("Should return string Hello World", done => {
    chai
      .request(app)
      .get("/")
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep.equal("Hello World");
        done();
      });
  });
});

describe("Wrong Path Handler", () => {
  it("Should send a 404 error if wrong endpoint is requested", done => {
    chai
      .request(app)
      .get("/random")
      .end((error, res) => {
        if (error) done(error);
        expect(res).to.be.an("object");
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equal("error");
        expect(res.body.error).to.deep.equal(
          "Wrong api endpoint, does not exist"
        );
        done();
      });
  });
});
