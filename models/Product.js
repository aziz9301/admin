import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: {type:String, required:true},
  price: {type: Number, required: true},
  details: {type:String},
  isi: {type:String},
  stock: {type:Number},
  date: { type: Date, required: true },
  images: [{type: String}],
  satuan: {type:mongoose.Types.ObjectId, ref:'SatuanProduk'},
  brand: {type:mongoose.Types.ObjectId, ref:'Brand'},
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
});

export const Product = models.Product || model('Product', ProductSchema);