import { Iproduct } from './interfaces/index';
import express from "express";
import { generateFakeData } from "./utils/fakeData";
// import { Iproduct } from "./interfaces";
const app = express();
app.use(express.json())

const productsData = generateFakeData();
app.get("/", (req, res) => {
  res.send(`<h1>Hello My name is mohamed Sameh</h1>`);
});

// get products based on query paranms
app.get("/products", (req, res) => {
  const filteredQuery = req.query.filter as string;  // get the query but make sure it's a value for the title
  if (filteredQuery) { //if it founded
    const propertiesToFilter = filteredQuery.split(",");  // split it to convert it to an array
    let filteredProductsByQuery = [];
    filteredProductsByQuery = productsData.map((product) => {
      const filteredProduct: any = {};
      propertiesToFilter.forEach((property) => {
        if (product.hasOwnProperty(property as keyof Iproduct))
          filteredProduct[property] = product[property as keyof Iproduct];
      });
      // after loop on the properities return the object to put it in the filteredProductsByQuery[]
      return { id: product.id, ...filteredProduct };
    });
    res.send(filteredProductsByQuery);
  }
  // console.log("queryParams =>", filteredQuery);
  res.send(productsData);
});

//  get product by ID

app.get("/products/:id", (req, res) => {
  const productID = req.params.id;

  if (isNaN(+productID)) {
    res.status(404).send("Invalid Product Id");
  } else {
    const product: Iproduct | undefined = productsData.find(
      (el) => el.id === +productID
    );
    if (product) {
      res.status(200).send({
        id: product.id,
        title: product.title,
        price: product.price,
        discrition: product.discription,
        material: product.material,
      });
    } else {
      res.status(404).send("Invalid Product Id");
    }
  }
});

app.post("/products",(req,res)=>{
  const newProduct=req.body;

  productsData.push({id:productsData.length+1,...newProduct})

  res.status(201).send({
    id:productsData.length+1,
    ...newProduct
  })
})


app.patch("/products/:id",(req,res)=>{
  const productId=+req.params.id;
  if(isNaN(productId)){
    res.status(404).send({
      message:"this product is not found"
    })
  return ;
  }

  const foundedProduct:number|undefined=productsData.findIndex((product)=>product.id===productId);
  console.log("founded product",foundedProduct)
  if(foundedProduct!==-1){
     const updatedProduct = req.body;
     productsData[foundedProduct] = {
       ...productsData[foundedProduct],
       ...updatedProduct,
     };
     res.status(200).send({ message: "the product has been updated!" });
    
  }
  else{
    res.status(404).send({
      message: "this product is not found",
    });
    return;
  }

});


app.delete("/products/:id",(req,res)=>{
  const productId=+req.params.id;
  if(isNaN(productId)){
     res.status(404).send({
      message:"wrong id "
    })
    return ;
  }

  const productIndex:number|undefined =productsData.findIndex((product)=>product.id===productId);
  console.log(productIndex)
  if (productIndex !== -1) {
    productsData.splice(productIndex,1);
    res.status(200).send({
      message:"the product has been deleted "
    })
    return ;
  }
  else{
       res.status(404).send({
         message: "the product not found",
       });
       return;
  }


})

const PORT: number = 5050;
app.listen(PORT, () => {
  console.log(`the server is live now on : http://localhost:${PORT}`);
});
