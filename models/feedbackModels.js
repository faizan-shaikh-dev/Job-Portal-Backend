import mongoose from 'mongoose';

const feedBackSchema = new mongoose.Schema({

    name:{
        type: String,
        required : true,
        trim: true,
        minlength: 2,
    }, 

    role:{
       type: String,
       required: true,
       trim: true,
       default: "",
    },

    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 50,
    },

    approved: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export default mongoose.model("feedBack", feedBackSchema);