
import { ProductData } from "../types/product-api.type";


export class ProductCardDataModel{
    static convertToCardType(prodData:ProductData[]){
            return prodData.map((data)=>{return { 
                image:data.images[0],
                title:data.title,
                price:data.price.toString(),
                description:data.description
            }})
    }
}