import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { ProductService } from "./product.service";
import { ProductInput } from "./entities/product.input";

@Controller('product')
export class ProductController{
  constructor(private productService: ProductService){}

  @Get()
  async findAll(): Promise<ProductEntity[]>{
    return this.productService.findAll();
  }

  @Post()
  async insertOne(@Body() productInput: ProductInput): Promise<ProductEntity>{
    return this.productService.insertOne(productInput);
  }
}