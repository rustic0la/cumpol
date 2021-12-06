import { Schema, model } from 'mongoose';

const DomainSchema = new Schema(
  {
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: Date,
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  },
  { timestamps: true },
);

export default model('Domain', DomainSchema);
