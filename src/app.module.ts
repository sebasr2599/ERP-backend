import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { HistoricPriceModule } from './historic-price/historic-price.module';
import { EquivalentUnitModule } from './equivalent-unit/equivalent-unit.module';
import { HistoricEquivalentModule } from './historic-equivalent/historic-equivalent.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { ClientModule } from './client/client.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 30,
      },
    ]),
    AuthModule,
    UserModule,
    PassportModule,
    CategoryModule,
    UnitModule,
    ProductModule,
    InventoryModule,
    HistoricPriceModule,
    EquivalentUnitModule,
    HistoricEquivalentModule,
    OrderModule,
    OrderDetailModule,
    ClientModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
