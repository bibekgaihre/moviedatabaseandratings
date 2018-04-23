
var request=require('supertest');
var app=require('../server');
var server=request.agent('http://localhost:3000');
var expect = require('chai').expect
// cases


describe("Server Check",function(){
    it("runs on 3000 port",function(done){
request(app.listen()).get("/")
            .expect(200)
            .end(done)
    })
})

describe("The index page",function(){
    it("Index Page",function(done){
request(app).get("/")
            .expect(200)
            .expect(/Standard User/,done)
    })
})
describe("the user dashboard",function(){
    it("Redirects back to homepage because user is not logged in",function(done){
        request(app).get("/user/dashboarduser")
        .expect(302,done)
    })
})
describe("Error Page",function(){
    it("Error Page",function(done){
        request(app).get("*")
        .expect(403,done)
    })
})
describe("Signup Page",function(){
    it("displays Signup Page",function(done){
        request(app).get("/signup")
        .expect(200)
        .expect(/Last Name/,done)
    })
})
//chai testing login
describe('Login Tests', function() {
    it('should return the user if valid', function(done) {
      request(app)
      .post('/loginuser')
      .send({userID: 0})
      .end(function(err, res) {
        expect(res.body.username).to.be.equal("bibekgaihre");
        expect(res.statusCode).to.be.equal(302);
        done();
      });
    });
  });
//chai testing distributor

