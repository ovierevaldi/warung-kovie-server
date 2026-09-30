import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets', 'ProductImage'),
      serveRoot: '/product-images'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){}
}
