import mongoose, {Schema, Document} from "mongoose";

interface IMovementType extends Document {
    id: Number;
    value: string;
};

const MovementType: Schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
   value: {
    type: String,
    required: true,
}});

export default mongoose.model<IMovementType>('MovementType', MovementType, 'MovementTypes')

