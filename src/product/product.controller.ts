import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';
import { createProductDto, updateProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() product: createProductDto): Promise<Product> {
    return this.productService.create(product);
  }

  @Post('withDetails')
  async createWithDetails(
    @Body()
    createProductDto: {
      product: Prisma.ProductCreateInput;
      equivalentUnits: Prisma.EquivalentUnitUncheckedCreateInput[];
    },
  ): Promise<Product> {
    return this.productService.createWithDetails(
      createProductDto.product,
      createProductDto.equivalentUnits,
    );
  }

  @Get()
  async findAll(
    @Query('search') productName,
    @Query('categoryId') categoryId: string,
    @Query('cursor') cursor?: number,
  ): Promise<Product[]> {
    return this.productService.findAll(productName, categoryId, cursor);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  //get product by name
  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findByName(name);
  }

  //get product and its category and unit
  @Get(':id/details')
  async getProductWithDetails(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductWithDetails(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: updateProductDto,
  ): Promise<Product> {
    return this.productService.update(+id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(+id);
  }
}
