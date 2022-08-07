const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Note = new Schema(
  {

    userid: {
        type: String,
        required: true,
      },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("note", Note);