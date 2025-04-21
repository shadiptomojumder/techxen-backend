import mongoose from "mongoose";

const { Schema } = mongoose;

const heroSectionSchema = new Schema(
    {
        quote: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        services: {
            type: [String], // Array of strings for service tags
            required: true,
            validate: {
                validator: (arr) => arr.length > 0, // Ensure at least one service is provided
                message: "At least one service tag is required.",
            },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

heroSectionSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export const HeroSection = mongoose.model("HeroSection", heroSectionSchema);