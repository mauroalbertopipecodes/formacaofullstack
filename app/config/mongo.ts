import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config({path: '.env'});

// const mongoOpts: ConnectOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }

const mongoConfig = {
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.kv39d5y.mongodb.net/Formacao?retryWrites=true&w=majority`
}

export default mongoConfig;