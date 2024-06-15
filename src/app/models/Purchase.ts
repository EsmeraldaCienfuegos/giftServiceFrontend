import { DeliveryType } from "./DeliveryType"
import { PaymentType } from "./PaymentType"
import { ReceiptType } from "./ReceiptType"
import { UserWeb } from "./UserWeb"

export class Purchase{
    idPurchase: number=0
    pricePurchase:number=0
    datePurchase: Date= new Date(Date.now())
    purchaseStatus: boolean = true
    address: string = ''
    deliveryTypes: DeliveryType= new DeliveryType()
    paymentTypes: PaymentType= new PaymentType()
    receiptTypes: ReceiptType= new ReceiptType()
    users: UserWeb= new UserWeb()
}