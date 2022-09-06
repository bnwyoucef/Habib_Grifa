import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('create')
    @UseInterceptors(FilesInterceptor('images'))
    uploadFile(@UploadedFiles() images: Array<Express.Multer.File>,@Body() productDto: ProductDto) {
      return this.productService.createProduct(productDto,images);
    }

    @Get('image/:imageName')
    getProductImage(@Param('imageName') imageName: string,@Res() res) {
        res.sendFile(imageName,{root:'uploads/product_images'})
    }

    @Get('products')
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProductById(id);
    }

    @Patch('update/:id')
    @UseInterceptors(FilesInterceptor('images'))
    updateProduct(@Param('id') id: string,@Body() productDto:UpdateProductDto,@UploadedFiles() images: Array<Express.Multer.File>) {
        return this.productService.updateProduct(id,productDto,images);
    }
}
