import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MaxLength, MinLength } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";

export class ProductInput{
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(50, { message: 'Name must be at most 50 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description is too long' })
  desc?: string;

  @IsNotEmpty({ message: 'Price is required' })
  @Type(() => Number) 
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  imageUrl?: string;
}

export class ProductUpdate extends PartialType(ProductInput){}