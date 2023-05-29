import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  username: String
  password: String;
  confirm_password: String;
  // recipes?: Schema.Types.ObjectId[];
}
 
export const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
      min: 1,
      default: 'update in profile'
    },
    lastName: {
      type: String,
      required: false,
      min: 1,
      default: 'update in profile'
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    confirm_password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    // recipes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Recipe'
    //   },
    // ],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);

