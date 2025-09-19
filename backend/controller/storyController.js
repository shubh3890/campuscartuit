import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Story from '../models/Story.js';
import User from '../models/User.js'
import { inngest } from '../inngest/index.js';
export const addUserStory = async (req,res) => {
    try {
        const userId = req.auth();
        const {content,media_type,background_color} = req.body;
        const media = req.file;
        let media_url = '';
        if(media_type === 'image' || media_type === 'video'   ){
            const fileBuffer = fs.readFileSync(media.path);
            const response = await imagekit.upload({
                file:fileBuffer,
                fileName:media.originalname,
            })
            media_url = response.url
        }
        const story = await Story.create({
            user:userId,
            content,
            media_url,
            media_type,
            background_color
        })
        await inngest.send({
            name:'app/story.delete',
            data:{storyId:story._id}
        })
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error.message"});
        
    }
}
export const getStories = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const stories = await Story.find().sort({createdAt:-1}).skip(skip).limit(limit)
        res.json({success:true,stories,nextPage:page+1,hasMore: stories.length === limit})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error.message"});
    }
}