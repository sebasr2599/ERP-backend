export class createProductDto {
  readonly name: string;
  readonly productKey?: string | null;
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
export class equivalentUnitDto {
  id: number;
  equivalent: number;
  productId: number;
  unitId: number;
}
export class updateProductDto {
  name: string;
  productKey?: string | null;
  description: string;
  priceUnit: number;
  priceWholesale: number;
  image: string;
  categoryId: number;
  equivalentUnits: equivalentUnitDto[];
}
