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

    async deleteProductById(id: string) {
        try {
            const product = await this.prisma.product.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return product;
        } catch (error) {
            return error.message;
        }
    }

    async updateProduct(id: string,productDto:UpdateProductDto,images:any) {
        let newProduct = {}
        try {
            if(productDto.name) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    name: productDto.name,
                }
               })
            }

            if(productDto.description) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    description: productDto.description,
                }
               })
            }
            if(productDto.price) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    price: parseInt( productDto.price),
                }
               })
            }

            if(productDto.sizes) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    sizes: productDto.sizes,
                }
               })
            }
            if(productDto.categoryId) {
                newProduct = await this.prisma.product.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    categoryId: parseInt(productDto.categoryId),
                }
               })
            }
            if(images.length) {
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
                }
               })
            }
            return newProduct;
        } catch (error) {
            return error.message;
        }
    }

}
