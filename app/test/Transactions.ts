process.env.NODE_ENV = 'test';

import Transaction from "../models/Transaction";

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

describe('Transaction', () => {
/*
  * Test the /transaction route
  */
    beforeEach((done) => {
        Transaction.deleteOne({}, (err) => { 
        done();           
        });        
    });

    describe('/transaction 400', () => {
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

    describe('/transaction 200', () => {
      it('it should create an transaction and return a 200', (done) => {
        let transaction = {
            description: "Gasolina",
            movementType: 1,
            transationType: "Entrance",
            value: 22
        }
        chai.request(server)
            .post('/transaction').send(transaction)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Transaction created sucessfully!');
                done();
            });
    });
});
});