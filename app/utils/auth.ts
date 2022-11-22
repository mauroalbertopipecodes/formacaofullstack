import {Response} from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import secret from '../config/secret';

const hasRequestAuthorization = (auth: string, res: Response) => {
    if(!auth){
        return res.status(403).json({error: "Please login before making any operation"});
    }
}

const getPayloadFromToken = (token: string, res: Response): JwtPayload => {
    try {
        var payload = jwt.verify(token ?? "", secret) as JwtPayload;
        return payload;
    } catch(e) {
        if(e instanceof jwt.JsonWebTokenError){
            return res.status(401).send({message: "Session expired, please login again"});
        }
        return res.status(500).end()
    };
}

export default {getPayloadFromToken, hasRequestAuthorization}