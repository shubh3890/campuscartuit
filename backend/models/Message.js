import mongoose from "mongoose";
const messageSchema  = new mongoose.Schema({
    from_user_id:{type:String,required:true,ref:'User'},
    to_user_id:{type:String,required:true,ref:'User'},
    text:{type:String,trim:true},
    seen:{type:Boolean,default:false},
    message_type:{type:String,enum:['text','image']},
    media_url:{type:String}

},{timestamps:true,minimize:false})
const Message = mongoose.model('Message',messageSchema)
export default Message