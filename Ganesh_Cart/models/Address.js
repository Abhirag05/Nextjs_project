import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{type:String,required:true,ref:"user"},
    fullName:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    pincode:{type:String,required:true},
    area:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},   
})

const Address = mongoose.models.address || mongoose.model('address',addressSchema)

export default Address
