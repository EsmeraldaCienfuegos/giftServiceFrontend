import { PersonalizedDetail } from "./personalizeddetail"
import { Product } from "./product"

export class PersonalizedProductDetail {
    idPersonalizedProductDetail:number=0
    personalizedDetails: PersonalizedDetail = new PersonalizedDetail()
    products: Product= new Product()
}