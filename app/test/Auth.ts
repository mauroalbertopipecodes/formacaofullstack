process.env.NODE_ENV = 'test';

import User from "../models/User";

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

describe('Auth', () => {
/*
  * Test the /signup route
  */
    beforeEach((done) => {
        User.deleteOne({}, (err) => { 
        done();           
        });        
    });

    describe('/signup 400', () => {
      it('it should return a 400 error since we didnt add a body', (done) => {
        chai.request(server)
            .post('/signup')
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Content cannot be empty');
              done();
            });
      });
    });

    describe('/signup 200', () => {
      it('it should create an user and return a 200', (done) => {
        let user = {
            name: "Mauro",
            email: "test@gmail.com",
            password: "test"
        }
        chai.request(server)
            .post('/signup').send(user)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User created sucessfully!');
                done();
            });
    });
    });
});