import {Request, Response, NextFunction} from 'express';
import User from "../models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import secret from "../config/secret";
import dotenv from 'dotenv';

dotenv.config({ path: '.env'});

const signup = async(req: Request, res: Response) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).send({message: "Content can to be empty"});
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    });

    newUser.save((err, user) => {
        if(err) res.status(502).send({message: "Erro", err})
        res.status(200).send({message: "Utilizador criado com sucesso"})
    })

};

const signin = async(req: Request, res: Response) => {
    
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message: "Content can't be empty"});
    }
    const username = req.body.email;
    let token = process.env.ACCESS_TOKEN_SECRET;
    let user = mongoose.model("User");
    user.find({email: req.body.email, password: req.body.password}, (err: any,data: any) => {
        if(err){
            console.log("err", err);
            return res.status(204).json({message: "User with that email does not exists " + err})
        } else {
            const accessToken = jwt.sign(username, token)
            console.log(data);
            return res.status(200).json({message: "Login Successful.", accessToken: accessToken}) 
        }
    }); 
}

export default {signup,signin};
