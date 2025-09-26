import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  notes: String,
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);
export const CATEGORY_OPTIONS = [
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Utilities", value: "utilities" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Other", value: "other" },
];
export const EXPENSE_CATEGORIES = {
  food: "Food",
  transport: "Transport",
  entertainment: "Entertainment",
  utilities: "Utilities",
  healthcare: "Healthcare",
  other: "Other",
};