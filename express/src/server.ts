import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { Iproduct } from "./interfaces";
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
  console.log("queryParams =>", filteredQuery);
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
  console.log(req.body)

  res.status(200).send({
    message:"the new product has been created"
  })
})

const PORT: number = 5050;
app.listen(PORT, () => {
  console.log(`the server is live now on : http://localhost:${PORT}`);
});
