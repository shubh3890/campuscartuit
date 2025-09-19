import mongoose from "mongoose";
const storySchema = new mongoose.Schema({
    user:{
        type:String,
        ref:"User",
        required:true 
    },
    content:{
        type:String
    },
    views_count:[
       { type:String,ref:'User'}
    ],
    media_url:[{
        type:String
    }],
    media_type:{
        type:String,
        enum:['text','image','video'],
        required:true
    },
    backgound_color:{
        type:String,
    }
},{timestamps:true,minimize:false})
const Story = mongoose.model('Story',storySchema)
export default Story