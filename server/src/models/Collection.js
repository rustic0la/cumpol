import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: Date,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Collection', CollectionSchema);
