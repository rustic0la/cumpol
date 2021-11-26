import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    createdAt: { type: Date, default: Date.now },
    dueDate: Date,
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Links' }],
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
    domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Todo', TodoSchema);
