import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { DetailOrderEntity } from "./detailOrder.entity"

@Entity()
export class OrderEntity{
    @PrimaryColumn('varchar')
    id: string

    @CreateDateColumn({ type: 'timestamp'})
    date: Date

    @Column({ type: 'varchar', length: 50})
    nama_pemesan: string

    @Column({ type: 'integer'})
    total_harga: number

    @OneToMany(() => DetailOrderEntity, (order) => order.order, { cascade: true, eager: true})
    detail_pesanan: DetailOrderEntity[]
}