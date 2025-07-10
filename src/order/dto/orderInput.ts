import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from "class-validator"

class DetailPesananInput{
  @IsNotEmpty({ message: 'nama_pesanan is required' })
  @IsString({ message: 'nama_pesanan must be a string' })
  @MinLength(2, { message: 'nama_pesanan must be at least 2 characters' })
  @MaxLength(50, { message: 'nama_pesanan must be at most 50 characters' })
  nama_pesanan: string;

  @IsNotEmpty({ message: 'harga is required' })
  @Type(() => Number) 
  @IsNumber({}, { message: 'harga must be a number' })
  @IsPositive({ message: 'harga must be greater than 0' })
  harga: number;

  @IsNotEmpty({ message: 'amount is required' })
  @Type(() => Number) 
  @IsNumber({}, { message: 'amount must be a number' })
  @IsPositive({ message: 'amount must be greater than 0' })
  amount: number;
}

export class OrderInput{
  @IsNotEmpty({ message: 'nama_pemesan is required' })
  @IsString({ message: 'nama_pemesan must be a string' })
  @MinLength(2, { message: 'nama_pemesan must be at least 2 characters' })
  @MaxLength(50, { message: 'nama_pemesan must be at most 50 characters' })
  nama_pemesan: string

  @IsArray()
  @ArrayMinSize(1, { message: 'detail_pesanan must contain at least one item' })
  @ValidateNested({ each: true})
  @Type(() => DetailPesananInput)
  detail_pesanan: DetailPesananInput[]

  @IsNotEmpty({ message: 'Total Harga is required' })
  @Type(() => Number) 
  @IsNumber({}, { message: 'Total Harga must be a number' })
  @IsPositive({ message: 'Total Harga must be greater than 0' })
  total_harga: number
}