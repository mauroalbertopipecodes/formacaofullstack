import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import {router as PostRouter} from './routes/posts';
import {router as AuthRouter} from './routes/auth';
import {router as TransactionRouter} from './routes/transactions';
import mongoose from 'mongoose';
import mongoConfig from './config/mongo';
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

mongoose.connect(mongoConfig.url).then(() => {
    console.log("Connected")
}).catch(err => {
    console.log("Erro " + err)
})

const router: Express = express();

router.use(express.urlencoded({extended:false}));
router.use(express.json());
 
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "API Formação",
          version: "0.1.0",
          description:
            "This is a simple CRUD API",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
            name: "Eng. Mauro Alberto",
            url: "https://ma.app",
            email: "mauro.alberto@email.com",
          },
        },
        servers: [
          {
            url: "http://localhost:8080/",
          },
        ],
      },
      apis: ["./app/routes/*.ts"],
    };
    
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)))

router.use('/', PostRouter)
router.use('/', AuthRouter)
router.use('/', TransactionRouter)

router.listen(8080, () => {
    console.log("Starting server ")
})

export default router;