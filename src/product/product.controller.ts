import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() product: Prisma.ProductCreateInput): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  async findAll(): Promise<Partial<Product>[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partial<Product>> {
    return this.productService.findOne(+id);
  }

  //get product by name
  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Partial<Product>[]> {
    return this.productService.findByName(name);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Partial<Prisma.ProductUpdateInput>,
  ): Promise<Product> {
    return this.productService.update(+id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(+id);
  }
}
