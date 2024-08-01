const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.json())
app.use(cors())
const CategorySchema=new mongoose.Schema({
    name:String,
    description:String
})

const CategoryModel=mongoose.model("Category",CategorySchema)

 
app.get("/categories", async (req,res)=>{
    let categories= await CategoryModel.find()
    res.send(categories)
})

app.post("/categories",async (req,res)=>{
    let newCategory= new CategoryModel(req.body)
   await newCategory.save()
   res.send(newCategory)
})

app.delete("/categories/:id", async (req,res)=>{
   
    let id=req.params.id
    let category= await CategoryModel.findByIdAndDelete(id)
    res.send(category)
})

mongoose.connect("mongodb+srv://garibat:1bX9pbMHcFNk6eIG@garibat.fm66pfb.mongodb.net/test1")

.then(res=>{
    console.log("Connected")
})
.catch(err=>{
    console.log(err)
})
app.listen(3030,()=>{
    console.log("3030 portu aktivdir")
})


