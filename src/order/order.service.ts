import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createNewOrder(orderDto: OrderDto,image:any) {
        try {
            const order = await this.prisma.order.create({
                data:{
                    clientName: orderDto.clientName,
                    clientPhoneNumber: orderDto.clientPhone,
                    productImageName: orderDto.productImageName,
                    clientWilaya: orderDto.clientWilaya,
                    paymentCheckImage: image.filename,
                    productSize: orderDto.productSize,
                    productQuantity: parseInt(orderDto.productQuantity),
                    product_Id: parseInt(orderDto.productId),
                    orderCost: "5000"
                }
            })
            return order;
        } catch (error) {
            return error.message;
        }
    }

    async getAllOrders() {
        try {
            const orders = await this.prisma.order.findMany();
            return orders;
        } catch (error) {
            return error.message;
        }
    }

    async deleteOrder(id: string) {
        try {
            const order = await this.prisma.order.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return order;
        } catch (error) {
            return error.message;
        }
    }

    async updateOrderConfirm(id: string) {
        try {
            const order = await this.prisma.order.update({
                where:{
                    id: parseInt(id)
                },
                data: {
                    confirmedByAdmin:true
                }
            });
            return order;
        } catch (error) {
            return error.message;
        }
    }
}
