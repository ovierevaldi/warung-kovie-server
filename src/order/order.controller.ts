import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderInput } from "./dto/orderInput";

@Controller('order')
export class OrderController{
  constructor(private orderService: OrderService){}

  @Get(':id')
  findOne(
    @Param('id') id: string
  ){
    return this.orderService.findOne(id);
  }

  @Post()
  insertOne(
    @Body() orderInput: OrderInput
  ){
    return this.orderService.insertOne(orderInput);
  }
}