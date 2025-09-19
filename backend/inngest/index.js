import { Inngest } from "inngest";
import User from "../models/User.js";
import Story from "../models/Story.js";
import Message from "../models/Message.js";
import sendEmail from "../configs/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "campuscartuit-app" });
const syncUserCreation =  inngest.createFunction({
    id:'sync-user-from-clerk'
},{
    event:'clerk/user.created'
},
async ({event})=>{
      console.log("Clerk User Created Event:", event.data);  
    const {id,first_name,last_name,email_addresses,image_url} = event.data
    let username = email_addresses[0].email_address.split('@')[0]
    const user = await User.findOne({username})
    if(user){
        username = username + Math.floor(Math.random() * 10000)
    }
    const userData = {
        _id:id,
        email:email_addresses[0].email_address,
        full_name : first_name + ' ' + last_name,
        profile_picture : image_url,
        username


    }
    await User.create(userData)
}
)
const syncUserUpdation =  inngest.createFunction({
    id:'update-user-from-clerk'
},{
    event:'clerk/user.updated'
},
async ({event})=>{
    const {id,first_name,last_name,email_addresses,image_url} = event.data
    const updatedUserData= {
         email:email_addresses[0].email_address,
        full_name : first_name + ' ' + last_name,
        profile_picture : image_url,
    }
   await User.findByIdAndUpdate(id,updatedUserData)
}
)
const syncUserDeletion =  inngest.createFunction({
    id:'delete-user-with-clerk'
},{
    event:'clerk/user.deleted'
},
async ({event})=>{
    const {id} = event.data
    
   await User.findByIdAndDelete(id)
}
)
const deleteStory = inngest.createFunction(
    {id:'story-delete'},
    {event:'app/story.delete'},
    async ({event,step}) => {
        const {storyId} = event.data;
        const in24Hours = new Date(Date.now() + 24*60*60*1000);
        await step.sleepUntil('wait-for-24-hours',in24Hours);
        await step.run("delete-story",async ( ) => {
            await Story.findByIdAndDelete(storyId);
            return {message:"Story deleted"}
        })
    }
)

const  SendNotificationOfUnseenMessages = inngest.createFunction(
    {id:"send-unseen-messages-notification"},
    {cron:"TZ=America/New_York 0 9 * * *"},
    async ({steps}) => {
        const messages = await Message.find({seen:false}).populate("to_user_id");
        const unseenCount = {}
        messages.map((message)=>{
            unseenCount[message.to_user_id._id] = (unseenCount[message.to_user_id._id] || 0)
            +1;

        })
        for(const userId in unseenCount){
            const user = await User.findById(userId);
            const subject = `You have ${unseenCount[userId]} unseen messages`;
            const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>Hi ${user.full_name},</h2>
  <p>You have ${unseenCount[userId]} unseen messages</p>
  <p>Click <a href="${process.env.FRONTEND_URL}/messages" style="color: #10b981;">here</a> to view them</p>
  <br/>
  <p>Thanks,<br/>CampusCart - Stay Connected</p>
</div>

            `;
            await sendEmail({
                to:user.email,
                subject,
                body
            })
        }
        return {message:"Notification sent ."}
    }
)
// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserUpdation,syncUserDeletion,deleteStory,SendNotificationOfUnseenMessages];