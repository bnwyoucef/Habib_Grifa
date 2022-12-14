import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrdersGateway } from './order.gateway';
import { OrderService } from './order.service';

@Module({
  imports: [PrismaModule,MulterModule.register({
    dest:'./uploads/order_images'
  })],
  controllers: [OrderController],
  providers: [OrderService,OrdersGateway]
})
export class OrderModule {}
