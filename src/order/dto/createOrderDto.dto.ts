import { OrderDetail } from '@prisma/client';

export class createOrderDto {
  readonly name: string;
  readonly wholesale: boolean;
  readonly location: string;
  status: string;
  readonly total: number;
  orderDetails: OrderDetail[];
  userId: number;
  clientId: number;
  date: Date;
}
