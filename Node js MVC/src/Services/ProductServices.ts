import { Iproduct, IproductBody } from "../interfaces";
import { generateFakeData } from "../utils/fakeData";

export default class ProductsServices {
  constructor(private products: Iproduct[]) {
    this.products = products;
  }

  findAll(): Iproduct[] {
    return this.products;
  }

  filterByQuery(filteredQuery?: string): Iproduct[] {
    if (filteredQuery) {
      //if it founded
      const propertiesToFilter = filteredQuery.split(","); // split it to convert it to an array
      let filteredProductsByQuery = [];
      filteredProductsByQuery = this.findAll().map((product) => {
        const filteredProduct: any = {};
        propertiesToFilter.forEach((property) => {
          if (product.hasOwnProperty(property as keyof Iproduct))
            filteredProduct[property] = product[property as keyof Iproduct];
        });
        // after loop on the properities return the object to put it in the filteredProductsByQuery[]
        return { id: product.id, ...filteredProduct };
      });
      return filteredProductsByQuery;
    }
    // console.log("queryParams =>", filteredQuery);
    return this.findAll();
  }

  filterByID(productID: number): Iproduct | undefined {
    return this.findAll().find((product) => product.id === productID);
  }

  createProduct(product: IproductBody) {
    return this.findAll().push({ id: this.findAll().length, ...product });
  }

  updateProductByIndex(productId: number, productBody: Iproduct) {
    const foundedProduct: number | undefined = this.findAll().findIndex(
      (product) => product.id === productId
    );
     if (foundedProduct !== -1) {
          
           this.findAll()[foundedProduct] = {
             ...this.findAll()[foundedProduct],
             ...productBody,
           };
           return {success:true};
          }
          else{
            return {success:false};
  }
}



  deleteProductByIndex(productId: number) {
    const productIndex: number | undefined = this.findAll().findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      this.findAll().splice(productIndex, 1);
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
