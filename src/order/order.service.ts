import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./dto/order.entity";
import { Between, DataSource, Repository } from "typeorm";
import { DetailOrderEntity } from "./dto/detailOrder.entity";
import { OrderInput } from "./dto/orderInput";
import { DocumentCode } from "src/lib/documentCode";
import { InfoAntrian } from "./dto/order.output";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class OrderService{
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity) private readonly orderRepo: Repository<OrderEntity>,
  ){}

  async findOne(id: string): Promise<OrderEntity | null>{
    return await this.orderRepo.findOne({
      where: {
        id: id
      },
      relations: ['detail_pesanan']
    });
  }

  async insertOne(orderInput: OrderInput): Promise<{ orderId: string}>{
    try {
      return this.dataSource.transaction(async (manager) => {
      // Generate Order ID
      const orderId = await this.generateOrderId();
        
      // Create Order
      const order = manager.create(OrderEntity, {
        id: orderId,
        nama_pemesan: orderInput.nama_pemesan,
        total_harga: orderInput.total_harga
      });

      await manager.save(order)

      // Create Detail Order
      const detailOrder = orderInput.detail_pesanan.map((dt) => 
        manager.create(DetailOrderEntity, {
          amount: dt.amount,
          harga: dt.harga,
          nama_pesanan: dt.nama_pesanan,
          order: order
        })
      );
      
      await manager.save(detailOrder);

      return {orderId: orderId};
    });
    } catch (error) {
      if(error instanceof Error)
        throw error;

      throw ('Cannot Insert Order Data')
    }
  };

  async generateOrderId(): Promise<string>{
    try {
      const orderAmount = await this.orderRepo.count() + 1;
      const newId = DocumentCode.ORDER + orderAmount.toString().padStart(6, '0');

      const existing = await this.orderRepo.findOne({ where: { id: newId } });
      if (existing) {
        throw new Error('Duplicate Order ID');
      }

      return newId;
    } catch (error) {
      throw new Error('Cannot Generate Order Id')
    }
  };

  async getInfoAntrian(order_id: string): Promise<InfoAntrian>{
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999))

    const listOrder = await this.orderRepo.find({
      where: {
        date: Between(startOfDay, endOfDay)
      },
      order: {
        date: 'ASC'
      }
    });

    const nomorAntri = listOrder.findIndex((lo) => lo.id === order_id);

    if(nomorAntri === -1)
      throw new NotFoundException("Invalid Order ID")

    return {
      nama_pelanggan: listOrder[nomorAntri].nama_pemesan,
      nomor_antrian: nomorAntri + 1
    };
  }
}