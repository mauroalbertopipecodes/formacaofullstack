import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    access_token: string
};

const User: Schema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   access_token: {
    type: String
   },
}, {timestamps: true});

export default mongoose.model<IUser>('User', User, 'Users')

//ORM SEqualize.