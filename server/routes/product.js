const  express =require('express')
const router =express.Router();
const Product= require('../models/Product');
//POST
router.post('/',async (req,res)=>{
    const {name,screen,cpu,ram,rom,img}=req.body;
    try{
        const newProduct=new Product({
            name,screen,cpu,ram,rom,img
        }
        );
        await newProduct.save();
        res.json({success:true,message:"them thanh cong",newProduct})
    }catch(error){
        console.log(error.messagem,"loi cmnr");
    }
})

//GET
router.delete('/:id',async (req,res)=>{
    try{
        const deletedProduct=await Product.findOneAndDelete({_id:req.params.id})
        res.json({success:true,message:"xoa thanh cong",deletedProduct})
    }catch(error){
        console.log(error.messagem,"loi khong xoa duoc");
    }
})
module.exports= router;

//PUT
router.put('/:id',async (req,res)=>{
    const {name,screen,cpu,ram,rom,img}=req.body;
    try{
        const newProduct={name,screen,cpu,ram,rom,img};
        await Product.findOneAndUpdate({_id:req.params.id},{name,screen,cpu,ram,rom,img});
        res.json({success:true,message:"update thanh cong",newProduct})
    }catch(error){
        console.log(error.message,"loi update");
    }
})
//GET ALL
router.get('/',async (req,res)=>{
    try{
        const products=await Product.find();
        res.json({success:true,message:"tim thay thanh cong",products})
    }catch(error){
        console.log(error.messagem,"loi khogn tim duoc");
    }
})
//GET ONE
router.get('/:id',async (req,res)=>{
    try{
        const product=await Product.findOne({_id:req.params.id});
        res.json({success:true,message:"tim thay thanh cong",product})
    }catch(error){
        console.log(error.messagem,"loi khogn tim duoc");
    }
})