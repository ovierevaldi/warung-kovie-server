import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { OrderEntity } from "./order.entity";

@Entity()
export class DetailOrderEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length:50})
  nama_pesanan: string

  @Column('integer')
  harga: number

  @Column('integer')
  amount: number

  @ManyToOne(() => OrderEntity, (order) => order.detail_pesanan, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id'})
  order: OrderEntity
}