import { Iproduct } from "./interfaces/index";
import express from "express";
import { generateFakeData } from "./utils/fakeData";
import ProductController from "./controllers/productController";
import ProductsServices from "./Services/ProductServices";
// import { Iproduct } from "./interfaces";
const app = express();
app.use(express.json());

const productsData = generateFakeData();

const productService = new ProductsServices(productsData);
const productController = new ProductController(productService);

// console.log("productController",productController.getProducts())

app.get("/", (req, res) => {
  res.send(`<h1>Hello My name is mohamed Sameh</h1>`);
});

// get products based on query paranms
app.get("/products", (req, res) => {
  res.send(productController.getProducts(req));
});

//  get product by ID

app.get("/products/:id", (req, res) => {
  res.send(productController.getProductByID(req, res));
});

app.post("/products", (req, res) => {
  res.send(productController.createProduct(req, res));
});

app.patch("/products/:id", (req, res) => {
  res.send(productController.updateProduct(req, res));
});

app.delete("/products/:id", (req, res) => {
  res.send(productController.deleteProduct(req, res));
});

const PORT: number = 5050;
app.listen(PORT, () => {
  console.log(`the server is live now on : http://localhost:${PORT}`);
});
