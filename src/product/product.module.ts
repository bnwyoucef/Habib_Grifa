import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule,MulterModule.register({
    dest:'./uploads/product_images'
  })],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
