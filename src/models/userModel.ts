import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [
    {
      title: { type: String, required: true },
      isPublic: { type: Boolean, required: true },
      todos: [
        {
          text: { type: String, required: true },
          isCompleted: { type: Boolean, required: true },
          isTrash: { type: Boolean, required: true },
        },
      ],
    },
  ],
});

const userModel = model("users", userSchema);

export default userModel;
