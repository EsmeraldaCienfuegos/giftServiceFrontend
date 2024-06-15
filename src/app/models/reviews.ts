
import { UserWeb } from "./UserWeb";
import { Product } from "./product";


export class Reviews{
    idReviews: number =0
    dateReviews: Date = new Date(Date.now());
    scoreReviews: Number = 0.0
    commentReviews: string = ''
    users: UserWeb = new UserWeb()
    product: Product = new Product()
}