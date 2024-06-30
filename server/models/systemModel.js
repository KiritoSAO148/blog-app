import mongoose from "mongoose";

const systemModel = new mongoose.Schema(
  {
    openaiKey: String,
    id: String,
  },
  { timestamps: true }
);

const System = mongoose.model("System", systemModel);

export default System;
