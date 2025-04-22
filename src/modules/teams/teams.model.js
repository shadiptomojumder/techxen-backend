import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: String, // URL of the team member's picture
            required: true,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

teamSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export const Team = mongoose.model("Team", teamSchema);