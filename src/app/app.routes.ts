import { Routes } from '@angular/router';
import { RegisterReciptTypeComponent } from './components/recipt-type/register-recipt-type/register-recipt-type.component';
import { ReciptTypeComponent } from './components/recipt-type/recipt-type.component';
import { CountryComponent } from './components/country/country.component';
import { CreateCountryComponent } from './components/country/create-country/create-country.component';
import { PaymentTypeComponent } from './components/payment-type/payment-type.component';
import { InsertpaymentTypeComponent } from './components/payment-type/insertpayment-type/insertpayment-type.component';
import { ModuloPagosComponent } from './components/modulo-pagos/modulo-pagos.component';
import { CategoryComponent } from './components/category/category.component';
import { AddEditCategoryComponent } from './components/category/add-edit-category/add-edit-category.component';
import { DeliveryTypeComponent } from './components/delivery-type/delivery-type.component';
import { CreateDeliveryTypeComponent } from './components/delivery-type/create-delivery-type/create-delivery-type.component';
import { CityComponent } from './components/city/city.component';
import { InsertCityComponent } from './components/city/insert-city/insert-city.component';
import { ModuloUbicacionComponent } from './components/modulo-ubicacion/modulo-ubicacion.component';
import { NotificationComponent } from './components/notification/notification.component';
import { InsertNotificationComponent } from './components/notification/insert-notification/insert-notification.component';
import { EntrepreneurshipComponent } from './components/entrepreneurship/entrepreneurship.component';
import { AddEditEntrepreneurshipComponent } from './components/entrepreneurship/add-edit-entrepreneurship/add-edit-entrepreneurship.component';
import { ChatConversationComponent } from './components/entrepreneurship/chat-conversation/chat-conversation.component';
import { PersonalizedDetailComponent } from './components/personalized-detail/personalized-detail.component';
import { InsertPersonalizeddetailComponent } from './components/personalized-detail/insert-personalizeddetail/insert-personalizeddetail.component';
import { PersonalizedproductdetailsComponent } from './components/personalizedproductdetails/personalizedproductdetails.component';
import { ListPersonalizedproductdetailsComponent } from './components/personalizedproductdetails/list-personalizedproductdetails/list-personalizedproductdetails.component';
import { InsertPersonalizedproductdetailsComponent } from './components/personalizedproductdetails/insert-personalizedproductdetails/insert-personalizedproductdetails.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { InsertPurchaseComponent } from './components/purchase/insert-purchase/insert-purchase.component';
import { ListImageComponent } from './components/products/list-image/list-image.component';
import { ViewProdcutsForSaleComponent } from './components/view-prodcuts-for-sale/view-prodcuts-for-sale.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { DetailProductForSaleComponent } from './components/view-prodcuts-for-sale/detail-product-for-sale/detail-product-for-sale.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';
import { InsertPurchaseDetailComponent } from './components/purchase-detail/insert-purchase-detail/insert-purchase-detail.component';

export const routes: Routes = [
  {
    path: 'moduloUbicacion', component: ModuloUbicacionComponent,
    children: [
      {
        path: 'paises', component: CountryComponent,
        children: [{ path: 'registro', component: CreateCountryComponent }]
      },
      {
        path: 'ciudades', component: CityComponent,
        children: [{ path: 'registro', component: InsertCityComponent }]
      },
    ]
  },
  {
    path: 'notificacion', component: NotificationComponent,
    children: [{ path: 'registro', component: InsertNotificationComponent }]
  },
  {
    path: 'category', component: CategoryComponent,
    children: [{ path: 'nuevo', component: AddEditCategoryComponent }]
  },
  {
    path: 'entrepreneurship', component: EntrepreneurshipComponent, children: [
      { path: 'add', component: AddEditEntrepreneurshipComponent },
      { path: 'edit/:id', component: AddEditEntrepreneurshipComponent },
      { path: 'chat/:id', component: ChatConversationComponent }
    ]
  },
  {
    path: 'moduloPagos', component: ModuloPagosComponent,
    children: [
      {
        path: 'ReceiptType', component: ReciptTypeComponent,
        children: [{ path: 'Register', component: RegisterReciptTypeComponent }]
      },
      {
        path: 'paymentType', component: PaymentTypeComponent,
        children: [{ path: 'registro', component: InsertpaymentTypeComponent }]
      },
      {
        path: 'deliveryType', component: DeliveryTypeComponent,
        children: [{ path: 'registro', component: CreateDeliveryTypeComponent }]
      }
    ]
  },
  {
    path: 'personalizedDetail',
    component: PersonalizedDetailComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertPersonalizeddetailComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertPersonalizeddetailComponent,
      },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'perzonalizedDetailsProduct/:id',
        component: PersonalizedproductdetailsComponent,
      },
      {
        path: 'listperzonalizedDetailsProduct',
        component: ListPersonalizedproductdetailsComponent
      },
      {
        path: 'ediciones/:id',
        component: InsertPersonalizedproductdetailsComponent
      }
    ],
  },
  {
    path: 'compras', component: PurchaseComponent,
    children: [{ path: 'registro', component: InsertPurchaseComponent }]
  },
  {
    path: 'detallecompras', component:PurchaseDetailComponent,
    children: [{path: 'registro', component: InsertPurchaseDetailComponent}]
  },
  {
    path: 'products', component: ProductsComponent,
    children: [
      { path: 'registro', component: CreateDeliveryTypeComponent },
      { path: 'registroImagenes/:idProduct', component: ListImageComponent },
      { path: 'verproducto/:idProduct', component: ViewProdcutsForSaleComponent },
    ]
  },
  {
    path: 'reviews', component: ReviewsComponent,
    children: [
      // {path:'nuevo', component: InsertReviewsComponent}
    ]
  },
  {
    path: 'viewsProducts', component: ViewProdcutsForSaleComponent,
    children: [
      { path: 'nuevo', component: DetailProductForSaleComponent }
    ]
  }
];
