import mongoose from "mongoose";
import { normalizePhoneNumber } from "../../utils/normalizePhoneNumber.js";

const { Schema } = mongoose;

const userSchemaDefinition = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            trim: true,
        },
        email: { type: String, unique: true, sparse: true },
        phone: { type: String, unique: true, sparse: true },
        role: {
            type: String,
            default: "USER",
        },
        avatar: {
            type: String,
            sparse: true,
        },
        otp: {
            type: Number,
            sparse: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchemaDefinition.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

userSchemaDefinition.pre("save", function (next) {
    if (this.phone) {
        this.phone = normalizePhoneNumber(this.phone);
    }
    next();
});

export const User = mongoose.model("User", userSchemaDefinition);
