import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ProductEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50})
  name: string

  @Column('text')
  desc: string

  @Column({ type: 'integer'})
  price: number

  @Column('text')
  imageUrl: string
}