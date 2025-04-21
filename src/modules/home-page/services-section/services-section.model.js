import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceSectionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        banner: {
            type: String, // URL of the banner image
            required: true,
        },
        icon: {
            type: String, // URL of the icon image
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

serviceSectionSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export const ServiceSection = mongoose.model("ServiceSection", serviceSectionSchema);