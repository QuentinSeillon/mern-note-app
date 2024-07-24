const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;
