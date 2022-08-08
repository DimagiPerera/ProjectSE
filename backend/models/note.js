import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    email: {
      type: String,

      trim: true,
    },

    title: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("note", noteSchema);
export default Note;
