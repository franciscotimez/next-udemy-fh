import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, require: true },
  createdAt: { type: String },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-process', 'finished'],
      message: '{VALUE} no esta permitido'
    }
  }
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;