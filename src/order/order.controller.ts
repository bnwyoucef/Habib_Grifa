import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('create-order')
    @UseInterceptors(FileInterceptor('image'))
    createOrder(@UploadedFile() image: Express.Multer.File,@Body() orderDto: OrderDto) {    
        return this.orderService.createNewOrder(orderDto,image);
    }
    //get the payement check image
    @Get('imagePayed/:imageName')
    getOrderPayedImage(@Param('imageName') imageName: string,@Res() res) {
        return res.sendFile(imageName,{root:'uploads/order_images'})
    }
    //get the image of the order product
    @Get('image/:imageName')    
    getOrderProductImage(@Param('imageName') imageName: string,@Res() res) {
        return res.sendFile(imageName,{root:'uploads/product_images'})
    }

    @Get('orders')
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Delete('delete/:id')
    deleteOrder(@Param('id') id: string) {
        return this.orderService.deleteOrder(id);
    }

    //the admin confirm the order
    @Patch('update/:id')
    updateOrderConfirm(@Param('id') id: string) {
        return this.orderService.updateOrderConfirm(id);
    }
}
