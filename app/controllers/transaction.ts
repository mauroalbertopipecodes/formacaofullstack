import {Request, Response} from 'express';
import Transaction from "../models/Transaction";


const createTransaction = async(req: Request, res: Response) => {
    //Adicionar verificação sobre o token
    const { description, value, transationType, movementType } = req.body
    if( !description || !value || !transationType || !movementType) {
        return res.status(400).send({message: 'Content cannot be empty'});
    }
​
    const newTransaction = new Transaction({
        description: description,
        movementType: movementType,
        transationType: transationType,
        value: value,
    });
​
    newTransaction.save((err, transaction) => {
        if(err) res.status(502).send({message: "Error. Bad gateway", err});
        return res.status(200).send({message: "Transaction created sucessfully!"});
    });
};

export default {createTransaction};