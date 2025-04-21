import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        banner: {
            type: String,
            required: true, // URL of the blog banner image
        },
        title: {
            type: String,
            required: true,
            trim: true,
            index: true, // Index for faster search
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        // author: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User", // Reference to the User model
        // },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

blogSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export const Blog = mongoose.model("Blog", blogSchema);