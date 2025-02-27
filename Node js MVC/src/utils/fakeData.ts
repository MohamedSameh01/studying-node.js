import { faker } from "@faker-js/faker";
import { Iproduct } from "../interfaces";


export const generateFakeData=():Iproduct[]=>{
    return Array.from({length:25},(_,idx)=>{
        return {
          id: idx + 1,
          title: faker.commerce.productName(),
          price: +faker.commerce.price({ min: 100, max: 200 }),
          discription: faker.commerce.productDescription(),
          material: faker.commerce.productMaterial(),
        };
    })
}