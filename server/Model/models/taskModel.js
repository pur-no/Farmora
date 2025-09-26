// models/taskModel.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  dueDate: Date,
  status: { type: String, default: 'Pending' },
});

export default mongoose.model('Task', taskSchema);
