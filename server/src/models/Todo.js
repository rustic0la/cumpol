import mongoose from 'mongoose';

const TodoSchema = new Schema(
  {
    title: String,
    createdAt: { type: Date, default: Date.now },
    dueDate: Date,
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Links' }],
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
    domainId: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Todo', TodoSchema);
