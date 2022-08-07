import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
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

const Note = mongoose.model("note", NoteSchema);
export default Note;
