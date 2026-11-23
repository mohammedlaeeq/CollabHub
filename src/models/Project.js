const mongoose=require('mongoose');
const schema=new mongoose.Schema({
 title:{type:String,required:true,trim:true,maxlength:100},
 description:{type:String,required:true,trim:true,maxlength:1500},
 category:{type:String,enum:['Web Development','AI / ML','App Development','Cybersecurity','Data Science','Other'],default:'Other'},
 skills:[String], teamSize:{type:Number,min:1,max:20,default:3},
 authorName:{type:String,required:true,trim:true},
 authorEmail:{type:String,required:true,lowercase:true,trim:true},
 status:{type:String,enum:['Open','In Progress','Completed'],default:'Open'}
},{timestamps:true});
module.exports=mongoose.model('Project',schema);