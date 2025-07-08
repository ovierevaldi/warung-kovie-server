import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ProductEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50})
  name: string

  @Column({ type: 'text', nullable: true})
  desc?: string

  @Column({ type: 'integer'})
  price: number

  @Column({ type: 'text', nullable: true})
  imageUrl?: string
}