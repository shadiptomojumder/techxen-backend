import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        banner: {
            type: String, // URL of the project banner image
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String], // Array of strings for project tags
            required: true,
            validate: {
                validator: (arr) => arr.length > 0, // Ensure at least one tag is provided
                message: "At least one tag is required.",
            },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

projectSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export const Project = mongoose.model("Project", projectSchema);