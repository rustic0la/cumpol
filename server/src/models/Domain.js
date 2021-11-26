import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: Date,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  },
  { timestamps: true },
);

export default mongoose.model('Domain', DomainSchema);
