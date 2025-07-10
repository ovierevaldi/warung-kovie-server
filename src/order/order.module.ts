import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./dto/order.entity";
import { DetailOrderEntity } from "./dto/detailOrder.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, DetailOrderEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})

export class OrderModule{}