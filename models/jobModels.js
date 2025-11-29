import mongoose from "mongoose";

//JObs Models
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

  
    company: {
      type: String,
      required: true,
      trim: true,
    },

  
    location: {
      type: String,
      required: true,
      trim: true,
    },

   
    jobType: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Remote",
    },

   
    experience: {
      type: String,
      trim: true,
    },

    
    salary: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    
    responsibilities: {
      type: [String],
      default: [],
    },

    
    requirements: {
      type: [String],
      default: [],
    },

    
    applyUrl: {
      type: String,
      trim: true,
    },

    
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    
    category: {
      type: String,
      required: true,
      trim: true,
    },

   
    logo: {
      type: String,
      trim: true,
    },

   
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
