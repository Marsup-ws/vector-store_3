import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { INITIAL_PRODUCTS } from './initial-products.data';

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async seedProducts(): Promise<void> {
    const count = await this.productRepository.count();
    if (count === 0) {
      this.logger.log('No products found in DB. Seeding initial products...');
      await this.productRepository.save(INITIAL_PRODUCTS);
      this.logger.log(`Successfully seeded ${INITIAL_PRODUCTS.length} products.`);
    } else {
      this.logger.log(`Database already contains ${count} products. Skipping seeding.`);
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) return null;
    return {
      ...product,
      price: Number(product.price),
    };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    const saved = await this.productRepository.save(product);
    return {
      ...saved,
      price: Number(saved.price),
    };
  }

  async update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
