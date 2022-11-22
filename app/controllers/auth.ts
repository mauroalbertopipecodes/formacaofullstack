import {Request, Response} from 'express';
import User from "../models/User";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import secret from "../config/secret";

dotenv.config({ path: '.env'});
const jwtExpirySeconds = 3600;

const signup = async(req: Request, res: Response) => {
    const { name, email, password } = req.body
    if( !name || !email || !password ) {
        return res.status(400).send({message: 'Content cannot be empty'});
    }
​
    const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password,8),
    });
​
    newUser.save((err, user) => {
        if(err) res.status(502).send({message: "Error. Bad gateway", err});
        return res.status(200).send({message: "User created sucessfully!"});
    });
};

const signin = async(req: Request, res: Response) => {
    const { email, password } = req.body
    if( !email || !password ) {
        return res.status(400).send({message: "Incorrect Email or Password!"});
    }
    
    const user = await User.findOne({ email });
    const access_token = jwt.sign({ email }, secret, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})

    if (!user) {
        return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
        })
    }
    bcrypt.compare(password, user.password).then((result) => {
        if(result){
           return res.status(200).json({
                message: "Login successful",
                access_token,
            })
        }
        else {
            return res.status(400).json({ message: "Login not succesful" })
        }
            
    })
}

export default {signup,signin};
