import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [
    {
      title: { type: String, required: true },
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

const userModel = mongoose.model("users", userSchema);

export default userModel;
