import { Product } from "./product"
import { Purchase } from "./Purchase"

export class PurchaseDetail{
    idPurchaseDetail: number=0
    amountTotalPurchaseDetail:number=0
    cantidadPurchaseDetail:number=0
    purchase: Purchase= new Purchase()
    product: Product=new Product()
}