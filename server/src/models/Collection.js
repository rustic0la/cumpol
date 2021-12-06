import { Schema, model } from 'mongoose';

const CollectionSchema = new Schema(
  {
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: Date,
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    domainId: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Collection', CollectionSchema);
