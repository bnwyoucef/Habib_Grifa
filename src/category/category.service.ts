import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async createCategory(categoryDto:CategoryDto) {
        try {            
            const category = await this.prisma.category.create({
                data:{
                    categoryName:categoryDto.categoryName
                },
                include:{
                    product: true,
                }
            })
            return category;
        } catch (error) {
            return error.message;
        }
    }

    async getCategories() {
        try {
            const all = await this.prisma.category.findMany({
                include:{
                    product: true,
                }
            });
            return all;
        } catch (error) {
            return error.message;
        }
    }

    async deleteCategory(id:string) {
        try {
            const category = await this.prisma.category.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return category;
        } catch (error) {
            return error.message;
        }
    }

    async updateCategory(id:string,categoryDto:CategoryDto) {
        try {
            const category = await this.prisma.category.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    categoryName:categoryDto.categoryName
                }
            });
            return category;
        } catch (error) {
            return error.message;
        }
    }
}
