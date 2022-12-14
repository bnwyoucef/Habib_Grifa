import { IsNotEmpty,IsOptional } from 'class-validator';
export class ProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    sizes: string;
    @IsNotEmpty()
    categoryId: string;
}

export class UpdateProductDto {
    name: string;
    price: string;
    description: string;
    sizes: string;
    categoryId: string;
}