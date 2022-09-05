import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}

    async createProduct(productDto: ProductDto,images:any) {
        try {
            let imagesString = '';
            images.forEach(image => {
                imagesString += image.filename + ',';
            })
            const product = await this.prisma.product.create({
                data: {
                   name: productDto.name,
                   description: productDto.description,
                   price: parseInt(productDto.price),
                   images: imagesString,
                   sizes: productDto.sizes,
                }
            });
            return product;
        } catch (error) {
            return error.message;
        }
    }

    async getAllProducts() {
        try {
            const products = await this.prisma.product.findMany();
            return products;
        } catch (error) {
            return error.message;
        }
    }


}
