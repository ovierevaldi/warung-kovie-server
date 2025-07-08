import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductInput } from "./entities/product.input";

@Injectable()
export class ProductService{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>
  ){}

  async findAll(): Promise<ProductEntity[]>{
    return this.productRepo.find()
  }

  async insertOne(productInput: ProductInput): Promise<ProductEntity>{
    try {

      const newProduct = await this.productRepo.save({...productInput});
      return newProduct
    } 
    catch (error) {
      throw new Error('Cannot Insert New Product')
    }
  }
}