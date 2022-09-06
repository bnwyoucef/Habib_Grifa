import { IsNotEmpty } from "class-validator";

export class OrderDto {
    @IsNotEmpty()
    clientName: string;
    @IsNotEmpty()
    clientPhone: string;
    @IsNotEmpty()
    productImageName: string;
    @IsNotEmpty()
    clientWilaya: string;
    @IsNotEmpty()
    productSize: string;
    @IsNotEmpty()
    productQuantity: string;
    @IsNotEmpty()
    productId: string;
}