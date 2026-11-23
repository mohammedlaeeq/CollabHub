const mongoose=require('mongoose');
const schema=new mongoose.Schema({
 project:{type:mongoose.Schema.Types.ObjectId,ref:'Project',required:true},
 studentName:{type:String,required:true,trim:true},
 studentEmail:{type:String,required:true,lowercase:true,trim:true},
 message:{type:String,default:'',maxlength:500},
 status:{type:String,enum:['Pending','Accepted','Declined'],default:'Pending'}
},{timestamps:true});
schema.index({project:1,studentEmail:1},{unique:true});
module.exports=mongoose.model('JoinRequest',schema);