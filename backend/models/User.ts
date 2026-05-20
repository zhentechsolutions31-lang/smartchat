import { Schema, model } from "mongoose";
import { UserProps } from "../types";

const UserSchema = new Schema<UserProps>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        avatar: { type: String, default: "" },
        created: { type: Date, default: Date.now }

    }
)

export const User = model<UserProps>("User", UserSchema)