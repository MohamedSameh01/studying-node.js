import { Iproduct } from "../interfaces";
import { Request, Response } from "express";
import ProductsServices from "../Services/ProductServices";

class ProductController {
  // constructor =>the first thing run when take an instance of the code
  constructor(private productService: ProductsServices) {}

  // methods

  getProducts(req: Request): Iproduct[] {
    const filterQuery = req.query.filter;
    if (filterQuery as string) {
      return this.productService.filterByQuery(filterQuery as string);
    }
    return this.productService.findAll();
  }

  getProductByID(req: Request, res: Response) {
    const productID = +req.params.id;
    if (isNaN(+productID)) {
      res.status(404).send("Invalid Product Id");
      return;
    }
    const product = this.productService.filterByID(productID);
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

  createProduct(req: Request, res: Response) {
    const newProduct = req.body;
    this.productService.createProduct(newProduct);

    res.status(201).send({
      id: this.productService.findAll().length + 1,
      ...newProduct,
    });
  }

  updateProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    if (isNaN(productId)) {
      res.status(404).send({
        message: "this product is not found",
      });
      return;
    }

    //  const foundedProduct=this.productService.updateProductByIndex(productId);

    if (this.productService.updateProductByIndex(productId, req.body)) {
      res.status(200).send({ message: "the product has been updated!" });
    } else {
      res.status(404).send({
        message: "this product is not found",
      });
      return;
    }
  }

  deleteProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    if (isNaN(productId)) {
      res.status(404).send("invalid product Id");
      return;
    }
    if (this.productService.deleteProductByIndex(productId)) {
      res.status(200).send("the product has been deleted successfully");
    } else {
      res.status(404).send("error in delete this product");
    }
  }
}

export default ProductController;
