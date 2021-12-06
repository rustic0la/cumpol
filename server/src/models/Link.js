import { Schema, model } from 'mongoose';

const LinkSchema = new Schema(
  {
    url: String,
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isWatched: { type: Boolean, default: false },
    watchedAt: Date,
    dueDate: Date,
    todoId: { type: String, required: true },
    collectionId: { type: String, required: true },
    domainId: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Link', LinkSchema);
