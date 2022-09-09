import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('create')
    createCategory(@Body() categoryDto: CategoryDto) {
        return this.categoryService.createCategory(categoryDto);
    }

    @Get('all')
    getAllCategories() {
        return this.categoryService.getCategories();
    }

    @Delete('delete/:id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }

    @Patch('update/:id')
    updateCategory(@Param('id') id: string,@Body() categoryDto: CategoryDto) {
        return this.categoryService.updateCategory(id,categoryDto);
    }
}
