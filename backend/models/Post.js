import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    user:{
        type:String,
        ref:"User",
        required:true 
    },
    content:{
        type:String
    },
    item_name:{
        type:String
    },
    image_urls:[{
        type:String
    }],
    post_type:{
        type:String,
        enum:['text','image','text_with_image'],
        required:true
    },
    category:{
        type:String,
        enum:['sell','buy','lost&found','donate'],
        required:true
    }
},{timestamps:true,minimize:false})
const Post = mongoose.model('Post',postSchema)
export default Post