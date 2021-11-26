import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
  {
    url: String,
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isWatched: { type: Boolean, default: false },
    watchedAt: Date,
    dueDate: Date,
    todo: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo', required: true },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
    domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Link', LinkSchema);
