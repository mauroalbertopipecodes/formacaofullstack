import {Request, Response} from 'express';
import Transaction from "../models/Transaction";
import utils from '../utils/auth';


const createTransaction = async(req: Request, res: Response) => {
    utils.hasRequestAuthorization(req.headers.authorization, res)

    const { description, value, transationType, movementType } = req.body
    if( !description || !value || !transationType || !movementType) {
        return res.status(400).send({message: 'Content cannot be empty'});
    }
    
    const token = req.get('authorization')?.split(' ')[1];
    const payload = utils.getPayloadFromToken(token,res);
    
    const newTransaction = new Transaction({
        createdBy: payload.email,
        description: description,
        movementType: movementType,
        transationType: transationType,
        value: value,
    });
​
    newTransaction.save((err, transaction) => {
        if(err) res.status(502).send({message: "Error. Bad gateway", err});
        return res.status(200).send({message: "Transaction created sucessfully!", transaction});
    });
};

export default {createTransaction};