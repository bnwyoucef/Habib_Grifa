import { IsNotEmpty } from 'class-validator';
export class ProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    sizes: string;
}