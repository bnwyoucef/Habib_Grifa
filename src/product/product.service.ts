import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './dto';

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
                   categoryId: parseInt(productDto.categoryId),
                },
                include :{
                    category: true,
                    Order:true,
                }
            });
            return product;
        } catch (error) {
            return error.message;
        }
    }

    async getAllProducts() {
        try {
            const products = await this.prisma.product.findMany({
                include:{
                    category: true,
                    Order:true,
                },

            });
            return products;
        } catch (error) {
            return error.message;
        }
    }

    async deleteProductById(id: string) {
        try {
            const product = await this.prisma.product.delete({
                where: {
                    id: parseInt(id)
                },
                include:{
                    category: true,
                    Order:true,
                },
            });
            return product;
        } catch (error) {
            return error.message;
        }
    }
    async getProductById(id: string) {
        try {
            const product = await this.prisma.product.findFirst({
                where: {
                    id: parseInt(id)
                },
                include: {
                    category: true,
                    Order: true,
                }
            });
            return product;
        } catch (error) {
            return error.message;
        }
    }

    async updateProduct(id: string,productDto:any,images:any) {
        let newProduct = {}
        
        try {
            if(productDto.name) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    name: productDto.name,
                },
                include:{
                    category: true,
                    Order:true,
                },
               })
            }

            if(productDto.description) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    description: productDto.description,
                },
                include:{
                    category: true,
                    Order:true,
                },
               })
            }
            if(productDto.price) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    price: parseInt( productDto.price),
                },
                include:{
                    category: true,
                    Order:true,
                },
               })
            }

            if(productDto.sizes) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    sizes: productDto.sizes,
                },
                include:{
                    category: true,
                    Order:true,
                },
               })
            }
            if(productDto.categoryId) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    categoryId: parseInt(productDto.categoryId),
                },
                include:{
                    category: true,
                    Order:true,
                },
               })
            }
            if(images?.length) {
                let imagesStr = '';
                images.forEach((image) => (
                    imagesStr += image.filename + ','
                ))
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    images: imagesStr,
                },
                include:{
                    category: true,
                    Order:true,
                },
               })
            }
            return newProduct;
        } catch (error) {
            return error.message;
        }
    }

}
