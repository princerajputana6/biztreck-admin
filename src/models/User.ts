import { connect } from "@/database/mongo.config";
import { Schema, Document, Model } from "mongoose";

// Define user schema
const userSchema = new Schema<UserDocument>({
  name: {
    required: [true, "Name field is required."],
    minLength: [2, "Name must be 2 character long."],
    type: Schema.Types.String,
  },
  email: {
    required: [true, "Email field is required."],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
  },
  avatar: {
    required: false,
    type: Schema.Types.String,
  },
  role: {
    required: true,
    type: Schema.Types.String,
    default: "User",
  },
  password_reset_token: {
    required: false,
    type: Schema.Types.String,
    trim: true,
  },
  magic_link_token: {
    required: false,
    type: Schema.Types.String,
    trim: true,
  },
  magic_link_sent_at: {
    required: false,
    type: Schema.Types.Date,
  },
});

// Define and export user model
export interface UserDocument extends Document {
  name?: string | null | undefined;
  email?: string | null | undefined;
  password: string;
  avatar?: string;
  role?: string | null | undefined; // Ensure 'role' property is defined
  password_reset_token?: string | undefined;
  magic_link_token?: string | undefined;
  magic_link_sent_at?: Date | undefined;
}

export const User: Model<UserDocument> = connect().model<UserDocument>("user", userSchema);
