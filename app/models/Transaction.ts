import mongoose, {Schema, Document} from "mongoose";

interface ITransaction extends Document {
    id: Number,
    createdBy: String,
    description: String,
    movementType: String,
    transationType: String,
    value: Number,
}

const Transaction: Schema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
   description: {
    type: String,
    required: true
   },
//    movementType: {
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "MovementType", 
//     required: true
//    },
   movementType: {
    type: Number, 
    required: true
   },
   transationType: {
    type: String,
    required: true
   },
   value: {
    type: Number,
    required: true,
   },
}, {timestamps: true});

export default mongoose.model<ITransaction>('Transaction', Transaction, 'Transaction')

