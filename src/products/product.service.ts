import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductInput, ProductUpdate } from "./entities/product.input";

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

  async updateOne(id: number, productUpdate: ProductUpdate): Promise<boolean>{
    try {
      const product = await this.productRepo.findOne({
        where: {
          id: id
        }
      });

      if(!product)
        throw new Error('Product Not Found');

      const updateResult = await this.productRepo.update(id, { ...productUpdate});

      return updateResult.affected !== undefined && updateResult.affected > 0;

    } catch (error) {
      if(error instanceof Error)
        throw error;

      throw new Error('Cannot Update Product')
    }
  }
}