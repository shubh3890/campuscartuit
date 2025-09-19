import fs from 'fs'
import Post from '../models/Post.js';
import imagekit from '../configs/imagekit.js';
export const addPost =async (req,res)=>{
    try {
        const {userId} = req.auth();
        const {content,post_type,category,item_name} = req.body;
        const images = req.files;
        let image_urls =[];
        if(images.length){
            images.map(async(image)=>{
                const fileBuffer=fs.readFileSync(image.path)
                 const response = await imagekit.upload({
                            file:fileBuffer,
                            fileName:image.originalname,  
                            folder:'posts'
                        })
                        const url = imagekit.url({
                            path:response.filePath,
                            transformation:[
                                {quality:'auto'},
                                {format:'webp'},
                                {width:'1280'}
                            ]
                        })
                        return url;
            })
        }
        await Post.create({
            user:userId,
            content,
            image_urls,
            post_type,
            category,
            item_name
        })
        res.json({success:true,message:"Post created successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
export const getFeedPosts = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = await Post.find().sort({createdAt:-1}).skip(skip).limit(limit)
        res.json({success:true,posts,nextPage:page+1,hasMore: posts.length === limit})

    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }
}