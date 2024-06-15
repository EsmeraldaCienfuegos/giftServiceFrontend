import { Category } from './category';
import { Entrepreneurship } from './entrepreneurship';

export class Product {
    idProduct: number = 0;
    nameProduct: string = '';
    priceProduct: number = 0;
    descriptionProduct: string = '';
    stockProduct: number = 0
    category: Category = new Category();
    entrepreneurship: Entrepreneurship = new Entrepreneurship()

}
