import dotenv from 'dotenv';


//This is not working, Im getting the env vars from the windows variables
dotenv.config({ path: '.env'});

const mongoConfig = {
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kv39d5y.mongodb.net/Formacao?retryWrites=true&w=majority`
}

export default mongoConfig;