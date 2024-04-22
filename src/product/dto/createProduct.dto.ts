export class createProductDto {
  readonly name: string;
  readonly description: string;
  readonly priceUnit: number;
  readonly priceWholesale: number;
  readonly image: string;
  readonly categoryId: number;
  readonly unitId: number;
  equivalentUnits: orderDetailDto[];
}
export class orderDetailDto {
  equivalent: number;
  price: number;
  unitId: number;
}
