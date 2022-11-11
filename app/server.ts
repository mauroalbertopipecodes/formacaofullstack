import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import {router as PostRouter} from './routes/posts';
import {router as AuthRouter} from './routes/auth';
import mongoose from 'mongoose';
import mongoConfig from './config/mongo';

mongoose.connect(mongoConfig.url).then(() => {
    console.log("Connected")
}).catch(err => {
    console.log("Erro " + err)
})

const router: Express = express();

router.use(express.urlencoded({extended:false}));
router.use(express.json());

router.use('/', PostRouter)
router.use('/', AuthRouter)

router.listen(8080, () => {
    console.log("Starting server ")
})