import { Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto';
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
}
