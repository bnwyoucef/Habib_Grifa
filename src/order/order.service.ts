import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';
import { OrdersGateway } from './order.gateway';


@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService,private ordersGateway: OrdersGateway) {}

    async createNewOrder(orderDto: OrderDto,image:any) {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: parseInt(orderDto.productId)
                }
            });
            if(product) {
                const orderCost = product.price * parseInt(orderDto.productQuantity);
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
                        orderCost: String(orderCost)
                    },
                    include:{
                        product:{
                            select:{
                                name:true,
                                description:true,
                                categoryId:true
                            }
                        }
    
                    }
                });
                this.ordersGateway.server.emit('order-added',order);
                return order;
            }else {
                return 'product dont found!'
            }
        } catch (error) {
            return error.message;
        }
    }

    async getAllOrders() {
        try {
            const orders = await this.prisma.order.findMany({
                include:{
                    product:{
                        select:{
                            name:true,
                            description:true,
                            categoryId:true
                        }
                    }

                }
            });
            
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
                },
                include:{
                    product:{
                        select:{
                            name:true,
                            description:true,
                            categoryId:true
                        }
                    }
                }
            });
            return order;
        } catch (error) {
            return error.message;
        }
    }
}
